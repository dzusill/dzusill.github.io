---
title: "Integrations"
description: "dNicks wants to be the single source of truth for a player's name, while cooperating with the plugins that own other surfaces (the tab list, the floating…"
---

dNicks wants to be the **single source of truth** for a player's *name*, while cooperating with the plugins that own other surfaces (the tab list, the floating nametag, chat). It exposes the nick as `%dnicks_name%` and gets out of the way everywhere else.

## EssentialsX

EssentialsX formats chat and changes the display name. dNicks already handles this:

- **Chat** — dNicks' renderer runs at `HIGHEST`, so it wins. Nothing required.
- **Display name** — for `/msg` and other display-name consumers to show the nick too, stop Essentials from overwriting it:

  ```yml
  # plugins/Essentials/config.yml
  change-displayname: false
  ```

dNicks logs this reminder at startup when EssentialsX is detected (toggle with `integrations.essentials-warn`).

## The TAB plugin — keep the role, swap the name

TAB owns the tab list and the floating nametag. dNicks does **not** render either of those itself — it feeds TAB the nick via `%dnicks_name%`, and your role plugin (LuckPerms, etc.) keeps supplying the prefix/suffix. Needs [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/).

**1. Nametag above the head.** Enable TAB's unlimited nametags (so the name line can carry hex), then set:

```yml
# TAB config.yml
scoreboard-teams:
  enabled: true
  unlimited-nametag-mode:
    enabled: true
```
```yml
# TAB groups.yml / users.yml
_DEFAULT_:
  tagprefix: "%luckperms_prefix%"
  customtagname: "%dnicks_name%"     # the gradient nick as the name
  tagsuffix: "%luckperms_suffix%"
```

**2. Tab list.** Let TAB render it from the same placeholder, and tell dNicks to stand down:

```yml
# dNicks config.yml
surfaces:
  tablist: false
```
```yml
# TAB groups.yml / users.yml
_DEFAULT_:
  tabprefix: "%luckperms_prefix%"
  customtabname: "%dnicks_name%"
  tabsuffix: "%luckperms_suffix%"
```

Result: `[OWNER] <gradient>DZUSILL</gradient>` above the head **and** in the tab list — role prefix from LuckPerms, gradient name from dNicks, one owner per surface, no duplicates.

dNicks logs this guidance at startup when TAB is detected (toggle with `integrations.tab-warn`). If you don't run TAB, leave `surfaces.tablist: true` and dNicks renders the tab list itself; the nametag above the head then stays the vanilla single-color name (see [The Nametag Above the Head](/plugins/dnicks/features/nametag/) for why).

## LuckPerms (or any role plugin)

dNicks never touches prefixes or suffixes — it only owns the **name**. Whatever your permissions plugin exposes as a placeholder (`%luckperms_prefix%`, `%luckperms_suffix%`, `%vault_prefix%`, …) keeps working; you place it around `%dnicks_name%` in whichever plugin renders the surface. That is the whole design: **roles stay yours, the name becomes the nick.**

## PlaceholderAPI

Required for the TAB/nametag setup above and recommended on any bigger network. Installing it lets dNicks expose `%dnicks_name%` and friends so any placeholder-aware plugin (scoreboards, TAB, chat plugins) renders the nick. See [Placeholders](/plugins/dnicks/placeholders/). It is **not** needed for dNicks' own built-in chat and tab-list surfaces.

## Summary

| You run… | Do this |
|---|---|
| Just dNicks (+ Essentials) | Nothing for chat/tab. Optional: Essentials `change-displayname: false`. Nametag above the head stays vanilla single-color. |
| dNicks + TAB (+ LuckPerms) | Install PlaceholderAPI. TAB nametag: `tagprefix: %luckperms_prefix%`, `customtagname: %dnicks_name%`, `tagsuffix: %luckperms_suffix%` (+ unlimited nametags on). TAB tab list: same with `tabprefix`/`customtabname`/`tabsuffix`, and `surfaces.tablist: false` in dNicks. |
| dNicks + other scoreboard/chat plugins | Install PlaceholderAPI and point them at `%dnicks_name%` (wrap with your role placeholders as needed). |
