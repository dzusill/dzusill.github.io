---
title: "Menus (gui/*.yml)"
description: "Every menu is one file in plugins/OberonSusMenu/gui/. You can change its title, size, items, texts, slots and sounds, and /sus reload applies the changes."
---

Every menu is one file in `plugins/OberonSusMenu/gui/`. You can change its title, size, items, texts, slots and sounds, and `/sus reload` applies the changes.

| File | Menu |
| --- | --- |
| `main.yml` | The `/sus` list, its buttons and what each click on a head does |
| `filters.yml` | The filter menu |
| `checks.yml` | Picking one check to filter by |
| `actions.yml` | Actions on one player |
| `profile.yml` | A player's profile |
| `history.yml` | A player's flags, one template per category |
| `confirm.yml` | "Are you sure?" |
| `choice.yml` | Picking a reason or a duration |

## Menu keys

| Key | What it does |
| --- | --- |
| `title` | MiniMessage title |
| `rows` | 1 to 6 |
| `content-slots` | Slots for list entries; empty = every slot above the bottom row |
| `sound` | Click sound, e.g. `ui.button.click` |
| `filler` | Item for empty slots (`enabled: false` = none) |
| `entry` / `templates.*` | How list entries look |
| `buttons.<id>` | The menu's buttons |

## Item keys

Every item (button, entry, template, filler) takes:

| Key | What it does |
| --- | --- |
| `slot` | Where it goes (buttons) |
| `material` | Any material; `PLAYER_HEAD` shows the player's skin |
| `name`, `lore` | MiniMessage text with placeholders. A lore line that is exactly `{options}` expands to the list of options (sort, window, filters) |
| `permission` | The button is hidden from staff without it. The action checks it again anyway |
| `glow` | Enchantment glint |
| `custom-model-data` | For resource packs |
| `enabled` | `false` = not drawn |

## Clicks on a head (main.yml)

```yaml
clicks:
  LEFT: TELEPORT
  RIGHT: ACTIONS
  SHIFT_LEFT: PROFILE
  SHIFT_RIGHT: SPECTATE
  DROP: HISTORY
```

Actions: `TELEPORT`, `ACTIONS`, `PROFILE`, `HISTORY`, `SPECTATE`, `FREEZE`, `NONE`. To switch a click off, set it to `NONE`: a deleted line comes back on restart. `MIDDLE` only works in creative mode.

## Placeholders

**A suspect** appears on each head in `main.yml` and on every item in `actions.yml` and `profile.yml`:

| Placeholder | Value |
| --- | --- |
| `{player}` `{uuid}` | Name, UUID |
| `{flags}` `{window}` | Flags in the current window, and the window (`24h`) |
| `{last_check}` `{last_check_ago}` | Last check (`Reach (A)`) and how long ago |
| `{category}` `{anticheat}` `{info}` | Of the last flag |
| `{score}` `{risk}` `{risk_color}` | Score, risk name, and its colour tag (`<red>`) |
| `{online}` `{ping}` | Online/offline, ping |
| `{case}` `{case_status}` `{assignee}` | `#12`, Open / Under review / …, who took it |
| `{client}` `{version}` | Client brand and Minecraft version |
| `{platform}` | Java or Bedrock |

**main.yml**:

| Where | Placeholders |
| --- | --- |
| Title | `{count}` `{window}` `{sort}` |
| sort, window, filters, search, close | `{count}` `{window}` `{sort}` `{search}` `{filters}` |
| previous, next, page, empty | `{page}` `{pages}` `{count}` `{window}` |

**profile.yml** adds `{first_join}` `{last_join}` `{playtime}` `{ip}` `{profile_client}` `{profile_version}` `{cases}` `{case_opened}` `{case_reason}` `{channels}`, and the list lines `{contributors}` `{detections}` `{punishments}` `{notes}` `{audit}`.

**history.yml** templates use `{check}` `{type}` `{category}` `{anticheat}` `{vl}` `{max_vl}` `{info}` `{experimental}` `{ping}` `{tps}` `{cps}` `{time}` `{ago}` `{world}` `{x}` `{y}` `{z}`. A category without its own template uses `other`.

Anything a player wrote (names aside: reasons, notes, client brand, check info) is escaped. It can't inject formatting or colour codes.
