// The bug: a naive webhook handler with no dedup and no state machine.
// Run this, then run 02-idempotent-ingest to see what fixing ingest alone
// does and doesn't repair.
package main

import (
	"fmt"
	"math/rand"

	"paymentreconciliation/internal/simcore"
)

const n = 10000

func main() {
	ch := simcore.Channel{Loss: 0.05, Dup: 0.10, Reorder: 0.05}
	rng := rand.New(rand.NewSource(42))
	charges := simcore.Generate(n, rng)

	db := simcore.NewDB()
	for _, c := range charges {
		for _, e := range simcore.Deliver(simcore.TrueEvents(c), ch, rng) {
			db.Naive(e)
		}
	}

	m := simcore.Measure(db, charges)
	fmt.Printf("naive ingest — %d charges, loss=%.0f%% dup=%.0f%% reorder=%.0f%%, seed=42\n",
		n, ch.Loss*100, ch.Dup*100, ch.Reorder*100)
	fmt.Printf("  stuck in pending : %s   (rail moved money, we never noticed)\n", simcore.Pct(m.StuckPending, n))
	fmt.Printf("  double-credited  : %s   (duplicate webhook, side effect fired twice)\n", simcore.Pct(m.DoubleCredit, n))
	fmt.Printf("  wrong terminal   : %s   (out-of-order webhook flipped the final state)\n", simcore.Pct(m.WrongTerminal, n))
	fmt.Println()
	fmt.Println("This is the bug: no dedup, no order tolerance, no idea anything is wrong.")
}
