---
title: "config.yml"
description: "Every key, with its default."
---

Every key, with its default.

---

## General

```yaml
lang_file: "en-US"
check_for_updates: true
prefix: "<dark_gray>[<#ffd16d>dMentions</#ffd16d>]</dark_gray>"
mention_limit: 2
vanish_respect: true
vanish_provider: auto
afk_respect: false
ignore_respect: true
disabled_worlds:
  - "no_mention_world_1"
  - "no_mention_world_2"
```

| Key | Default | Effect |
|---|---|---|
| `lang_file` | `en-US` | which file in `lang/` to load |
| `check_for_updates` | `true` | startup update check |
| `prefix` | *(gold)* | MiniMessage prefix for plugin messages |
| `mention_limit` | 2 | max mentions per chat message |
| `vanish_respect` | `true` | vanished players are not pinged or revealed |
| `vanish_provider` | `auto` | `auto`, EssentialsX or StaffPlusPlus |
| `afk_respect` | `false` | when true, AFK players are not pinged |
| `ignore_respect` | `true` | `/ignore` is honoured |
| `disabled_worlds` | *(placeholders)* | no mentions fire in these worlds |

> The two shipped `disabled_worlds` entries are placeholders. Replace them with real world names or use `disabled_worlds: []`.

`afk_respect` and `ignore_respect` need EssentialsX and are **skipped on Folia**.

## suffix_color

```yaml
suffix_color:
  group:
    default: "<gray>"
    __OTHER__: "<white>"
```

The colour applied to text following a mention, per LuckPerms group. `__OTHER__` covers every group without its own entry.

---

## player

```yaml
player:
  enabled: true
  permission: "dmentions.mention.player"
  sound: "entity.chicken.egg"
  color: "#a9e871"
  display: "@{p}"
  customized_display: "<#eac773>@{display}"
  cooldown: 5
```

`{p}` = the player's name. `{display}` = their custom tag. See [Player Mentions](/plugins/dmentions/features/player-mentions/).

## nearby

```yaml
nearby:
  enabled: true
  permission: "dmentions.mention.nearby"
  sound: "entity.chicken.egg"
  color: "#ea79b8"
  keyword: "@nearby"
  display: "@nearby"
  cooldown: 10
  radius: 20
```

`radius` is in blocks, same world only.

## everyone

```yaml
everyone:
  enabled: true
  permission: "dmentions.mention.everyone"
  sound: "entity.chicken.egg"
  color: "#8fb56c"
  keyword: "@everyone"
  display: "@everyone"
  cooldown: 10
```

> ⚠️ Restrict `everyone.permission` before players find it.

## group

```yaml
group:
  enabled: true
  disabled_groups:
    - "admin"
    - "owner"
  keyword: "@{group}"
  permission: "dmentions.mention.group.{group}"
  list:
    default:
      sound: "entity.chicken.egg"
      color: "#c0dee6"
      display: "@{group}"
      cooldown: 5
    __OTHER__:
      sound: "entity.chicken.egg"
      color: "#73c7dc"
      display: "@{group}"
      cooldown: 5
```

`{group}` expands to the group name in both `keyword` and `permission`. Add per-group entries under `list` to give a group its own sound, colour, display or cooldown. See [Group Mentions](/plugins/dmentions/features/group-mentions/).

## Sounds

Any Minecraft sound key, e.g. `entity.chicken.egg`, `block.note_block.pling`, `entity.experience_orb.pickup`. An invalid key is logged and silently skipped — the mention still fires.

## Next

- [Language Files](/plugins/dmentions/configuration/language/)
- [Reloading](/plugins/dmentions/configuration/reloading/)
