---
title: "Placeholders"
description: "Showing live values — the built-ins that need nothing installed, PlaceholderAPI, and the one rule about whose data you get."
---

A `%placeholder%` is replaced with a real value when the dialog opens.

```yaml
text: "<gray>Welcome back, <white>%player_name%</white>."
```

## Built in, no plugin needed

These work on a bare server:

| | |
|---|---|
| `%player_name%` | the viewer's name |
| `%player_displayname%` | their display name, flattened to plain text |
| `%player_uuid%` | their UUID |
| `%player_world%` | the world they are in |
| `%player_x%` `%player_y%` `%player_z%` | block coordinates |
| `%player_health%` | rounded up |
| `%player_food%` | hunger |
| `%player_level%` | XP level |
| `%player_gamemode%` | `survival`, `creative`, … |
| `%player_ping%` | ms |
| `%server_online%` | players online now |
| `%server_max_players%` | the slot count |
| `%server_version%` | e.g. `1.21.11` |

Requiring PlaceholderAPI just to print somebody's own name would be a poor default, so these are expanded first. The names match PAPI's own where they overlap, so installing PAPI later changes nothing.

## Everything else: PlaceholderAPI

Anything not in that list is handed to **PlaceholderAPI** if it is installed:

```yaml
text: "<gray>Balance: <green>$%vault_eco_balance%"
text: "<gray>Faction: <white>%dfactions_faction_name%"
```

Without PAPI — or with PAPI but without that expansion — the text renders **literally** as `%vault_eco_balance%`. Nothing errors; you just see the raw placeholder.

Test one before putting it in a file:

```
/papi list
/papi parse me %vault_eco_balance%
```

If `/papi parse` shows the placeholder unchanged, the dialog will too. Fix it there first.

## They resolve against the viewer

**A placeholder always describes the player looking at the screen** — never a player you name, and never the one whose button was clicked.

This surprises people building a stats screen. Click "DeadlyRaizo" in a player list, open a card with `%vault_eco_balance%` on it, and you see *your own* balance.

Two ways round it, and neither is a dialog feature:

1. Use placeholders that **take a name**, if your expansion offers them, and build the card with `dynamic-body`.
2. Run a command — `"[player] stats $(player_name)"` — and let the stats plugin open its own screen. One line, always works, and what most servers do.

## When they expand

Once, when the dialog opens, for that player. That is also the reason nothing on screen updates by itself: a value that changed a second later is not redrawn.

To refresh, reopen the dialog. That is the whole toggle pattern — see [Menu patterns](/plugins/ddialogs/menu-patterns).

## Placeholders inside tags

Perfectly normal, and used constantly:

```yaml
label: "<head:%player_name%> <white>Your profile"
```

:::caution[But a missing expansion can bite]
If the placeholder does not resolve, that becomes `<head:%ajlb_lb_..._name%>` — a head asked for a player whose name contains `%`. dDialogs drops an invalid name and draws nothing, so the screen survives. Just be aware that the *icon* silently disappears when the expansion is absent.
:::

## Colour has to come from the placeholder

There are no conditionals in a dialog. It prints what the placeholder hands it.

```yaml
label: "<green>Public Chat: %myplugin_chat_public%"    # OFF is also green
label: "<white>Public Chat: %myplugin_chat_public%"    # expansion returns "<green>ON"
```

So if a value should be green when ON and red when OFF, the plugin that owns the setting must return it **pre-coloured**. If you do not own that plugin, you live with one colour for both states.

## Not to be confused with `$(key)`

Two different things that look similar:

| | Expanded | From |
|---|---|---|
| `%player_name%` | when the dialog **opens** | the server, per viewer |
| `$(amount)` | when a button is **pressed** | an input field on that screen |
| `$(player_name)` | when the dialog **opens** | one row of a dynamic list |

See [Inputs](/plugins/ddialogs/features/inputs) and [Dynamic lists](/plugins/ddialogs/features/dynamic-lists).
