---
title: "Requirements"
description: "{% hint style=\"warning\" %}"
---

## Server

| Requirement | Version |
|---|---|
| Server software | Paper **1.21+** (Purpur and Folia work too) |
| Java | **21** |

## Plugins

| Plugin | Required? | What it is for |
|---|---|---|
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **required** | The framework. A separate jar in `plugins/`, never shaded in. **1.14.0 or newer.** |
| AxAuctions | **required** | The auction house itself. Without it dAuctionFeed still starts and still answers commands, but nothing is listed. |
| Vault + an economy plugin | **required** | The money sink. Without it seeding works but sale proceeds cannot be settled. |
| dDonutWorth | optional | Lets the [price floor](/plugins/dauctionfeed/features/price-floor/) read `/sell` values live instead of estimating them. |
| PlaceholderAPI | optional | The [placeholders](/plugins/dauctionfeed/placeholders/). |

{% hint style="warning" %}
DzusillCore is a **separate plugin jar**, not a library bundled inside dAuctionFeed. If it is missing or older
than 1.14.0 the plugin will not enable.
{% endhint %}

## About AxAuctions

dAuctionFeed talks to AxAuctions through its internals, because AxAuctions' published developer API has no way to
create a listing on the server's behalf. That is handled carefully and it degrades safely, but it is worth knowing
what it means in practice:

- An AxAuctions update **can** break seeding. If it does, dAuctionFeed switches seeding off, logs why, and the
  server keeps running normally. It will not crash and it will not take AxAuctions down with it.
- After such an update, `/auctionfeed status` tells you exactly what could not be found.

The full picture is in [How It Talks to AxAuctions](/plugins/dauctionfeed/axauctions-integration/).

## Currency

AxAuctions supports several currencies. dAuctionFeed lists in exactly one, named in `auctions.currency`:

```yaml
auctions:
  currency: "vault"
```

That name has to match an entry in **AxAuctions' own** currencies configuration. With a plain Vault economy it is
`vault`. The startup check verifies the name resolves and says so in the console if it does not.
