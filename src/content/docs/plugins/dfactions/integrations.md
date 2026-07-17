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

Registers the `dfactions` expansion — see [Placeholders](/plugins/dfactions/placeholders/).

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

## Phalanx Discord bridge

Posts faction events to the phalanx-mono web API as structured JSON, which builds the Discord
message and delivers it via the Phalanx bot — message formatting lives server-side, not in this
config.

```yaml
integrations:
  phalanx:
    enabled: false
    api-url: "https://your-phalanx-host"
    api-key: "your-bot-api-key"
    tenant-slug: "default"
    event-path: "/api/v1/factions/event"
    events:
      faction-lifecycle: true   # create, disband, level-up, prestige
      relations: true           # mutual ally/truce established, enemy declared
      wars: true                # declared, started, ended
      bank: true                # deposits/withdrawals at or above the threshold below
    bank-milestone-threshold: 50000.0
```

The `events.*` toggles are purely a client-side courtesy to skip pointless HTTP calls for
categories you don't want announced — whether an event actually posts to Discord (and to which
channel) is controlled server-side in phalanx-mono. On each enabled event, the plugin sends an
async `POST` to `{api-url}{event-path}` with `Authorization: Bearer <api-key>` and
`X-Tenant-Slug: <tenant-slug>`. The receiving endpoint must exist on your phalanx-mono deployment.

## TeamsAPI

If present, dFactions exposes its faction/member/relation data through TeamsAPI adapters for other
plugins. Internal behavior never *requires* TeamsAPI — it's purely an outward bridge.

## Ez-suite

`softdepend` / `loadbefore` are declared for EzEconomy, EzCountdown, EzShops, EzAuction, EzRTP and
EzClean so load order is correct when present. None are required.
