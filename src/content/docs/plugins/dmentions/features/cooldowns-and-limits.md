---
title: "Cooldowns & Limits"
description: "Four independent controls stop mentions becoming a spam vector."
---

Four independent controls stop mentions becoming a spam vector.

---

## 1. mention_limit

```yaml
mention_limit: 2
```

Maximum mentions **per message**. Without it, `@a @b @c @d @e @f` pings six people from one line and no cooldown helps — the cooldown only starts after the message.

`2` is a good default. `1` is strict but perfectly usable. `0` disables mentions entirely, which is a heavier hammer than setting `enabled: false` per type.

## 2. Per-type cooldowns

Every type has its own, in seconds, per sender:

```yaml
player:   { cooldown: 5 }
nearby:   { cooldown: 10 }
everyone: { cooldown: 10 }
group:
  list:
    vip: { cooldown: 30 }
```

The timers are independent. A player who just used `@nearby` can still mention a player — different types, different clocks.

Scale the cooldown to the audience size:

| Type | Suggested |
|---|---|
| Player | 3–5s |
| Nearby | 10–15s |
| Group | 15–60s, by group size |
| Everyone | 60s+ |

## 3. Permissions

The cleanest limit is not granting the permission at all. `@everyone` in particular should be staff-only on almost every server. See [Commands & Permissions](/plugins/dmentions/commands-and-permissions/).

## 4. disabled_worlds

```yaml
disabled_worlds:
  - "minigame_arena"
  - "creative"
```

No mentions fire in these worlds at all. Useful for minigame worlds where a ping is a distraction, or a creative world where chat is already noisy.

> The shipped defaults (`no_mention_world_1`, `no_mention_world_2`) are **placeholders**. Replace them or empty the list — otherwise you are guarding two worlds that do not exist.

---

## Restricted mentions

```yaml
# permissions
dmentions.mention.restricted        # default: false
dmentions.mention.restricted.bypass # default: op
```

Give `dmentions.mention.restricted` to a player and other players cannot mention them — unless they hold `dmentions.mention.restricted.bypass`.

The usual use: staff who do not want to be summoned by name, while other staff can still reach them.

```
lp group admin permission set dmentions.mention.restricted true
lp group mod permission set dmentions.mention.restricted.bypass true
```

## Per-player opt-out

```
/dm toggle
```

A player's own choice, independent of everything above. They remain visible in chat; they simply stop being pinged.

## Next

- [Player Customisation](/plugins/dmentions/features/customisation/)
