---
title: "Announcements"
description: "Every event — a purchase, a GG Wave starting, a Hype Train reaching a new level, a goal hitting a milestone — fans out across up to eight independent…"
---

Every event — a purchase, a GG Wave starting, a Hype Train reaching a new level, a goal hitting a milestone — fans out across up to eight independent presentation channels, configured in `announcements.yml`.

## The eight channels

| Channel | What it does |
|---|---|
| `chat` | One or more lines, sent to every online player (and optionally the console) |
| `actionbar` | Text above the hotbar, optionally repeated a number of times at an interval |
| `title` | An on-screen title and subtitle, with its own fade-in/stay/fade-out timing |
| `bossbar` | A boss bar with colour, progress and overlay style, shown for a fixed number of seconds |
| `sound` | One sound, played to every player, with volume and pitch |
| `particles` | Spawned at the donor's location, if they are online |
| `firework` | Launched at the donor's location, if they are online |
| `commands` | Dispatched as console, and/or as the donor if they are online |

Each channel has its own `enabled` switch — chat can be on while the boss bar is off, entirely independently.

## Defaults and per-event overrides

`defaults:` sets every channel once; each block under `events:` overrides only what differs for that specific event. A purchase can have its own sound while every other event uses the shared default, without repeating the rest of the block.

## The built-in events

| Event | Fires when |
|---|---|
| `purchase` | A purchase is recorded, above `min-amount` |
| `gg-start` / `gg-end` / `gg-cancelled` | A GG Wave opens, closes with winners, or closes with too few entrants |
| `hype-start` / `hype-level` / `hype-complete` / `hype-expired` | The Hype Train starts, reaches a new level, finishes its ladder, or times out |
| `goal-milestone` / `goal-complete` | A community goal crosses a configured percentage, or reaches 100% |

## Thresholds and formatting

- `min-amount` — purchases below this are still recorded toward every statistic and goal, just not announced. `0` announces everything.
- `anonymous-name` — shown instead of the donor's name when [purchase consent](/plugins/oberondonations/features/purchase-tracking/#donor-consent) is declined.
- `package-separator` — joins multiple package names in one checkout's `{product}` / `{packages}` placeholder.
- `chat-line-max-chars` — wraps a chat line at this many **visible** characters, ignoring MiniMessage tags, so a checkout with several long package names does not run off the screen. `0` disables wrapping.

## Placeholders

Every template uses `{brace}` placeholders. The full list — money, goal, Hype Train and GG Wave placeholders — is documented in the comment block at the top of `announcements.yml` itself, since it is the file you are editing while you need it. `{player_head}` is documented separately: see [The Donor's Head in Chat](/plugins/oberondonations/features/player-heads/), since it behaves differently from every other placeholder — it can carry a real image rather than text.

## MiniMessage throughout

Every text value — chat lines, action bar text, titles, boss bar text — is [MiniMessage](https://docs.advntr.dev/minimessage/format.html): `<#C21807>` for hex colour, `<bold>`, `<click:open_url:'...'>`, `<hover:show_text:'...'>`, gradients, and so on.

## See also

- [The Donor's Head in Chat](/plugins/oberondonations/features/player-heads/)
- [Currencies](/plugins/oberondonations/features/currencies/) — `{amount}` is always the purchase's own currency, never converted
- [announcements.yml reference](/plugins/oberondonations/configuration/announcements-yml/)
- [Discord Webhooks](/plugins/oberondonations/features/discord-webhooks/) — the same events, presented as embeds with their own `<angle>` placeholder syntax
