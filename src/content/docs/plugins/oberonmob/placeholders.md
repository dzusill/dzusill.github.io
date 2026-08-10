---
title: "Placeholders"
description: "PlaceholderAPI placeholders for each toggle's state and how many players are using it."
---

Requires [PlaceholderAPI](https://www.spigotmc.org/resources/6245/). Without it the plugin works fine — the placeholders just aren't registered.

The expansion is registered by OberonMob itself, so there is nothing to download from `/papi ecloud` and it survives `/papi reload`.

## Available

| Placeholder | Returns |
|---|---|
| `%oberonmob_<key>%` | `on` or `off` for the viewing player |
| `%oberonmob_<key>_users%` | How many online players currently have it off |

`<key>` is the toggle's config key, not its command name. With the shipped config:

- `%oberonmob_mobs%`
- `%oberonmob_phantoms%`
- `%oberonmob_mobs_users%`

A toggle you add works the same way — `%oberonmob_creepers%` exists as soon as the `creepers:` entry does.

An unknown key returns nothing, so a placeholder for a toggle you deleted shows as blank rather than as an error.

## Reading it

**`on` means mobs are spawning** — the toggle is not suppressing anything. `off` means the player switched them off. That matches what the command says.

## Examples

In a tab list, so staff can see who has what off:

```yaml
suffix: " &7[mobs: %oberonmob_mobs%]"
```

On a scoreboard:

```yaml
- "&fMobs: &a%oberonmob_mobs%"
- "&fPhantoms: &a%oberonmob_phantoms%"
```

`_users` is mostly useful for a staff panel — if half the server has mobs off, that is worth knowing before you wonder why spawn rates look low.

## Verifying

```
/papi parse me %oberonmob_mobs%
```

If that returns the literal text rather than `on` or `off`, the expansion did not register — check the console at startup for:

```
[OberonMob] Registered PlaceholderAPI expansion.
```

No such line means PlaceholderAPI was not installed when OberonMob started. Install it and restart; the check happens once, at enable.
