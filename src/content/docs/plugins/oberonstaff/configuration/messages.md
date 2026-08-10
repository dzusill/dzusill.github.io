---
title: "messages.yml"
description: "Every string a player sees, and the one pair you should keep identical."
---

`plugins/OberonStaff/messages.yml`. MiniMessage format. Reload with `/oberonstaff reload`.

`<prefix>` anywhere is replaced by the `prefix` key at the top.

> The staff chat line itself is **not** here — it is `Staff-Chat.Format` in `config.yml`, because it is built from the rank formats rather than being a plain string.

## Teleports

`%player%` — the target. `%target%` — the destination player, for the two-argument form.

```yaml
teleport:
  not-online: "<prefix><red>This player is not online."
  denied: "<prefix><red>Teleport denied."
  self: "<prefix><red>You can't teleport someone to themselves."
  to: "<prefix><gray>You teleported to <#C21807>%player%</#C21807>."
  other: "<prefix><gray>You teleported <#C21807>%player%</#C21807> to <#C21807>%target%</#C21807>."
  here: "<prefix><gray>You teleported <#C21807>%player%</#C21807> to you."
```

### Keep these two identical

```yaml
teleport:
  not-online: "<prefix><red>This player is not online."
# …
player-not-found: "<prefix><red>This player is not online."
```

`teleport.not-online` is sent when a player is vanished above your level. `player-not-found` is DzusillCore's own message when a name doesn't resolve at all.

**If they differ, the difference tells the sender that somebody invisible is online** — which defeats the point of vanish. Restyle both, together, and keep the wording the same.

## `/back`

```yaml
back:
  ok: "<prefix><gray>Returned to your previous location."
  none: "<prefix><red>You have nowhere to go back to."
```

## Toggles

```yaml
tptoggle:
  blocked: "…<bold>Teleport Access</bold>… <bold>Disabled</bold>…"
  allowed: "…<bold>Teleport Access</bold>… <bold>Enabled</bold>…"

staffchat:
  enabled: "…<bold>Staff Chat</bold>… <bold>Enabled</bold>…"
  disabled: "…<bold>Staff Chat</bold>… <bold>Disabled</bold>…"
```

`tptoggle.blocked` is shown when incoming teleports are now **refused**.

## Command output

```yaml
command:
  usage: [ … ]                    # a list — each entry is one line
  reloaded: "…%ranks%…"
  status:                         # also a list
    - "…%vanish% %vanish_enabled% %levels%…"
    - "…%storage% %log%…"
    - "…%staffchat% %tptoggle%…"
  log:
    header: "…%count%…"
    line: "…%when% %actor% %action% %target% %world% %x% %y% %z%"
    empty: "…"
    unavailable: "…"
```

Any message key can be a list, and renders as several lines.

## Gradients

The shipped messages use `<gradient:#a:#b>` rather than a hex code per letter. Same look, far easier to restyle:

```yaml
  blocked: "<gradient:#C21807:#F11800><bold>Teleport Access</bold></gradient> <dark_gray>»</dark_gray> <gradient:#FF5555:#E64D4D><bold>Disabled</bold></gradient>"
```

## DzusillCore built-ins

The bottom of the file holds the framework's own messages: `no-permission`, `players-only`, `invalid-usage` and friends. Restyle them freely; don't rename the keys — and mind `player-not-found`, noted above.

## If a message shows as its key

Seeing `teleport.denied` in-game means the key is missing. That is deliberate — a missing message is visible rather than silent. Add it back, or delete the file and restart to regenerate it.
