---
title: "Integrations"
description: "dFactions integrates with many popular plugins. Every integration is optional — the plugin"
---

dFactions integrates with many popular plugins. **Every integration is optional** — the plugin
starts and runs correctly with none installed. Each hook detects its provider at startup and
disables itself gracefully if absent. Toggles live under `integrations:` in `config.yml`.

## Vault (economy)

```yaml
integrations: { vault: true }
```

Enables faction create/claim costs, bank, tax, interest, shield purchases and warp costs. Install
[Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin (e.g. EssentialsX
Economy). Without it, money features no-op.

## PlaceholderAPI

```yaml
integrations: { placeholderapi: true }
```

Registers the `pvpindex` expansion — see [Placeholders](/plugins/dfactions/placeholders/).

## WorldGuard & WorldEdit

```yaml
integrations:
  worldguard: true
  worldguard-sync-regions: false   # restart required when toggling
```

With `worldguard-sync-regions: true`, faction claims are mirrored as WorldGuard
`ProtectedCuboidRegion`s so WG handles block protection natively.

## EssentialsX

```yaml
integrations: { essentialsx: { enabled: false } }
```

When enabled, `/f home` teleports through EssentialsX (respecting warmups/cooldowns).

## dynmap

```yaml
integrations: { dynmap: true }
```

Renders faction territory on your dynmap web map.

## LWC / LWCX

```yaml
integrations:
  lwc:
    enabled: true
    require-build-rights-to-create: true
    remove-if-no-build-rights: true
    remove-on-claim-change: true
```

Coordinates chest/door protections with faction build rights.

## DiscordSRV

```yaml
integrations:
  discordsrv:
    enabled: false
    channel-id: ""
    events:
      faction-created:   { enabled: true, message: "**{faction}** was founded!" }
      faction-disbanded: { enabled: true, message: "**{faction}** was disbanded." }
      relation-ally:     { enabled: true, message: ":handshake: **{source}** and **{target}** are now allies!" }
      relation-enemy:    { enabled: true, message: ":crossed_swords: **{source}** declared war on **{target}**!" }
```

Broadcasts faction events to Discord via DiscordSRV. `{faction}`, `{source}`, `{target}` substitute
at send time.

## Phalanx Discord bridge

An alternative that POSTs faction events to the Phalanx web API, which delivers them to Discord via
the Phalanx bot.

```yaml
integrations:
  phalanx:
    enabled: false
    api-url: "https://your-phalanx-host"
    api-key: "your-bot-api-key"
    tenant-slug: "default"
    event-path: "/api/v1/factions/event"
```

On events (create/disband, level-up, prestige) the plugin sends an async `POST` with
`Authorization: Bearer <api-key>` and `X-Tenant-Slug`. The receiving endpoint must exist on your
Phalanx server.

## TeamsAPI

If present, dFactions exposes its faction/member/relation data through TeamsAPI adapters for other
plugins. Internal behavior never *requires* TeamsAPI — it's purely an outward bridge.

## Ez-suite

`softdepend` / `loadbefore` are declared for EzEconomy, EzCountdown, EzShops, EzAuction, EzRTP and
EzClean so load order is correct when present. None are required.
