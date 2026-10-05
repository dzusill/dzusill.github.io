---
title: "Quick start"
description: "A server that should behave like PvPManager did, in ten minutes. Nothing here needs a restart: edit, then"
---

A server that should behave like PvPManager did, in ten minutes. Nothing here needs a restart: edit, then
`/oberoncombat reload`.

## 1. Check what was found

```
/oberoncombat status
```

You want WorldGuard **on** and Vault **on**. If Vault is off, install it and an economy plugin: without them no money
moves.

## 2. Mark the safe zones

A safe zone is a WorldGuard region with the `pvp` flag set to `deny`:

```
/rg define spawn
/rg flag spawn pvp deny
```

Tagged players now meet a glass wall there. See [the barrier](/plugins/oberoncombat/features/barrier/).

## 3. Decide where combat does not apply

Edit `exclusions` in `config.yml`. A tournament arena switches the whole plugin off; spawn only stops money and
lightning:

```yaml
exclusions:
  profiles:
    tournament:
      worlds: []
      regions: [tourny]
    spawn:
      worlds: []
      regions: [spawn]
  global: [tournament]
  features:
    money-steal: [spawn]
    kill-effect: [spawn]
```

See [Exclusions](/plugins/oberoncombat/features/exclusions/).

## 4. Set the tag time and the money

```yaml
combat:
  tag-duration: 20s
money-steal:
  enabled: true
  percent: 5.0
```

## 5. Exemptions for staff

Give staff `oberoncombat.exempt` if they should never be tagged. Admin groups with `oberoncombat.*` are **still** tagged;
the exemptions are not part of the wildcard on purpose. See [Permissions](/plugins/oberoncombat/reference/permissions/).

## 6. Try it

With two players: hit one with a sword. Both see the countdown. `/tag` shows the time left, `/untag all` clears
everybody. The full hand-check list is in [Testing](/plugins/oberoncombat/developing/testing/).

## Switching on the optional features

Everything added beyond PvPManager's basics is **off** until you turn it on:

| Feature | Key | Page |
|---|---|---|
| PvP toggle | `pvp-toggle.enabled` | [PvP toggle](/plugins/oberoncombat/features/pvp-toggle/) |
| Restrictions | `restrictions.*` | [Restrictions](/plugins/oberoncombat/features/restrictions/) |
| Tag effects | `tag-effects.*` | [Restrictions](/plugins/oberoncombat/features/restrictions/) |
| PvE tag | `combat.pve-tag.enabled` | [The combat tag](/plugins/oberoncombat/features/combat-tag/) |
| Boss bar | `combat.timer.boss-bar.enabled` | [The combat tag](/plugins/oberoncombat/features/combat-tag/) |
| Experience steal | `exp-steal.enabled` | [PvP kills](/plugins/oberoncombat/features/kills/) |
| Kill-abuse guard | `kill-abuse.enabled` | [Kill-abuse guard](/plugins/oberoncombat/features/kill-abuse/) |
| Commands on events | `event-commands.*` | [Commands on events](/plugins/oberoncombat/features/event-commands/) |
| Vulnerable in safe zones | `barrier.vulnerable` | [The barrier](/plugins/oberoncombat/features/barrier/) |
