---
title: "FAQ & Troubleshooting"
description: "Vanilla messages still showing, the mace smash not firing, item names wrong — the usual causes and the fix for each."
---

## Death messages are still vanilla

Three things, in order:

1. **Another plugin is winning.** AxKills, DeathMessages or similar rewriting the same message means whichever runs
   last wins, and that depends on load order. Remove the other one.
2. **`Enabled: false`** in `config.yml`.
3. **Nothing loaded.** `/oberonkills status` — if it says `0 message key(s)`, the config did not parse. The console
   says so at startup too.

## One particular death is still vanilla

That key has neither its own entry nor a `default` in its set. Check with:

```
/oberonkills preview <category> <key>
```

Either add wording for it, or add a `default` to the set, or set `Keep-Vanilla-When-Unconfigured: false` if you would
rather it said nothing.

## The mace smash never fires

`mace-smash` only fires when the attacker was **falling** at the moment of the blow. A mace swung on the ground is
`mace`, correctly.

If it never fires even from a genuine smash, check you are on **1.21 or newer** — the mace does not exist before
that.

## Item names still look wrong

They should not. Check `/oberonkills status` for the mode, then:

- **`netherite_sword` in the message** — you are still running the other plugin.
- **English on a non-English client** — `Mode: PRETTY`. Switch to `TRANSLATE`.
- **The material name instead of an anvil name** — a custom name should always win. If it does not, please report it
  with the item.

## `<distance>` is empty — "from  blocks away"

It is only filled for `bow`, `crossbow` and thrown `trident` kills. In any other key it renders as a gap, so write
`from <distance>m` only where there is one.

On a **genuine bow kill**, one of two things happened:

1. **Another plugin dealt the damage.** Custom-item and custom-enchant plugins routinely cancel the arrow's damage and
   apply their own, so no projectile is ever seen and there is nothing to measure. This is the common one on a server
   that runs custom weapons.
2. The shot landed more than `Combat.Remember-Hits-Seconds` before the victim actually died, so the record had expired.

`Combat.Measure-Distance-At-Death` is on by default and covers both — those kills are measured killer-to-victim at the
moment of death instead. If you are still seeing a gap, check it is not set to `false`, and set `Debug: true` to see
what each death resolved to.

## A spear kill uses the `item` message

Fixed. The spear became a vanilla weapon in 1.21.11, and builds before that classified it as "anything else held", so
a spear kill read *"was killed by X using Netherite Spear"* and a `spear:` key in the config was never reached.

`spear` is a real key now, covering every tier from wooden to netherite. It has no `<distance>` — a spear cannot be
thrown.

## A stabbed trident says "from  blocks away"

That was the old behaviour, when thrown and stabbed tridents shared one key. A stab now uses `trident-melee`, whose
shipped wording mentions no distance.

If you see it, your config has no `trident-melee` key — it was written before the key existed, or deleted. Add it:

```yaml
    trident-melee:
      - "<#C21807><victim></#C21807> <gray>was run through by</gray> <#C21807><killer></#C21807><gray>'s</gray> <item>"
```

## A death is attributed to the wrong thing

The last blow from another entity is remembered for `Combat.Remember-Hits-Seconds`, **ten seconds** by default. Beyond
that a death falls through to the environmental set, which is almost always right — whatever finished them was not
that blow.

Raise it if players regularly die of burning or falling well after the shot that started it.

## Ranks show the wrong one

`Ranks` is in the wrong order. First match wins, and an owner usually also inherits `group.admin` and `group.mod` —
so the highest rank has to be listed first.

## Ranks show for everybody

`Default-Rank` is set. Leave it empty and players with no matching rank get nothing.

Unless you set it to `%luckperms_prefix%` on purpose — then that is the intended behaviour, and everybody gets
whatever prefix their own group has.

## `%luckperms_prefix%` shows up as literal text

The placeholder was never expanded. Three things have to be true:

1. **PlaceholderAPI is installed.** Without it the text is used as-is, by design — that is what keeps a
   hand-written rank working on a server that has no PlaceholderAPI.
2. **The LuckPerms expansion is downloaded:** `/papi ecloud download LuckPerms` then `/papi reload`. Check with
   `/papi list` — `luckperms` should be there.
3. **The group actually has a prefix:** `/lp group admin meta info`.

## The rank shows `&c[Admin]` instead of red text

That would be a bug — report it. LuckPerms stores prefixes with legacy colour codes and OberonKills converts them
before the message is parsed, including the `&x&R&R&G&G&B&B` hex form.

## Can players put colours in their name to break a message?

No. `<victim>` and `<killer>` are inserted as literal text. Somebody called `<red>Steve` shows as `<red>Steve`.

Rank prefixes **are** parsed, because those come from your config rather than from a player.

## Does it count kills?

No — it describes them. If you want counts, leaderboards and milestone rewards, that is
[dKillTracker](/plugins/dkilltracker/), and the two run together fine.

## Does it need a database?

No. Nothing here survives a restart, because nothing here needs to.

## Does it work on Folia?

Yes, `folia-supported: true`.

## Where do I report a problem?

[github.com/dzusill](https://github.com/dzusill). Please include:

- Server software and version (`/version`)
- OberonKills and DzusillCore versions
- The output of `/oberonkills status`
- The output of `/oberonkills preview` for the death in question
- The relevant part of `config.yml`
