"""The bug: a naive webhook handler with no dedup and no state machine.
Run this, then 02-idempotent-ingest, to see what fixing ingest alone does
and doesn't repair. Run with: python3 sim.py"""

import random
from dataclasses import dataclass, field

SUCCEEDED = "charge.succeeded"
REFUNDED = "charge.refunded"
N = 10_000


@dataclass(frozen=True)
class Event:
    id: str
    charge_id: str
    type: str


@dataclass(frozen=True)
class Charge:
    id: str
    rail_state: str  # ground truth at the rail


@dataclass(frozen=True)
class Channel:
    loss: float
    dup: float
    reorder: float


def generate(n, rng):
    return [
        Charge(f"ch_{i:05d}", "refunded" if rng.random() < 0.10 else "succeeded")
        for i in range(n)
    ]


def true_events(c):
    ev = [Event(f"{c.id}_e1", c.id, SUCCEEDED)]
    if c.rail_state == "refunded":
        ev.append(Event(f"{c.id}_e2", c.id, REFUNDED))
    return ev


def deliver(ev, ch, rng):
    out = list(ev)
    if len(out) > 1 and rng.random() < ch.reorder:
        i = rng.randrange(len(out) - 1)
        out[i], out[i + 1] = out[i + 1], out[i]

    delivered = []
    for e in out:
        if rng.random() < ch.loss:
            continue
        delivered.append(e)
        if rng.random() < ch.dup:
            delivered.append(e)
    return delivered


@dataclass
class DB:
    state: dict = field(default_factory=dict)
    credits: dict = field(default_factory=dict)

    def naive(self, e):
        """No dedup, no state machine. Last write wins; side effect every time."""
        if e.type == SUCCEEDED:
            self.state[e.charge_id] = "succeeded"
            self.credits[e.charge_id] = self.credits.get(e.charge_id, 0) + 1
        elif e.type == REFUNDED:
            self.state[e.charge_id] = "refunded"


def measure(db, charges):
    stuck = double = wrong = 0
    for c in charges:
        mine = db.state.get(c.id, "unknown")
        if db.credits.get(c.id, 0) > 1:
            double += 1
        if mine in ("unknown", "pending"):
            stuck += 1
        elif mine != c.rail_state:
            wrong += 1
    return stuck, double, wrong


if __name__ == "__main__":
    ch = Channel(loss=0.05, dup=0.10, reorder=0.05)
    rng = random.Random(42)
    charges = generate(N, rng)

    db = DB()
    for c in charges:
        for e in deliver(true_events(c), ch, rng):
            db.naive(e)

    stuck, double, wrong = measure(db, charges)

    def pct(x):
        return f"{100 * x / N:.2f}%"

    print(f"naive ingest — {N} charges, loss=5% dup=10% reorder=5%, seed=42")
    print(f"  stuck in pending : {pct(stuck)}   (rail moved money, we never noticed)")
    print(f"  double-credited  : {pct(double)}   (duplicate webhook, side effect fired twice)")
    print(f"  wrong terminal   : {pct(wrong)}   (out-of-order webhook flipped the final state)")
    print()
    print("This is the bug: no dedup, no order tolerance, no idea anything is wrong.")
