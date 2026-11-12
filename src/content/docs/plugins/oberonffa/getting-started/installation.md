---
title: "Installation"
description: "for the FFA world (the shipped ffa profile does)."
---

1. Make sure OberonCore 1.14.6+ and OberonKits 1.2.1+ are in `plugins/`, and that OberonKits has a profile
   for the FFA world (the shipped `ffa` profile does).
2. Put `OberonFFA.jar` into `plugins/` and restart. Do not load it with PlugMan.
3. The console says which worlds are the arena:
   `FFA arena worlds — OberonKits profile 'ffa': [ffa]`. If it says `config.yml arena.worlds`, OberonKits
   is not enabled or has no profile named in `arena.profile`.
4. Check `rewards.yml`: the shipped rewards use `stardust give`, `money give` and
   `crates givekey %player% koth-crate`. Pick the crate FFA keys should open.
5. Optional: copy the DialogMaster menus from the plugin's `delivery/dialogmaster/` folder (see
   [DialogMaster leaderboards](/plugins/oberonffa/reference/dialogmaster/)).

The first start writes `config.yml`, `messages.yml`, `sounds.yml`, `rewards.yml`, `streaks.yml`,
`passes.yml`, `gui.yml`, `database.yml` and an H2 database file. Updates add new keys to these files
without touching your values; an entry you delete from a shipped list (a reward, milestone, tier, pass,
payout or menu item) stays deleted.

## Behind a proxy

The alt guard compares addresses. Behind Velocity or BungeeCord the proxy must forward player
addresses; otherwise every player has the proxy's address — add it to
`rules.alt-guard.ignore-addresses` until forwarding works.
