---
title: "Purchase Tracking"
description: "OberonDonations observes your store; it never delivers anything. Two ways purchases reach it, and they can both be on at once."
---

OberonDonations observes your store; it never delivers anything. Two ways purchases reach it, and they can both be on at once.

## Polling (default, recommended)

`store.poll` in `config.yml`, on by default, every `interval-seconds` (60 by default). Each cycle calls the Tebex Plugin API's `/payments` endpoint for up to `limit` recent payments, using only your **Plugin API secret** — the same one from the Game Servers panel that this plugin uses for everything.

- No open port, no TLS certificate, no reverse proxy, and it works behind NAT.
- Tebex allows 500 requests per 5 minutes; the default 60-second interval uses about five.
- On a fresh install, anything older than `ignore-older-than-hours` (24 by default) is skipped, so the first poll does not announce a year of back-catalogue at once. `/donations rebuild` backfills donor statistics from full history separately, without re-announcing it, and `/donations sync [count]` does a manual pull that ignores that cutoff entirely.

## Inbound webhook (optional, for lower latency)

`webhook.port` (0 = disabled) opens a listener for Tebex's own webhook deliveries — purchases arrive within moments instead of waiting for the next poll. Turning it on needs:

- An open port reachable from Tebex's servers.
- For anything public, a reverse proxy with TLS in front of it.
- The **webhook secret** from Tebex creator panel → Developers → Webhooks → Endpoints. This is a **different secret** from the Plugin API one used for polling — the two are not interchangeable.

Tebex signs each delivery with `HMAC-SHA256(key = webhook secret, data = hex(SHA256(raw body)))` — a hash of a hash, not a plain HMAC over the body. This is easy to get wrong writing a compatible verifier from scratch; OberonDonations implements it exactly this way and rejects anything that does not match.

`enforce-tebex-ips` additionally checks the sender against Tebex's published IP ranges. Leave it `false` if you run a reverse proxy — it rewrites the peer address, and every delivery would then look forged.

Polling still runs alongside the webhook as a safety net; nothing about enabling one turns the other off.

## A generic webhook for any other store

`webhook.custom-path` / `custom-secret` accepts a signed delivery from anything, not just Tebex — a plain `HMAC-SHA256` over the raw request body, in an `X-Signature` header. `custom-fields` maps your store's own JSON field names onto what this plugin expects (`player`, `uuid`, `amount`, `currency`, `packages`, …), so no code change is needed to point a different store at it.

## What never happens

Every store adapter's HTTP client is built against a hardcoded allowlist of read-only paths — `/information`, `/payments`, `/community_goals` and their equivalents. There is no code path, configuration option or command that can make this plugin call a queue or command endpoint. This is enforced structurally, not just documented, and it is covered by tests. Tebex's own plugin stays installed and is the only thing that ever runs a package command.

## Deduplication

Every purchase is stored keyed by `(provider, transaction id)`, with a unique index. Polling the same payment twice, replaying a webhook delivery, or re-running the PerfDonation importer all report the repeat as skipped rather than double-counting it or re-firing a reward.

## Donor consent

`purchase-consent.ask-before-announce` (off by default) prompts the donor in chat before announcing their purchase publicly — the purchase is recorded and counted toward every total either way; declining only opts out of being named. `timeout-seconds` and `timeout-behavior` (`none` = stay private, `announce` = announce anyway) decide what happens if they never answer.

## See also

- [Currencies](/plugins/oberondonations/features/currencies/) — each purchase keeps its own currency, nothing is converted
- [Announcements](/plugins/oberondonations/features/announcements/) — what happens once a purchase is recorded
- [Migrating from PerfDonation](/plugins/oberondonations/features/migrating-from-perfdonation/)
- [config.yml reference](/plugins/oberondonations/configuration/config/)
