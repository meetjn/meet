// The full fix: idempotent ingest plus a reconciliation pass that pulls the
// rail's record and repairs what the ingest missed. Same channel, same seed
// as 01 and 02 — the stuck-pending number should finally move.
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
			db.Hardened(e)
		}
	}
	result := simcore.Reconcile(db, charges)

	m := simcore.Measure(db, charges)
	fmt.Printf("idempotent ingest + reconciliation — %d charges, loss=%.0f%% dup=%.0f%% reorder=%.0f%%, seed=42\n",
		n, ch.Loss*100, ch.Dup*100, ch.Reorder*100)
	fmt.Printf("  stuck in pending : %s   (this is the number 02 could not move)\n", simcore.Pct(m.StuckPending, n))
	fmt.Printf("  double-credited  : %s\n", simcore.Pct(m.DoubleCredit, n))
	fmt.Printf("  wrong terminal   : %s   (lost refunds — real mismatches, never auto-repaired)\n", simcore.Pct(m.WrongTerminal, n))
	fmt.Println()
	fmt.Printf("reconciliation: %d charges auto-repaired, %d alerted for a human\n", result.Repaired, result.Alerted)
	fmt.Println()
	fmt.Println("Silent drift is now zero. What's left is either fixed automatically")
	fmt.Println("or sitting in a queue with a human's name on it — nothing is unknown.")
}
