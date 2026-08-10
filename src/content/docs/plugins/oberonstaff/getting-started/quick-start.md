---
title: "Quick Start"
description: "Ranks, staff chat, the teleport suite and the vanish ladder — the six things to set up, in order."
---

## 1. Make the ranks match your permission plugin

The shipped list assumes LuckPerms-style `group.<name>` nodes:

```yaml
Ranks:
  - Permission: "group.owner"
    Display: "<gradient:#9B1306:#C21807><bold>Owner</bold></gradient> <#C21807>%player%</#C21807>"
  - Permission: "group.admin"
    Display: "…"
```

If yours are named differently, edit `Permission`. Otherwise everybody shows as **Member**.

> **Order is the whole contract.** An owner usually also holds every lower group's permission, so the highest rank must be listed first — or everyone comes out as a helper.

Check yours resolve:

```
/sc test
```

## 2. Confirm the vanish integration

```
/oberonstaff status
```

The first line names it. `none` on a server that runs PremiumVanish means the ladder is doing nothing.

## 3. Understand the ladder

```yaml
Vanish:
  Levels:
    - Target: "pv.see.level6"
      Required: "pv.see.level100"
    - Target: "pv.see.level5"
      Required: "pv.see.level5"
  Fallback-Required: "pv.see"
```

Read it as: *a vanished player holding `Target` can only be seen by somebody holding `Required`.*

The first rung the vanished player holds decides, **and it decides outright** — somebody on rung 5 is invisible to a viewer with only `pv.see`, even though that would have been enough for a plain vanished player. That is what lets senior staff hide from junior staff.

## 4. Know what `/tpo` is for

| Command | Reaches someone with `/tptoggle` on |
|---|---|
| `/tp`, `/tphere` | only if you hold `oberonstaff.teleport.override` |
| `/tpo`, `/tpohere` | yes |

In the old script `/tpo` was a copy of `/tp` and overrode nothing, so a staff member with teleports blocked was unreachable. Give the override permission to admins, not to everyone.

## 5. Decide about overlapping commands

If EssentialsX already provides `/tp` and `/back`, switch ours off rather than letting load order decide:

```yaml
Commands:
  tp:   { Enabled: false }
  back: { Enabled: false }
```

Restart after changing.

## 6. Turn the action log on or off

```yaml
Teleport:
  Log-Actions: true
```

Records who teleported to whom and where they ended up. Read it with:

```
/oberonstaff log 20
```

This is the answer to "how did that player get into the vault", which is a question staff teams actually have to answer and nothing else on the server can.

## Common adjustments

| Want | Change |
|---|---|
| Staff chat in the console too | `Staff-Chat.Log-To-Console: true` (default) |
| A different staff chat colour | `Staff-Chat.Format` in `config.yml` |
| `/back` to work after dying | `Teleport.Back.Record-Deaths: true` (default) |
| No teleport sound | `Teleport.Sound.Enabled: false` |
| Different permission nodes | Every command's `Permission` in `Commands` |
