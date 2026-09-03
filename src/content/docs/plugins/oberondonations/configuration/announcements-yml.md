---
title: "announcements.yml"
description: "The multi-channel presentation rig — see Announcements for how the pieces fit together conceptually. This page is the key-by-key reference."
---

The multi-channel presentation rig — see [Announcements](/plugins/oberondonations/features/announcements/) for how the pieces fit together conceptually. This page is the key-by-key reference.

## Top-level keys

| Key | Controls |
|---|---|
| `enabled` | Master switch for the whole announcement pipeline |
| `min-amount` | Purchases below this are recorded but not announced |
| `anonymous-name` | Shown instead of the donor's name when they decline consent |
| `package-separator` | Joins multiple package names in `{product}` / `{packages}` |
| `chat-line-max-chars` | Wraps a chat line at this many visible characters; `0` disables wrapping |
| `player-head-hover` | Master switch for `{player_head}` resolving a real skin at all |
| `player-head-style` | `pixels` (8×8 face art) or `icon` (native one-character head) — see [The Donor's Head in Chat](/plugins/oberondonations/features/player-heads/) |
| `player-head-pixel` | The character drawn per skin pixel, `pixels` style only |
| `player-head-text-row` | Which face row the first chat line sits beside, `pixels` style only |
| `player-head-gap` | What separates the face from the text, `pixels` style only — MiniMessage, so it may carry colour |
| `debug-chat-json` | Logs every rendered chat line as raw JSON, tagged `[chat-json]` — the diagnostic tool for a missing head; see [Troubleshooting](/plugins/oberondonations/features/player-heads/#troubleshooting) |

## `defaults:` — one block per channel

```yaml
defaults:
  chat:
    enabled: true
    console: true
    lines: []
  actionbar:
    enabled: false
    text: ''
    repeat: 1
    repeat-interval-ticks: 40
  title:
    enabled: false
    title: ''
    subtitle: ''
    fade-in-ticks: 10
    stay-ticks: 60
    fade-out-ticks: 10
  bossbar:
    enabled: false
    text: ''
    color: PINK          # PINK BLUE RED GREEN YELLOW PURPLE WHITE
    overlay: PROGRESS    # PROGRESS NOTCHED_6 NOTCHED_10 NOTCHED_12 NOTCHED_20
    progress: 1.0
    seconds: 8
  sound:
    enabled: false
    name: entity_experience_orb_pickup
    volume: 1.0
    pitch: 1.0
  particles:
    enabled: false
    type: HAPPY_VILLAGER
    count: 40
    spread: 0.6
    at-donor: true
  firework:
    enabled: false
    colors: ['#FBBF24', '#C21807']
    type: BALL_LARGE     # BALL BALL_LARGE STAR BURST CREEPER
    power: 1
    flicker: true
    trail: true
  commands:
    enabled: false
    console: []
    player: []
```

`sound.name` accepts either the registry key (`entity_experience_orb_pickup`) or the enum-style name (`ENTITY_EXPERIENCE_ORB_PICKUP`) — both are checked.

## `events:` — overriding one event

Each block under `events:` only needs to state what differs from `defaults:`; anything not restated is inherited.

```yaml
events:
  purchase:
    chat:
      enabled: true
      lines:
        - ''
        - '<#C21807>{player_head} <#AAAAAA>purchased:'
        - '<#909090>{product}'
        - "<click:open_url:'{open_url}'><#AAAAAA><underlined>{store}</underlined></click>"
        - ''
    sound:
      enabled: true
      name: entity_player_levelup
      volume: 0.7
      pitch: 1.2
    firework:
      enabled: false
```

Built-in event keys: `purchase`, `gg-start`, `gg-end`, `gg-cancelled`, `hype-start`, `hype-level`, `hype-complete`, `hype-expired`, `goal-milestone`, `goal-complete`.

## Placeholders

| Group | Placeholders |
|---|---|
| Purchase | `{player}` `{player_head}` `{product}` `{packages}` `{store}` `{open_url}` `{player_uuid}` `{player_uuid_compact}` |
| Money | `{amount}` `{amount_plain}` `{amount_raw}` `{currency}` `{currency_symbol}` — see [Currencies](/plugins/oberondonations/features/currencies/) |
| Goals | `{goal_name}` `{goal_percent}` `{goal_current}` `{goal_target}` `{goal_bar}` |
| Hype Train | `{hype_level}` `{hype_percent}` `{hype_total}` `{hype_donors}` `{hype_seconds_left}` `{hype_top_name}` `{hype_top_amount}` `{hype_top_1_name}` … `{level_name}` |
| GG Wave | `{gg_word}` `{gg_seconds}` `{gg_participants}` `{gg_winner}` `{gg_winners}` |

`{player_head}` is documented separately in [The Donor's Head in Chat](/plugins/oberondonations/features/player-heads/) — it can carry a real image, not just text, and only ever renders inside `chat`.

All text is [MiniMessage](https://docs.advntr.dev/minimessage/format.html): `<#C21807>`, `<bold>`, `<click:open_url:'...'>`, `<hover:show_text:'...'>`, gradients.

## Upgrading an existing file

The one purchase-line migration this plugin performs on its own — `{player}` → `{player_head}` on the exact legacy line, and only that line — is covered in the [FAQ](/plugins/oberondonations/faq/#i-upgraded-and-the-purchase-chat-line-still-says-player-not-player_head). Every other new key merges in automatically on load; `events:` itself never does, so any event you have edited is never touched by an update.

## See also

- [Announcements](/plugins/oberondonations/features/announcements/)
- [The Donor's Head in Chat](/plugins/oberondonations/features/player-heads/)
- [Reloading](/plugins/oberondonations/configuration/reloading/)
