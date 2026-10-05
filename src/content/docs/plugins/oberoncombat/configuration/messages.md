---
title: "messages.yml"
description: "Every text the plugin sends, with where it shows and what it sounds like beside it. Both MiniMessage and PvPManager's colour codes work, so old texts can be…"
---

Every text the plugin sends, with where it shows and what it sounds like beside it. Both MiniMessage and PvPManager's colour codes work, so old texts can be pasted in as they are: `&c`, `&l` and `&#C21807` next to `<red>`, `<bold>` and `<#C21807>`.
The format is
[MiniMessage](https://docs.advntr.dev/minimessage/format.html): `<gray>`, `<#C21807>`, `<bold>`,
`<gradient:#C21807:#F11800>`. Tokens work as `%name%` or `{name}`; the ones each message understands are listed above it in
the file and in the tables below. `/oberoncombat reload` re-reads it.

## Shape of a message

```yaml
kill-money-gained:
  chat: ""
  actionbar: "<#39B54A>+%amount% <gray>from <white>%victim%"
  title: ""
  subtitle: ""
  sound:
    name: entity.experience_orb.pickup
    volume: 1.0
    pitch: 1.2
```

| Key | |
|---|---|
| `chat` | a line in chat |
| `actionbar` | the line above the hotbar. Several notices share it by priority, so a money message is not painted over by the combat countdown |
| `title`, `subtitle` | a title |
| `sound` | `name` (`entity.villager.no` or `ENTITY_VILLAGER_NO`), `volume`, `pitch`. An empty `name` is silent |

Anything left empty is not sent. A missing section or key is treated as empty, never as the key's own name. The
`combat-timer` message also has `bossbar`, the text of the [boss bar](/plugins/oberoncombat/features/combat-tag/#boss-bar).

The framework keys at the top of the file (`no-permission`, `players-only`, `invalid-usage`, `player-not-found`,
`reload-success`, …) are plain strings; the command layer reads them.

## Every message and its tokens

| Message | Shown | Tokens |
|---|---|---|
| `combat-tagged` | when a fight begins | `%enemy%`, `%time%` |
| `combat-untagged` | when the tag ends (per `untag-notice`) | |
| `combat-timer` | every second while tagged | `%time%`, `%bar%`, `%enemies%` |
| `command-blocked` | a blacklisted command | `%command%` |
| `tag-time-left`, `tag-not-in-combat`, `tag-applied`, `tag-received` | `/tag` | `%time%`, `%player%` |
| `untag-applied`, `untag-all`, `untag-received` | `/untag` | `%player%`, `%count%` |
| `kill-money-gained` | the killer, at once | `%amount%`, `%amount_raw%`, `%percent%`, `%victim%`, `%balance%` |
| `kill-money-lost` | the victim, after respawn | `%amount%`, `%amount_raw%`, `%percent%`, `%killer%`, `%balance%` |
| `exp-won`, `exp-stolen` | experience steal | `%exp%`, `%victim%` / `%killer%` |
| `combat-log-broadcast` | everyone, on a combat log (empty by default) | `%player%`, `%enemy%` |
| `combat-log-penalty` | the leaver, at their next join | `%amount%` |
| `barrier-blocked` | touching the barrier | |
| `soup-used` | after a soup | `%hearts%` |
| `soup-full-health` | a soup refused at full health | |
| `soup-refilled`, `soup-refill-nothing`, `-full`, `-cooldown`, `-in-combat`, `-disabled` | `/soup` | `%count%`, `%time%` |
| `cooldown-item` | an item on cooldown | `%item%`, `%time%` |
| `pvp-enabled`, `pvp-disabled`, `pvp-cooldown`, `pvp-toggle-in-combat`, `pvp-toggle-disabled` | `/pvp` | `%time%` |
| `attack-denied-you`, `attack-denied-other` | a refused hit | `%player%` |
| `pvp-force-enabled-worldguard` | PvP forced on in a region | |
| `pvp-status-self`, `pvp-status-other`, `pvp-set-other`, `pvp-set-by-admin` | `/pvp`, `/pvpstatus` | `%player%`, `%state%` |
| `pvpinfo` | `/pvpinfo` | `%player%`, `%pvp%`, `%tagged%`, `%timeleft%`, `%enemies%`, `%exempt%`, `%cooldown%` |
| `kill-abuse-warning` | the last allowed kill | `%victim%` |
| `blocked-ender-pearl`, `-chorus-fruit`, `-teleport`, `-eat`, `-totem`, `-place-blocks`, `-break-blocks`, `-open-inventory`, `-portal`, `-riptide` | a [restriction](/plugins/oberoncombat/features/restrictions/) | |

## Held messages

The victim's money and experience notices, and the leaver's fine, are **held**: the first two arrive a moment after the victim
respawns, the last at the next join. If a player leaves before reading, up to five notices wait for their return.
