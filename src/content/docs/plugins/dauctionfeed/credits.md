---
title: "Credits"
description: "dAuctionFeed — seeds server-owned listings into the AxAuctions auction house on a schedule."
---

**dAuctionFeed** — seeds server-owned listings into the AxAuctions auction house on a schedule.

Written by **dzusill**.

## Built on

- [DzusillCore](https://github.com/dzusill/DzusillCore) — the plugin framework: modules, services, configs,
  MiniMessage messaging, commands, scheduling.
- [Paper](https://papermc.io/) 1.21.
- [Adventure](https://docs.advntr.dev/) — MiniMessage formatting.

## Integrates with

- **AxAuctions** by [Artillex-Studios](https://github.com/Artillex-Studios) — the auction house itself.
- **Vault** — the economy layer behind the money sink.
- **dDonutWorth** — optional; supplies live sell values to the price floor.
- **PlaceholderAPI** — optional; the placeholders.

The bundled `prices_1_21.yml` catalogue is shared with **dRotatingShop**, so an economy running both stays
consistent.

## Metrics

Anonymous usage statistics via [bStats](https://bstats.org/). Opt out globally in
`plugins/bStats/config.yml`.

## Support

Report issues with:

- `/auctionfeed status`
- the console output from startup
- `advanced.log-bridge-details: true` if the problem involves AxAuctions

See [FAQ & Troubleshooting](/plugins/dauctionfeed/faq/) first — most questions are answered there.
