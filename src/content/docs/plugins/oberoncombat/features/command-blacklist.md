---
title: "Command blacklist"
description: "While tagged, a player cannot run the commands you list."
---

While tagged, a player cannot run the commands you list.

```yaml
command-blacklist:
  enabled: true
  mode: blacklist          # blacklist | whitelist
  block-aliases: true
  commands: [tpa, home, spawn, warp, rtp, kill, suicide]
  message-cooldown: 1s
```

- **`blacklist`**: the listed commands are blocked.
- **`whitelist`**: **only** the listed commands work.
- **`block-aliases: true`** also blocks every alias of a listed command as the server knows it, and the namespaced forms
  such as `/essentials:home`. `/HOME` is the same as `/home`.
- A blocked command gets the `command-blocked` message (`%command%`) and sound, at most once per `message-cooldown`; the command
  stays blocked every time.

`oberoncombat.exempt.commands` lets a player use blacklisted commands in combat. Excluded places (`command-blacklist`)
switch the list off there. The default list is the one the client asked for; trim it to taste.
