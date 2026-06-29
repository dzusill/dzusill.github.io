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

TAB drives the tab list and nametags and will fight a second owner on the same surface. Run **one owner per surface**: dNicks owns the floating nametag (it's the only way to get a gradient name — see [The Floating Nametag](/plugins/dnicks/features/nametag/)); TAB keeps the tab list and team sorting.

**1. Tab list** — let TAB render it, fed by dNicks:

```yml
# dNicks config.yml
surfaces:
  tablist: false
```
```yml
# TAB groups.yml / users.yml
customtabname: "%dnicks_name%"   # needs PlaceholderAPI
```

**2. Hide the vanilla name without a team fight.** A player can only be on one scoreboard team, and TAB uses teams for sorting — so let TAB hide the name and tell dNicks to stand down:

```yml
# TAB config.yml
scoreboard-teams:
  invisible-nametags: true   # hides the vanilla name AND keeps sorting
# also DISABLE TAB's own nametag / unlimited-nametag feature
```
```yml
# dNicks config.yml
nametag-display:
  hide-vanilla: false        # TAB is hiding it now; don't run dNicks' own team
```

**3. Put the rank prefix / suffix into dNicks' tag.** Since dNicks renders the whole floating tag, pull LuckPerms (and anything else) in via PlaceholderAPI:

```yml
# dNicks config.yml
formats:
  nametag:
    - "%luckperms_prefix%%name%%luckperms_suffix%"
    - "<green>$%vault_eco_balance_formatted%</green>"
```

Result: one floating tag — `[OWNER] <gradient>name</gradient>` over `$231k` — no duplicate, gradient intact.

dNicks logs this guidance at startup when TAB is detected (toggle with `integrations.tab-warn`). If you don't run TAB, ignore all of this — `tablist: true`, `hide-vanilla: true`, and dNicks owns everything.

## PlaceholderAPI

Optional but recommended on a bigger network. Installing it lets dNicks expose `%dnicks_name%` and friends so any placeholder-aware plugin renders the nick. See [Placeholders](/plugins/dnicks/placeholders/). Not needed for dNicks' own chat / tab / nametag.

## Summary

| You run… | Do this |
|---|---|
| Just dNicks (+ Essentials) | Nothing for chat/tab/nametag. Optional: Essentials `change-displayname: false`. |
| dNicks + TAB (+ LuckPerms) | `tablist: false` + `hide-vanilla: false`; TAB `customtabname: "%dnicks_name%"`, `invisible-nametags: true`, disable TAB nametags; put `%luckperms_prefix%%name%%luckperms_suffix%` in `formats.nametag`. |
| dNicks + other scoreboard/chat plugins | Install PlaceholderAPI and point them at `%dnicks_name%`. |
