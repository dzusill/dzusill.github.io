---
title: "Quick start"
description: "The shipped profiles.yml already describes a typical FFA arena. This page walks through it."
---

The shipped `profiles.yml` already describes a typical FFA arena. This page walks through it.

## 1. Point the profile at your world and kits

```yaml
profiles:
  ffa:
    worlds: [ffa]          # your arena world; "ffa_*" matches ffa_1, ffa_2...
    mode: choose           # menu; "random" gives a kit with no menu
    on-return: keep        # coming back keeps the inventory
    kits:
      - kit: ffa1          # the name in Essentials kits.yml
        display-name: "<white>FFA 1"
        icon: kit-first-item
        slot: 11
      - kit: ffa2
        display-name: "<white>FFA 2"
        icon: kit-first-item
        slot: 12
```

`icon: kit-first-item` shows the kit's first item in the menu. Use any material name instead, for
example `icon: DIAMOND_SWORD`.

## 2. Give the world its own inventory

In Multiverse-Inventories, keep the arena world out of the survival group (it is then its own group),
or put it in a group of its own. OberonKits checks this on every start and reload.

## 3. Set the death rules

```yaml
    death:
      drop-items: false
      drop-xp: false
      killer-xp:
        enabled: true
        type: bottles
        amount: 10-15
```

## 4. Reload and test

```
/okits reload
/okits list
```

Then walk into the arena: the menu opens, left-click equips, right-click previews, and the pearl at the
bottom gives a random kit. If you do not pick within 15 seconds, you get your last kit.

## Optional next steps

- Sell a stronger kit for Stardust: [Stardust kits](/plugins/oberonkits/features/stardust-kits/).
- Rebuild the arena every 30 minutes: [Arena regen](/plugins/oberonkits/features/arena-regen/).
- Change the texts and the menu: [messages.yml](/plugins/oberonkits/configuration/messages/),
  [menus.yml](/plugins/oberonkits/configuration/menus/).
