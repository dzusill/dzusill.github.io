---
title: "Writing an Announcement"
description: "An announcement is a title, some lines, and an optional clickable call to action. Everything is MiniMessage."
---

An announcement is a title, some lines, and an optional clickable call to action. Everything is [MiniMessage](https://docs.advntr.dev/minimessage/format.html).

```yaml
  discord:
    title: "<b><gradient:#C21807:#F11800>Discord</gradient></b>"
    lines:
      - "<#F13131>Be Apart Of The YourServer Community!"
    click:
      text: "<#C21807>⏵ <#8e8e8e><underlined>/discord"
      command: "/discord"
```

Delivered, that is three chat lines: the title, the body line, and the click line.

## Inside a channel entry

| Key | | |
|---|---|---|
| `title` | optional | Prepended as the **first chat line**. Not an on-screen title. |
| `lines` | list | The body. Blank strings are kept as spacing. |
| `line` | string | A single-line alternative to `lines`. Used by the bundled presets. If `lines` is present, `line` is ignored. |
| `click` | section | A call-to-action line appended under the body. |
| `action-bar` | string or section | Also show text on the action bar. |
| `sound` | section | Override the global sound for this entry. |

> **`title:` inside a channel entry is a chat line, not a Minecraft title.** On-screen titles (header + subtitle, with fade timings) are only available in the separate `announcements:` section — see [Titles and action bars](#titles-and-action-bars).

An announcement must produce *something*: an entry whose lines are all blank, with no action bar and no title, is refused with `variant has no enabled output`.

## The click line

```yaml
    click:
      text: "<#C21807>⏵ <#8e8e8e><underlined>/discord"
      command: "/discord"
      hover: "<gray>Opens the Discord invite</gray>"
```

| Key | Default | |
|---|---|---|
| `text` | `""` | The line itself. Empty means no click line at all. |
| `command` | *required if `text` is set* | Run as the clicking player when the line is clicked. |
| `hover` | `<gray>Click to run <white>%command%</white></gray>` | Tooltip. `%command%` is replaced with the command. |

`text` without `command` refuses the config: `click.text needs a click.command to run`.

The command is attached to the finished component **after** your MiniMessage has been parsed. That is deliberate — it means a stray `<click:run_command:…>` tag written into the body cannot change which command a player ends up running. Do not write click tags by hand; use this block.

The command runs **as the player who clicked**, with their permissions. `/discord`, `/store` and `/vote` are the normal shape. Do not point one at a staff command.

Two switches in `config.yml` cover every `click:` block at once: `clickable-messages.enabled` for the line, `clickable-messages.hover` for the tooltip. Turning the tooltip off there also silences a `hover:` written here. See [`clickable-messages`](/plugins/dannounce/configuration/config/#clickable-messages).

## Action bars

Two spellings:

```yaml
    action-bar: "<yellow>Server restart in 5 minutes"
```

```yaml
    action-bar:
      text: "<yellow>Server restart in 5 minutes"
      duration-ticks: 200
```

The client fades an action bar out on its own after about three seconds. Anything asking for longer is the plugin resending the same line every 40 ticks until `duration-ticks` has elapsed, cancelling early if the player logs out. A duration of 40 ticks or less is a single send.

## Titles and action bars

An on-screen title is only available in the `announcements:` section, on a variant:

```yaml
announcements:
  restart:
    mode: INTERVAL
    schedule:
      every: 30m
    variants:
      main:
        chat:
          - "<gray>Scheduled restart approaching.</gray>"
        title:
          header: "<red><bold>RESTART"
          subtitle: "<gray>in 5 minutes"
          fade-in-ticks: 10
          stay-ticks: 60
          fade-out-ticks: 10
```

| Key | Default |
|---|---|
| `header` | `""` |
| `subtitle` | `""` |
| `fade-in-ticks` | `10` |
| `stay-ticks` | `60` |
| `fade-out-ticks` | `10` |

At least one of `header` and `subtitle` must be non-empty, and the `title` block is only read when one of them is set.

## Variants in the `announcements:` section

An announcement there has explicit variants, and `selection` decides how they are chosen — exactly like a channel's entries:

```yaml
announcements:
  tips:
    mode: INTERVAL
    selection: RANDOM
    schedule:
      every: 10m
    variants:
      homes:
        chat: [ "<gray>Set a home with /sethome.</gray>" ]
      warps:
        chat: [ "<gray>Explore with /warps.</gray>" ]
```

`chat` accepts a single string or a list, and `lines` is accepted alongside it and appended. Variants may also be written as a YAML list, in which case each entry names itself with `id:` or falls back to `variant-1`, `variant-2`, and so on.

All four output channels — `chat`, `click`, `action-bar`, `title` — may alternatively be grouped under an `outputs:` block on the variant. Both spellings load.

## Ids

Announcement ids are used by:

- `/announcements preview <id>`, `send <id>`, `next <id>`
- the permission node `dannounce.receive.<id>`
- `join.announcement`
- the rotation cursor in `state.yml`

Ids in the `announcements:` section are lower-cased on load. Lookups are case-insensitive everywhere.

Renaming an announcement resets its rotation cursor and, for a `ONCE` announcement, un-completes it — the old id is what `state.yml` remembers.

## Rendering order

Each line goes through three steps, in this order:

1. **Built-in placeholders** — `%player%`, `%online%`, `%max_players%`, `%announcement%`, `%variant%`
2. **PlaceholderAPI**, if installed
3. **MiniMessage**, which produces the final component

So a PlaceholderAPI placeholder that returns MiniMessage tags will have them rendered. See [Placeholders](/plugins/dannounce/placeholders/).

Delivery is per player and scheduled on that player's own thread context, and a failure to render one announcement for one player is logged rather than aborting the broadcast.
