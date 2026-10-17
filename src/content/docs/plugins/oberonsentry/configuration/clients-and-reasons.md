---
title: "clients.yml and reasons.yml"
description: "The rules for client detection. Each rule under rules: has:"
---

## clients.yml

The rules for [client detection](/plugins/oberonsentry/features/client-detection/). Each rule under `rules:` has:

| Key | What it does |
| --- | --- |
| `match.brand` | Regex against the client brand (case-insensitive) |
| `match.channels` | List of regexes against the plugin channels the client registered |
| `match.protocol` | `[min, max]` protocol numbers, `-1` = open end |
| `confidence` | `CONFIRMED`, `SUSPICIOUS` or `INCONCLUSIVE` |
| `action` | `LOG`, `FLAG` (adds a client flag to the score) or `KICK` |
| `reason` | Kick message (MiniMessage), also shown in the profile |

A rule matches when any of its `match` entries matches. If several rules match, the strongest action wins. For example:

```yaml
rules:
  meteor:
    match:
      brand: meteor
      channels: ['^meteor']
    confidence: CONFIRMED
    action: KICK
    reason: '<red>Prohibited client (Meteor).'
```

The rest of the file:

| Key | What it does |
| --- | --- |
| `known-brands` | Regexes of normal brands. A player with one of these brands and no matching rule is not recorded at all |
| `unknown-brand` | `confidence` / `action` / `reason` for a brand that matches neither a rule nor `known-brands` (default: LOG) |
| `no-brand` | Same, for a client that sent no brand at all (default: LOG) |

Rules you delete stay deleted, and so do their `match` entries. A broken regex is reported in the console and that entry is skipped.

## reasons.yml

The presets offered in the action menus. **Custom…** always lets staff type their own, unless you set `custom-allowed: false`.

```yaml
reasons:
  kick: [Investigation in progress, Suspicious client, Please rejoin]
  ban:  [Cheating (Kill Aura), Cheating (Reach), …, Prohibited client]
  mute: [Spam, Toxicity, Advertising]
durations: [1h, 6h, 1d, 3d, 7d, 30d, permanent]
custom-allowed: true
```

`permanent` stands for a permanent ban or mute (LiteBans' `ban` / `mute`). Every other entry is a duration, like `12h` or `1d12h`, and runs `tempban` / `tempmute`.
