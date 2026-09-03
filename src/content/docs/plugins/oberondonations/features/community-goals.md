---
title: "Community Goals"
description: "Several goals run at once, each with its own target, currency, milestones and cycle policy, configured in goals.yml. Progress is recomputed from the…"
---

Several goals run at once, each with its own target, currency, milestones and cycle policy, configured in `goals.yml`. Progress is **recomputed from the purchase history**, not accumulated as a running counter — a refund reduces a goal's progress automatically, with no extra bookkeeping needed anywhere.

## Defining a goal

```yaml
goals:
  default:
    name: 'Community Goal'
    type: amount          # amount | count | package
    target: 100.0
    currency: USD          # must match store.default-currency, or the goal refuses to start
    packages: []           # only for type: package — names or Tebex package ids
    enabled: true
    provider: internal      # internal = counted from this plugin's own history (recommended)
                            # tebex    = read live from a Tebex community goal instead
    tebex-goal-id: '…'      # only used when provider: tebex
```

- `type: amount` — total money raised toward `target`.
- `type: count` — number of purchases.
- `type: package` — money spent specifically on the packages listed in `packages`.

## What happens at 100%

`on-complete` decides:

- `none` — all-time progress, display simply caps at 100%.
- `hold-until-month-end` — stays visibly at 100% for the rest of the calendar month, then starts a fresh cycle.
- `reset` — a new cycle starts immediately.

`starts` / `ends` (format `yyyy-MM-dd HH:mm`, in the timezone from `config.yml`) make a goal an optional time-boxed campaign rather than an ongoing one.

## Milestones

```yaml
milestones:
  '50':
    commands: []
  '100':
    commands: []
```

Keyed by percent of the target. Each fires **once per cycle** — a server restart does not re-fire one that already happened, and `on-complete: reset` starting a new cycle is what makes them available to fire again. `%goal% %percent% %target%` are substituted in `commands`.

## The `internal` vs `tebex` provider

`provider: internal` (the default, and the recommended choice) counts purchases from this plugin's own recorded history — accurate for every store adapter, and consistent with everything else this plugin reports. `provider: tebex` instead reads progress live from a goal you have configured directly on Tebex's own creator panel (`tebex-goal-id`), for the case where Tebex's own goal is the source of truth you want reflected here rather than duplicated.

## Progress bar

```yaml
bar:
  full: '<green>|'
  empty: '<grey>|'
```

`{goal_bar}` is 25 segments; `%odonations_goal_<id>_bar_10%` (PlaceholderAPI) is the same bar at 10 segments.

## Announcing it

`goal-milestone` and `goal-complete` in `announcements.yml` control presentation. See [Announcements](/plugins/oberondonations/features/announcements/).

## Commands

| Command | Does |
|---|---|
| `/donations goal list` | Every configured goal and its target |
| `/donations goal info <id>` | Current progress |
| `/donations goal refresh` | Recompute every goal right now |
| `/donations goal reset <id>` | Start a new cycle immediately, ignoring `on-complete` |

## Placeholders

`%odonations_goal_<id>_<field>%` — `name`, `description`, `percent`, `current`, `target`, `remaining`, `bar`, `bar_10`, `complete`, `cycle`. See [Placeholders](/plugins/oberondonations/placeholders/#community-goals).

## See also

- [Discord Webhooks](/plugins/oberondonations/features/discord-webhooks/) — `goal-milestone` and `goal-complete` embeds
- [goals.yml reference](/plugins/oberondonations/configuration/goals-yml/)
