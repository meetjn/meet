# 01 — naive ingest (the bug)

A webhook handler with no deduplication and no state machine, run against a
channel that loses 5%, duplicates 10%, and reorders 5% of events across
10,000 charges.

```sh
go run .        # or: python3 sim.py
```

Expect (Go, seed 42):

```
stuck in pending : 4.53%
double-credited  : 9.25%
wrong terminal   : 0.98%
```

Every lost webhook leaves a charge stuck. Every duplicate fires the side
effect twice. Every reordered pair has a chance to land in the wrong final
state. Nothing in this program can tell you any of that happened — it looks
fine from the inside.

Next: [`02-idempotent-ingest`](../02-idempotent-ingest) — same channel, same
seed, dedup and order-tolerance added. Watch which of these three numbers
actually moves.
