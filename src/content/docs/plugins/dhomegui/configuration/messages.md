---
title: "messages.yml"
description: "Every player-facing string and the sound effects, at plugins/dHomeGUI/messages.yml, in MiniMessage."
---

Every player-facing string and the sound effects, at `plugins/dHomeGUI/messages.yml`, in [MiniMessage](https://docs.advntr.dev/minimessage/format.html).

## Prefix & placeholders

```yaml
prefix: "<gradient:#2C99F8:#8CCAFF><b>dHomeGUI</b></gradient> <#3A4A5A>» "
```

- `<prefix>` is replaced by the `prefix` string.
- Named placeholders use `%name%` (e.g. `%home%`, `%player%`, `%price%`, `%seconds%`, `%current%`/`%limit%`, `%min%`/`%max%`).
- Framework keys at the top (`no-permission`, `invalid-usage` with `{usage}`, `invalid-number` with `{input}`, the `reload-*` keys) come from DzusillCore — keep their names.

## Message groups

| Section | Covers |
|---|---|
| `help`, `admin-help` | The `/homes` and `/dhomeadmin` help listings. |
| `access`, `placeholders` | Tokens used inside GUI lore (Private/Whitelisted, default/pinned badges, "no description"). |
| `sethome`, `home`, `delhome`, `rename` | Core home actions and confirmations. |
| `editor` | Editor button feedback (icon, name, description, type, default, pin). |
| `visibility`, `whitelist`, `search` | Sharing and search confirmations. |
| `teleport`, `confirm`, `back` | Warmup title/subtitle/action-bar, cancel reasons, unsafe/paid confirm, `/back`. |
| `money` | Charge and slot-purchase confirmations. |
| `admin` | Admin command results (delete, deleteall, count, import, backup). |
| `errors` | All refusals — limit reached, world/region blocks, no access, cooldown, name rules, … |
| `time`, `update-notifier` | Small tokens and the update message. |

## Sounds

The `Sounds:` section maps events to `NAME/volume/pitch`:

```yaml
Sounds:
  Teleported: ITEM_CHORUS_FRUIT_TELEPORT/1.0F/1.0F
  WarmupTick: BLOCK_NOTE_BLOCK_HAT/1.0F/1.5F
  HomeCreated: ENTITY_PLAYER_LEVELUP/1.0F/1.2F
  HomeDeleted: ENTITY_ITEM_BREAK/1.0F/1.0F
  IconChanged: ENTITY_PLAYER_LEVELUP/1.0F/1.0F
  PageChanged: ITEM_BOOK_PAGE_TURN/1.0F/1.0F
  ERROR: BLOCK_ANVIL_PLACE/0.5F/1.0F
  EditDescription: { ENTER: ..., ERROR: ..., SUCCESS: ... }
```

Use any valid [Bukkit Sound](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Sound.html) name.
