---
title: "Integrations"
description: "dNicks wants to be the single source of truth for a player's name. Here's how it coexists with the plugins that also touch names."
---

dNicks wants to be the **single source of truth** for a player's name. Here's how it coexists with the plugins that also touch names.

## EssentialsX

EssentialsX formats chat and changes the display name. dNicks already handles this:

- **Chat** — dNicks' renderer runs at `HIGHEST`, so it wins. Nothing required.
- **Display name** — for `/msg` and other display-name consumers to show the nick too, stop Essentials from overwriting it:

  ```yml
  # plugins/Essentials/config.yml
  change-displayname: false
  ```

dNicks logs this reminder at startup when EssentialsX is detected (toggle with `integrations.essentials-warn`).

## The TAB plugin

TAB drives the tab list and nametags via packets and will fight a second owner on the same surface. Run **one owner per surface**:

- **Tab list** — let TAB render it, fed by dNicks:

  ```yml
  # dNicks config.yml
  surfaces:
    tablist: false
  ```
  ```yml
  # TAB groups.yml / users.yml
  customtabname: "%dnicks_name%"   # needs PlaceholderAPI
  ```

- **Nametag** — **disable TAB's nametag feature** so dNicks' `TextDisplay` is the sole owner of the floating name.

dNicks logs this guidance at startup when TAB is detected (toggle with `integrations.tab-warn`). If you don't run TAB, ignore all of this — `tablist: true` and dNicks owns everything.

## PlaceholderAPI

Optional but recommended on a bigger network. Installing it lets dNicks expose `%dnicks_name%` and friends so any placeholder-aware plugin renders the nick. See [Placeholders](/plugins/dnicks/placeholders/). Not needed for dNicks' own chat / tab / nametag.

## Summary

| You run… | Do this |
|---|---|
| Just dNicks (+ Essentials) | Nothing for chat/tab/nametag. Optional: Essentials `change-displayname: false`. |
| dNicks + TAB | `tablist: false` + TAB `customtabname: "%dnicks_name%"` + disable TAB nametags. |
| dNicks + other scoreboard/chat plugins | Install PlaceholderAPI and point them at `%dnicks_name%`. |
