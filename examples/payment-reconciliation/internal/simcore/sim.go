// Package simcore is the shared engine behind the three runnable programs in
// this directory (01-naive-ingest, 02-idempotent-ingest, 03-reconciliation).
// It models one payment rail, one unreliable webhook channel, and the ingest
// strategies built in the article. All three programs seed the same PRNG in
// the same order, so they replay the identical delivery transcript — any
// difference in their printed results comes from the ingest logic alone.
package simcore

import (
	"fmt"
	"math/rand"
)

type Event struct {
	ID       string
	ChargeID string
	Type     string // "charge.succeeded" | "charge.refunded"
}

type Charge struct {
	ID        string
	RailState string // ground truth at the rail
}

// Channel is what the network does to webhooks on the way to us.
type Channel struct {
	Loss    float64 // webhook never arrives
	Dup     float64 // rail retried; we receive it twice
	Reorder float64 // events arrive in the wrong order
}

func Generate(n int, rng *rand.Rand) []Charge {
	charges := make([]Charge, n)
	for i := range charges {
		state := "succeeded"
		if rng.Float64() < 0.10 {
			state = "refunded" // 10% of charges are later refunded
		}
		charges[i] = Charge{ID: fmt.Sprintf("ch_%05d", i), RailState: state}
	}
	return charges
}

// TrueEvents is what actually happened at the rail, in order.
func TrueEvents(c Charge) []Event {
	ev := []Event{{ID: c.ID + "_e1", ChargeID: c.ID, Type: "charge.succeeded"}}
	if c.RailState == "refunded" {
		ev = append(ev, Event{ID: c.ID + "_e2", ChargeID: c.ID, Type: "charge.refunded"})
	}
	return ev
}

// Deliver applies the channel's failure modes to one charge's event stream.
func Deliver(ev []Event, ch Channel, rng *rand.Rand) []Event {
	out := append([]Event(nil), ev...)

	if len(out) > 1 && rng.Float64() < ch.Reorder {
		i := rng.Intn(len(out) - 1)
		out[i], out[i+1] = out[i+1], out[i]
	}

	delivered := make([]Event, 0, len(out)+1)
	for _, e := range out {
		if rng.Float64() < ch.Loss {
			continue
		}
		delivered = append(delivered, e)
		if rng.Float64() < ch.Dup {
			delivered = append(delivered, e)
		}
	}
	return delivered
}

type DB struct {
	state   map[string]string
	credits map[string]int // the side effect duplicates corrupt
	claimed map[string]bool
}

func NewDB() *DB {
	return &DB{
		state:   map[string]string{},
		credits: map[string]int{},
		claimed: map[string]bool{},
	}
}

// Naive: no dedup, no state machine. Last write wins; side effect every time.
// This is Version 1 in the article.
func (db *DB) Naive(e Event) {
	switch e.Type {
	case "charge.succeeded":
		db.state[e.ChargeID] = "succeeded"
		db.credits[e.ChargeID]++
	case "charge.refunded":
		db.state[e.ChargeID] = "refunded"
	}
}

// Hardened: claim the event id, then a state machine that tolerates disorder.
// This is Version 2 in the article.
func (db *DB) Hardened(e Event) {
	if db.claimed[e.ID] {
		return
	}
	db.claimed[e.ID] = true

	cur, ok := db.state[e.ChargeID]
	if !ok {
		cur = "unknown"
	}
	switch e.Type {
	case "charge.succeeded":
		if cur == "unknown" || cur == "pending" {
			db.state[e.ChargeID] = "succeeded"
			db.credits[e.ChargeID]++
		}
	case "charge.refunded":
		db.state[e.ChargeID] = "refunded" // terminal: accept from any state
	}
}

type ReconResult struct{ Repaired, Alerted int }

// Reconcile is Version 3 in the article: diff into buckets, auto-repair only
// the lost-webhook case, alert on everything else.
func Reconcile(db *DB, charges []Charge) ReconResult {
	var r ReconResult
	for _, c := range charges {
		mine, ok := db.state[c.ID]
		if !ok {
			mine = "unknown"
		}
		switch {
		case mine == c.RailState:
			// matched: the boring, good case
		case mine == "unknown" || mine == "pending":
			// only-in-rail: the lost-webhook case, safe to auto-repair
			db.Hardened(Event{
				ID:       "recon-" + c.ID,
				ChargeID: c.ID,
				Type:     "charge." + c.RailState,
			})
			r.Repaired++
		default:
			// both terminal and disagreeing: never auto-repair
			r.Alerted++
		}
	}
	return r
}

type Metrics struct {
	StuckPending  int
	DoubleCredit  int
	WrongTerminal int
}

func (m Metrics) Disagree() int { return m.StuckPending + m.WrongTerminal }

func Measure(db *DB, charges []Charge) Metrics {
	var m Metrics
	for _, c := range charges {
		mine, ok := db.state[c.ID]
		if !ok {
			mine = "unknown"
		}
		if db.credits[c.ID] > 1 {
			m.DoubleCredit++
		}
		if mine == "unknown" || mine == "pending" {
			m.StuckPending++
		} else if mine != c.RailState {
			m.WrongTerminal++
		}
	}
	return m
}

func Pct(x, n int) string { return fmt.Sprintf("%.2f%%", 100*float64(x)/float64(n)) }
