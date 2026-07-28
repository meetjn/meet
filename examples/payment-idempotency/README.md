# Payment idempotency — runnable examples

Companion to [_How to make a payment API safe to retry_](https://meetjain.xyz/writing/payment-api-idempotency).

Two programs. Same concurrent load — 50 requests carrying one idempotency
key, fired at once, 200 independent trials — against two handler shapes.

| step | what it shows | run |
| --- | --- | --- |
| [`01-naive-race`](01-naive-race) | the bug — lookup, then separate write | `go run .` |
| [`02-atomic-claim`](02-atomic-claim) | the fix — atomic claim, one winner | `go run .` |

```
                          trials with >1 charge
01 naive (lookup-then-write)     200 / 200
02 atomic claim                    0 / 200
```

`01` isn't a rare flake — every single trial double-charges, because all 50
goroutines see "not found" before any of them saves. `02` changes exactly one
thing: the check and the write become one atomic operation, so only the
first caller can ever get past it. No mutex around the business logic, no
retry logic, no timing tricks — just a claim that can only succeed once.

No external dependencies. Both programs share nothing but the load-generation
shape, so you can read either one on its own.
