# 01 — naive lookup-then-write (the bug)

The article's Version 1 endpoint: look up the key, and if it's not found,
charge the card and save it — as two separate steps. This program fires 50
concurrent requests carrying the same idempotency key and counts how many
times the card actually gets charged, over 200 trials.

```sh
go run .
```

Expect:

```
trials with more than one charge : 200 / 200 (100%)
total extra charges across all trials : ~9800
```

Every trial double-charges — in most trials, nearly all 50 requests charge
independently, because every one of them sees "not found" before any of them
has a chance to save. This isn't a rare race that needs a stress test to
surface; it's the default outcome the moment two requests with the same key
overlap in time, which is exactly what a client retry does.

The handler sleeps 1ms between the lookup and the charge. That stands in for
the work a real endpoint does there — decoding the body and making a network
call to the payment rail — which in production is tens to hundreds of
milliseconds, not one. The sleep makes the result deterministic rather than
timing-dependent; it doesn't manufacture the bug, it just stops you having to
run the program twenty times to see it.

Next: [`02-atomic-claim`](../02-atomic-claim) — same load, one change to the
handler.
