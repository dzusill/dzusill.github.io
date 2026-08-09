---
title: "Quick Start"
description: "Five minutes, all four mention types."
---

Five minutes, all four mention types.

---

## 1. Mention a player

```
Hey @Steve, come to spawn
```

Steve hears `entity.chicken.egg` and sees his name in `#a9e871`. Everyone else sees the highlight without the sound.

## 2. Mention nearby players

```
@nearby anyone got spare iron?
```

Pings everyone within 20 blocks (`nearby.radius`). Cooldown: 10 seconds.

## 3. Mention everyone

```
@everyone event starting in 5
```

Restrict this one before players find it:

```
lp group default permission set dmentions.mention.everyone false
lp group mod permission set dmentions.mention.everyone true
```

## 4. Mention a group

```
@vip early access is live
```

Needs LuckPerms and `dmentions.mention.group.vip`. Groups listed under `group.disabled_groups` (default `admin`, `owner`) can never be mentioned.

## 5. Customise your own tag

```
/dm customize <display>
```

Changes how *your* name renders when someone mentions you, within whatever the server allows. See [Player Customisation](/plugins/dmentions/features/customisation/).

## 6. Turn mentions off

```
/dm toggle
```

Per-player opt-out. They stay mentionable but stop being pinged.

## 7. Edit settings in game

```
/dm config
```

A GUI over the live configuration — sounds, colours, cooldowns, radius — no file editing, no reload.

---

## Tuning worth doing on day one

| Setting | Why |
|---|---|
| `disabled_worlds` | replace the placeholder names with your own, or empty the list |
| `mention_limit: 2` | max mentions per message — the main anti-spam knob |
| `everyone.permission` | restrict it before players discover it |
| `group.disabled_groups` | make sure staff groups are listed |
| `*.cooldown` | raise on a busy server |

## Next

- [Player Mentions](/plugins/dmentions/features/player-mentions/)
- [Cooldowns & Limits](/plugins/dmentions/features/cooldowns-and-limits/)
