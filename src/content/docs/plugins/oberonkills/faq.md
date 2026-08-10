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

## `<distance>` is empty

It is only filled for `bow`, `crossbow` and `trident` kills. A melee kill leaves it empty rather than showing `0` —
so a format that mentions it in a melee message reads oddly rather than lying.

If it is empty on a genuine bow kill, the shot landed more than ten seconds before the victim actually died, so the
record had expired.

## A death is attributed to the wrong thing

The last blow from another entity is remembered for **ten seconds**. Beyond that a death falls through to the
environmental set, which is almost always right — whatever finished them was not that blow.

Ten seconds is not configurable. If your server needs it longer, say so and it can be.

## Ranks show the wrong one

`Ranks` is in the wrong order. First match wins, and an owner usually also inherits `group.admin` and `group.mod` —
so the highest rank has to be listed first.

## Ranks show for everybody

`Default-Rank` is set. Leave it empty and players with no matching rank get nothing.

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
