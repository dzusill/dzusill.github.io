---
title: "Reloading"
description: "Requires dweblink.admin (default op)."
---

```
/dweblink reload
```

Requires `dweblink.admin` (default op).

---

## What reloads

- `config.yml` — including API URL, key, tenant, cooldowns and every `profile-sync` setting
- `messages.yml` — every line

Changes take effect on the next command. You do not need to restart to point the plugin at a different API.

## What does not reload

- **Pending state.** A player who is midway through a `/discordunlink` confirmation keeps their old timeout. Codes cached for `/linkdiscord` are cleared.
- **The LuckPerms hook.** If LuckPerms was absent at startup, installing it later still needs a restart.

## If a reload fails

```
WebLink » Reload failed — check the console.
```

The old configuration stays active — a broken YAML file never leaves the plugin half-configured. Fix the syntax error named in the console and reload again.

## Never use `/reload confirm`

Bukkit's global `/reload` re-enables plugins in an order nothing controls, and DzusillCore-based plugins do not survive it cleanly. Use `/dweblink reload` for configuration and a real restart for jar upgrades.

## Config merging

On startup, keys added by a newer version are merged into your existing `config.yml` with their comments, and your values are preserved. You never have to delete the file to pick up new options.

## Next

- [Commands & Permissions](/plugins/dweblink/commands-and-permissions/)
