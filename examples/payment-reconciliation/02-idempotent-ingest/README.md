# 02 — idempotent ingest (the partial fix)

Same channel, same seed as [`01-naive-ingest`](../01-naive-ingest). The only
difference: the event ID is claimed before any work happens, and events are
applied through a state machine that tolerates out-of-order arrival.

```sh
go run .        # or: python3 sim.py
```

Expect (Go, seed 42):

```
stuck in pending : 4.53%   <- identical to 01
double-credited  : 0.00%   <- fixed
wrong terminal   : 0.56%   <- improved, not eliminated
```

Compare the first line to `01`'s output. It's the same number. Deduplication
cannot recover a message that never arrived — there is nothing to
deduplicate. This is the whole reason the article argues idempotent ingest
and reconciliation are separate concerns, not one fix and its side effect.

Next: [`03-reconciliation`](../03-reconciliation) — same channel, same seed,
with a reconciliation pass added on top.
