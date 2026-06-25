---
title: "config.yml"
description: "The settings file at plugins/dHomeGUI/config.yml. Strings are MiniMessage (the default theme is light-blue: emphasis #2C99F8, body #8CCAFF). Two top…"
---

The settings file at `plugins/dHomeGUI/config.yml`. Strings are [MiniMessage](https://docs.advntr.dev/minimessage/format.html) (the default theme is light-blue: emphasis `#2C99F8`, body `#8CCAFF`). Two top sections: `Settings` and `GUI`.

---

## Settings

### Materials

`Settings.DefaultMaterial` is the icon for homes with no custom icon (`PLAYER_HEAD` renders the owner's skull). `Settings.Materials` maps every button/decoration icon.

### SetHome

```yaml
Settings:
  SetHome:
    MinLength: 1
    MaxLength: 16
    AllowSpaces: false
    FirstHomeIsDefault: true
    DefaultLimit: 1
    Blacklist: [reload, admin, set, default, public, private, ...]
```

Name rules and the base home limit — see [Setting Homes](/plugins/dhomegui/features/setting-homes/) and [Home Limits](/plugins/dhomegui/features/home-limits/).

### Description

```yaml
Settings:
  Description: { MaxLines: 3, MaxLineLength: 50, Default: '<italic>...No description set.</italic>' }
```

### Teleport

```yaml
Settings:
  Teleport: { WarmupSeconds: 3, CancelOnMove: true, CancelOnDamage: true, Particle: PORTAL, CheckUnsafe: true }
```

The teleport warmup and unsafe check — full reference in [Teleporting](/plugins/dhomegui/features/teleporting/).

### Cooldowns

```yaml
Settings:
  CooldownsInSeconds: { Teleport: 3, EditIcon: 5, EditDescription: 5 }
```

### Worlds

```yaml
Settings:
  Worlds: { Disallowed: [...], WhitelistOnly: false, Allowed: [...], RespectWorldGuard: true }
```

Where homes may be set — see [World Rules](/plugins/dhomegui/features/world-rules/).

### Confirmations & Economy

```yaml
Settings:
  Confirmations: { Delete: true }
  Economy:
    Enabled: false
    SlotsPerPurchase: 1
    Costs: { SetHome: 0, Teleport: 0, Rename: 0, BuySlot: 1000 }
    Confirm: { Teleport: true }
```

See [Economy](/plugins/dhomegui/features/economy/).

### Types

Cosmetic home [types](/plugins/dhomegui/features/home-editor/#home-types) (Base, Farm, Mine, Shop, Other), each with a `DisplayName` and `Material`. `Settings.DateFormat` controls how created/last-visited dates render.

---

## GUI

Titles, lore and buttons for every menu, all MiniMessage:

- `GUI.Rows` (3–6, default 6) — height of the list menus (Homes / Public / Admin).
- `GUI.Filler` — border on/off (`Border`) and material.
- Menu titles (`HomesDisplayName`, `AdminHomesDisplayName`, …) with `{0}`/`{1}` page numbers and `{2}` name/owner.
- Home item lore (`HomeLore`, `AdminHomeLore`) with positional placeholders for world, coords, type, dates, access and status.
- Bottom-row buttons (`CreateHome`, `Sort`, `FilterWorld`, `FilterCategory`, `Search`, `Close`) — `Slot: -1` auto-places them.
- Editor buttons (`Teleport`, `Rename`, `ChangeIcon`, `EditDescription`, `SetType`, `SetDefault`, `Pin`, `ToggleVisibility`, `Whitelist`, `Delete`) with fixed slots and active/inactive variants.
- `ConfirmYes` / `ConfirmNo` for the confirmation menu.

> After editing config, run `/dhomeadmin reload` and reopen the menu to apply. Leave the trailing `version: 1` untouched.
