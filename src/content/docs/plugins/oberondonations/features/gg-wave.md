---
title: "GG Wave"
description: "A qualifying purchase opens a short window during which anyone who types the trigger word enters; when the window closes, the wave pays everyone or a random…"
---

A qualifying purchase opens a short window during which anyone who types the trigger word enters; when the window closes, the wave pays everyone or a random subset. One wave runs at a time, ever. Off by default (`ggwave.yml` → `enabled: false`).

## Triggering

`trigger.min-amount` is the minimum purchase that can start one; `0` means any purchase qualifies. `trigger.eligible-packages` / `ignored-packages` further restrict which packages count (empty `eligible-packages` = every package is eligible). `cooldown-seconds` is the minimum gap between waves, so a burst of purchases cannot chain them back to back.

## Entering

`trigger-message` is the word players type; `trigger-match: exact` requires the whole chat message to be exactly that word, `contains` accepts it appearing anywhere in the message. The window stays open for `duration-seconds`.

`eligibility.permission` restricts who may enter at all (blank = anyone); `eligibility.min-seconds-online` blocks someone who logged in moments ago from farming a wave with a fresh alt; `eligibility.allow-triggering-donor` decides whether the donor whose purchase opened the wave may also win it.

## Closing it

A wave with fewer than `min-participants` entrants pays nobody and fires the `gg-cancelled` announcement instead of `gg-end`.

`reward-mode: everyone` pays every entrant; anything else pays `winner-count` random entrants. `reward-timing: after_wave` pays when the window closes; `during_wave` pays each entrant the instant they enter.

## Rewards

```yaml
rewards:
  commands:
    - 'crate key give %player% rare 1'
  money: 0
  currency: ''
  money-command: ''
```

`%player%` and `%uuid%` are substituted in `commands`. `money` is paid through Vault when an economy provider is present; `money-command` is the fallback used when none is detected, with `%player% %uuid% %amount% %currency%` substituted.

## Announcing it

Presentation lives in `announcements.yml`, under the `gg-start`, `gg-end` and `gg-cancelled` events. See [Announcements](/plugins/oberondonations/features/announcements/).

## Commands

| Command | Does |
|---|---|
| `/donations gg info` | Entrant count and time left — or that none is running |
| `/donations gg start` | Force-start one, bypassing every trigger threshold |
| `/donations gg stop` | Close it early |

## See also

- [Hype Train](/plugins/oberondonations/features/hype-train/) — the other purchase-driven event, independent of this one
- [ggwave.yml reference](/plugins/oberondonations/configuration/ggwave-yml/)
