// The partial fix: claim the event ID, apply through an order-tolerant state
// machine. Same channel, same seed as 01-naive-ingest, so the two are directly
// comparable. Watch which numbers move and which one doesn't.
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

	m := simcore.Measure(db, charges)
	fmt.Printf("idempotent ingest — %d charges, loss=%.0f%% dup=%.0f%% reorder=%.0f%%, seed=42\n",
		n, ch.Loss*100, ch.Dup*100, ch.Reorder*100)
	fmt.Printf("  stuck in pending : %s   (compare to 01 — this number does not move)\n", simcore.Pct(m.StuckPending, n))
	fmt.Printf("  double-credited  : %s   (compare to 01 — this one goes to zero)\n", simcore.Pct(m.DoubleCredit, n))
	fmt.Printf("  wrong terminal   : %s   (order tolerance helps, doesn't eliminate it)\n", simcore.Pct(m.WrongTerminal, n))
	fmt.Println()
	fmt.Println("Dedup and ordering are fixed. Lost webhooks are not — there is nothing")
	fmt.Println("here that can detect a message that never arrived. Run 03-reconciliation.")
}
