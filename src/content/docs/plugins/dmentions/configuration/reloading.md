---
title: "Reloading"
description: "Requires dmentions.reload (default op). Aliases /dms reload and /mentions reload work too."
---

```
/dm reload
```

Requires `dmentions.reload` (default op). Aliases `/dms reload` and `/mentions reload` work too.

---

## What reloads

- `config.yml` — every mention type, limits, cooldowns, worlds, integration toggles
- the active language file from `lang/`

Effective on the next chat message. No restart needed for any normal configuration change.

## What does not reload

- **Integrations.** If LuckPerms or EssentialsX was not present at startup, installing it later needs a restart — the hooks are wired once during enable.
- **`lang_file` itself.** Changing which language file is selected is picked up on reload; a file added to `lang/` while the server runs is read on the reload after it exists.
- **Active cooldowns.** A player mid-cooldown keeps it.

## The GUI is an alternative

```
/dm config
```

Edits the live configuration and writes it back to the file — no reload step at all. Better for tuning sounds, colours, cooldowns and radius by feel.

Do not edit the file by hand while someone has the GUI open; the GUI's next write can overwrite your change.

## If a reload fails

The previous configuration stays active. A YAML syntax error never leaves the plugin half-configured — fix the line named in the console and reload again.

## Never use `/reload confirm`

Bukkit's global reload re-enables plugins in an uncontrolled order and DzusillCore-based plugins do not survive it cleanly. Use `/dm reload` for configuration and a real restart for a jar upgrade.

## Next

- [Commands & Permissions](/plugins/dmentions/commands-and-permissions/)
