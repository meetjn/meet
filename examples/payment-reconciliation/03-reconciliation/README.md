# 03 — idempotent ingest + reconciliation (the full fix)

Same channel, same seed as [`01`](../01-naive-ingest) and
[`02`](../02-idempotent-ingest). Adds a reconciliation pass that pulls the
rail's record of truth, diffs it against the database, auto-repairs the
lost-webhook case, and alerts on everything else.

```sh
go run .        # or: python3 sim.py
```

Expect (Go, seed 42):

```
stuck in pending : 0.00%   <- this is the number 02 could not move
double-credited  : 0.00%
wrong terminal   : 0.56%   <- lost refunds: real mismatches, alerted not repaired
```

The stuck-pending number that idempotent ingest alone couldn't touch drops to
zero here — reconciliation is a different mechanism solving a different
problem. The residual 0.56% isn't unhandled: it's lost *refund* events, where
the database and the rail both have a confident, terminal, conflicting
belief. That's a mismatch, and the article's Rule 4 says never auto-repair a
mismatch — so every one of them is surfaced as an alert instead.

Silent drift went to zero. What's left is a work queue with a name on it.
