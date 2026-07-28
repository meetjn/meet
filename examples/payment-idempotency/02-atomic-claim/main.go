// The fix from "Version 2: claim the key atomically" in the article: stop
// asking whether the key exists and try to claim it instead, with a single
// atomic check-and-set standing in for the database's unique constraint.
// Same concurrent load as 01-naive-race — the charge count should now always
// be exactly 1.
package main

import (
	"fmt"
	"sync"
	"time"
)

const (
	concurrency = 50  // requests sharing one idempotency key, in one trial
	trials      = 200 // independent trials
)

// FakeRail stands in for the payment rail.
type FakeRail struct {
	mu      sync.Mutex
	charges int
}

func (r *FakeRail) Charge() {
	r.mu.Lock()
	r.charges++
	r.mu.Unlock()
}

// ClaimStore models `INSERT ... ON CONFLICT DO NOTHING`: exactly one caller
// per key can ever win Claim. There is no separate lookup step for a second
// request to race against — the check and the set are one atomic operation.
type ClaimStore struct {
	mu      sync.Mutex
	claimed map[string]bool
}

func newClaimStore() *ClaimStore { return &ClaimStore{claimed: map[string]bool{}} }

func (s *ClaimStore) Claim(key string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.claimed[key] {
		return false // someone else already owns this key
	}
	s.claimed[key] = true
	return true
}

// handleClaim mirrors the article's Version 2 endpoint: claim first: only
// the winner ever reaches the rail. Everyone else returns immediately,
// exactly as a real handler would 409 or replay a stored response.
func handleClaim(key string, rail *FakeRail, store *ClaimStore) {
	if !store.Claim(key) {
		return // lost the claim: would 409 or replay, never charges
	}
	time.Sleep(time.Millisecond) // only the winner does the expensive work
	rail.Charge()
}

func runTrial() int {
	rail := &FakeRail{}
	store := newClaimStore()
	const key = "idem_same_key_every_request"

	var wg sync.WaitGroup
	wg.Add(concurrency)
	for i := 0; i < concurrency; i++ {
		go func() {
			defer wg.Done()
			handleClaim(key, rail, store)
		}()
	}
	wg.Wait()
	return rail.charges
}

func main() {
	doubleCharged := 0
	for i := 0; i < trials; i++ {
		if runTrial() > 1 {
			doubleCharged++
		}
	}

	fmt.Printf("atomic claim — %d concurrent requests per trial, same idempotency key, %d trials\n",
		concurrency, trials)
	fmt.Printf("  trials with more than one charge : %d / %d\n", doubleCharged, trials)
	fmt.Println()
	fmt.Println("The claim is atomic, so only one goroutine per key can ever pass it.")
	fmt.Println("Every trial charges exactly once, regardless of how many requests race.")
}
