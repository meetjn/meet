// The bug from "Version 1: look, then act" in the article: a lookup
// followed by a separate write is not safe under concurrency. This program
// fires many concurrent requests carrying the same idempotency key at that
// exact handler shape and counts how many times the card actually gets
// charged. It should be more than once, often.
package main

import (
	"fmt"
	"sync"
	"time"
)

const (
	concurrency = 50  // requests sharing one idempotency key, in one trial
	trials      = 200 // independent trials, to report how often the race hits
)

// FakeRail stands in for the payment rail. Charge is the side effect a
// double-charge duplicates.
type FakeRail struct {
	mu      sync.Mutex
	charges int
}

func (r *FakeRail) Charge() {
	r.mu.Lock()
	r.charges++
	r.mu.Unlock()
}

// NaiveStore is "look, then act": Lookup and Save are each individually
// thread-safe, but nothing stops two callers from both Lookup-ing false
// before either one Saves. That gap is the whole bug.
type NaiveStore struct {
	mu    sync.Mutex
	saved map[string]bool
}

func newNaiveStore() *NaiveStore { return &NaiveStore{saved: map[string]bool{}} }

func (s *NaiveStore) Lookup(key string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.saved[key]
}

func (s *NaiveStore) Save(key string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.saved[key] = true
}

// handleNaive mirrors the article's Version 1 endpoint: lookup, then
// (elsewhere) charge, then save. The sleep stands in for the real gap in
// production — the time an HTTP handler spends decoding the body and calling
// out to the rail — which is exactly where a concurrent retry lands.
func handleNaive(key string, rail *FakeRail, store *NaiveStore) {
	if store.Lookup(key) {
		return // would replay the stored response
	}
	time.Sleep(time.Millisecond)
	rail.Charge()
	store.Save(key)
}

func runTrial() int {
	rail := &FakeRail{}
	store := newNaiveStore()
	const key = "idem_same_key_every_request"

	var wg sync.WaitGroup
	wg.Add(concurrency)
	for i := 0; i < concurrency; i++ {
		go func() {
			defer wg.Done()
			handleNaive(key, rail, store)
		}()
	}
	wg.Wait()
	return rail.charges
}

func main() {
	doubleCharged := 0
	totalExtraCharges := 0
	for i := 0; i < trials; i++ {
		charges := runTrial()
		if charges > 1 {
			doubleCharged++
			totalExtraCharges += charges - 1
		}
	}

	fmt.Printf("naive lookup-then-write — %d concurrent requests per trial, same idempotency key, %d trials\n",
		concurrency, trials)
	fmt.Printf("  trials with more than one charge : %d / %d (%.0f%%)\n",
		doubleCharged, trials, 100*float64(doubleCharged)/float64(trials))
	fmt.Printf("  total extra charges across all trials : %d\n", totalExtraCharges)
	fmt.Println()
	fmt.Println("This is the concurrent duplicate: both requests see \"not found\"")
	fmt.Println("inside the gap between checking and saving. Run 02-atomic-claim.")
}
