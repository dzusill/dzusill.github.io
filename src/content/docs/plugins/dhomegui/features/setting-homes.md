---
title: "Setting & Deleting Homes"
description: "Creates a home at your current location (requires dhomegui.sethome). You can also use the Create Home button in the menu."
---

## Setting a home

```
/sethome <name>
```

Creates a home at your current location (requires `dhomegui.sethome`). You can also use the **Create Home** button in the [menu](/plugins/dhomegui/features/homes-menu/).

Name rules, from `Settings.SetHome` in [config.yml](/plugins/dhomegui/configuration/config/):

| Rule | Default | Key |
|---|---|---|
| Minimum length | 1 | `MinLength` |
| Maximum length | 16 | `MaxLength` |
| Spaces allowed | no | `AllowSpaces` |
| Blacklisted names | `reload`, `admin`, `set`, `default`, `public`, … | `Blacklist` |

- **First home becomes default** when `FirstHomeIsDefault: true`, so bare `/home` works immediately.
- **Overwriting:** re-running `/sethome <existing>` updates that home's location only if the player has `dhomegui.sethome.overwrite`; otherwise it errors with *"A home named … already exists."*
- **Limits:** creating is blocked once a player hits their [home limit](/plugins/dhomegui/features/home-limits/) (*"You've reached your home limit! (x/y)"*).
- **World & region rules** may block `/sethome` — see [World Rules](/plugins/dhomegui/features/world-rules/).
- If [economy](/plugins/dhomegui/features/economy/) charges for `SetHome`, a confirm prompt appears first.

## Deleting a home

```
/delhome <name>
```

Deletes one of your homes (requires `dhomegui.delhome`). With `Settings.Confirmations.Delete: true`, you must confirm — run the command again, or double-click **Delete** in the editor. Deleting the default home clears the default.

## Renaming

Renaming is done from the [home editor](/plugins/dhomegui/features/home-editor/) (the **Rename** button), not a command. It respects the same name rules.
