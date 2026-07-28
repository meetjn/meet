# Payment reconciliation — runnable examples

Companion to [_Your database is not the truth_](https://meetjain.xyz/writing/payment-reconciliation).

Three programs, same delivery transcript, three ingest strategies. Run them
in order — each one is the direct comparison point for the last:

| step | what it shows | run |
| --- | --- | --- |
| [`01-naive-ingest`](01-naive-ingest) | the bug — no dedup, no order tolerance | `go run .` or `python3 sim.py` |
| [`02-idempotent-ingest`](02-idempotent-ingest) | the partial fix — dedup and order fixed, loss is not | `go run .` or `python3 sim.py` |
| [`03-reconciliation`](03-reconciliation) | the full fix — reconciliation catches what ingest missed | `go run .` or `python3 sim.py` |

All three seed the same PRNG (seed 42) in the same order, so the underlying
webhook stream is identical across all three runs. Whatever differs in the
printed output comes from the ingest logic and nothing else.

## What to watch for

Run `01` and `02` back to back. The **stuck-in-pending** number does not
move — idempotent ingest eliminates duplicate side effects entirely but
leaves lost webhooks exactly as lost. Then run `03` and watch that number
go to zero, with the residue reported as reconciliation repairs and alerts
instead of silent drift.

```
                 stuck   2x credit   wrong state
01 naive          4.53%      9.25%         0.98%
02 idempotent      4.53%      0.00%         0.56%   <- stuck unchanged
03 reconciled      0.00%      0.00%         0.56%   <- stuck fixed
```

(Go output, seed 42. The Python port produces the same pattern from a
different PRNG stream — see each folder's own numbers.)

No external dependencies in either language. Go programs share
[`internal/simcore`](internal/simcore); each Python file is self-contained.
