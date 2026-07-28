# 02 — atomic claim (the fix)

The article's Version 2 endpoint: instead of looking up the key and then
saving it, try to claim it — a single atomic check-and-set standing in for
the database's `INSERT ... ON CONFLICT DO NOTHING`. Same 50 concurrent
requests, same idempotency key, 200 trials as
[`01-naive-race`](../01-naive-race).

```sh
go run .
```

Expect:

```
trials with more than one charge : 0 / 200
```

Every trial charges exactly once. The fix isn't a mutex wrapped around the
old logic — it's collapsing "check" and "write" into one operation so there
is no gap left for a second request to land in. Whichever goroutine claims
the key first is the only one that ever reaches the rail; every other
request returns immediately, exactly as a real handler would 409 or replay a
stored response.
