---
title: "Placeholders"
description: "They are substituted per player, at the moment of delivery, in every rendered string:"
---

> **OberonAnnounce registers no PlaceholderAPI expansion.** There is no `%oberonannounce_…%`. The placeholders on this page are substituted by OberonAnnounce itself in announcement text, and PlaceholderAPI — if you have it — resolves everything else.

## The five built-ins

| Placeholder | Returns |
|---|---|
| `%player%` | The receiving player's name |
| `%online%` | Players online right now |
| `%max_players%` | The server's player limit |
| `%announcement%` | The id of the announcement being delivered |
| `%variant%` | The id of the entry being delivered |

They are substituted per player, at the moment of delivery, in every rendered string:

- every chat line, including the one `title:` produces
- `click.text` and `click.hover`
- `action-bar` text
- `title.header` and `title.subtitle`
- every `motd.lines` entry

```yaml
  welcome:
    title: "<b><gradient:#C21807:#F11800>Welcome</gradient></b>"
    lines:
      - "<#F13131>Hey %player%, there are <#C21807>%online%<#F13131>/<#C21807>%max_players%<#F13131> players online."
```

### `%announcement%` and `%variant%`

For an entry inside a channel, `%announcement%` is the channel id and `%variant%` is the entry id:

```
%announcement%  →  chat-announcements
%variant%       →  discord
```

For an announcement in the `announcements:` section they are its id and the variant's id. For a MOTD line **both** render as `motd` — the MOTD is not an announcement and has no ids of its own.

Mostly useful while debugging a rotation: drop `%variant%` into a line to see which entry actually fired.

## `%command%`

One more, available in `click.hover` only:

```yaml
    click:
      text: "<#C21807>⏵ <#8e8e8e><underlined>/discord"
      command: "/discord"
      hover: "<gray>Click to run <white>%command%</white></gray>"
```

It expands to `click.command`, and that hover text is the default when an entry does not spell one out. It is substituted before the line is rendered, so it works alongside the five above.

## PlaceholderAPI

PlaceholderAPI is an optional `softdepend`. When it is installed, **every** announcement line is passed through it for the receiving player before the MiniMessage is parsed. Anything PAPI knows works:

```yaml
  balance:
    lines:
      - "<#F13131>%player%, you have <#C21807>%vault_eco_balance_formatted%<#F13131>."
```

Without PlaceholderAPI the plugin's own five are still substituted, and any other `%…%` is left as literal text — you will see the raw placeholder in chat, which is the honest signal that PAPI is not installed.

The hook is registered at enable. If you install PlaceholderAPI afterwards, restart; `/announcements reload` does not pick it up.

## Rendering order

Each line goes through three steps, always in this order:

1. **Built-in placeholders** — the five above, plus `%command%` in a hover
2. **PlaceholderAPI**, if installed
3. **MiniMessage**, which produces the final component

Because PAPI runs before MiniMessage, a placeholder whose value contains MiniMessage tags has them **rendered**, not shown. That is usually what you want — a coloured rank prefix arrives coloured. It also means a PAPI value carrying player-supplied text (a nickname, a chat message) can introduce tags of its own into an announcement, so do not build an announcement out of text a player controls.

The one thing that cannot be rewritten this way is a click line's command: the run-command event is attached to the finished component **after** parsing, so no tag reaching the body — from your own text or from a placeholder — can change which command a player ends up running. See [Writing an Announcement](/plugins/oberonannounce/features/announcements/#the-click-line).

## Delivery is per player

Every line is rendered separately for each recipient, on that player's own thread context. `%player%` and `%online%` are therefore correct for each of them, and a PAPI placeholder resolves against the player who is reading it.

A line that fails to render for one player is logged and that player is skipped; the broadcast continues:

```
[OberonAnnounce] Could not deliver announcement chat-announcements/discord to Steve
```

## Not the same as the command's placeholders

`messages.yml` has its own, unrelated set — `%id%`, `%variant%`, `%count%`, `%timezone%` and friends, each valid only in specific keys. They are listed on [messages.yml](/plugins/oberonannounce/configuration/messages/#placeholders-per-key).
