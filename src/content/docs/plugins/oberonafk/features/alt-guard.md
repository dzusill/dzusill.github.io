---
title: "One account per player (alt guard)"
description: "A second account parked in the AFK zone doubles everything the zone pays. The alt guard stops that:"
---

A second account parked in the AFK zone doubles everything the zone pays. The alt guard stops that:
of the accounts that belong together, only one collects at a time.

Setting it up step by step, from checking the proxy to testing it with two accounts:
[Setting up the alt guard](/plugins/oberonafk/getting-started/alt-guard-setup/).

## What happens

Accounts that are **linked** (see below) share one place in the AFK zones — all zones together, not one
place per zone.

- The account that started collecting **first keeps collecting**, whichever of them joined the server
  first.
- Any other linked account can stand in the zone, but it gets **no rewards, no AFK time** (so it climbs
  no leaderboard) and **no countdown**. It is told why once, and its action bar says it is not
  collecting.
- When the collecting account leaves the zone, logs out, or switches to a game mode that does not
  collect, a waiting account takes the place and **starts its interval from zero**. The time it spent
  waiting does not count.

`max-accounts` raises the limit: with `2`, two linked accounts collect and a third waits.

Nothing is teleported, kicked or punished. The guard only decides who collects.

## When accounts are linked

Two accounts are linked when they connect from **the same address**:

1. **At the same time.** Two clients on one PC, or a laptop on the same Wi-Fi.
2. **Within `remember` of each other** (30 days by default). This one needs the database. An alt that
   connected from the same home once is still linked after it moves behind a VPN or onto a phone
   hotspot, because the address it used before is on record.

An IPv6 address counts as its **/64**, the block one household gets, so two devices in one home are one
address the way they are behind an IPv4 router.

A link goes both ways and is not chained: if A shared an address with B, and B with C, then A and C are
not linked through B.

## What it cannot catch

The server sees two things about a connection: the account and the address. That is all the guard
has, so it **cannot** link an alt that never connected from the player's own network. For example, an
alt that used a VPN or mobile data from its very first join and never connected any other way. Blocking
VPNs is a job for the proxy (an anti-VPN plugin on Velocity covers the whole network), not for an AFK
plugin. Staff alerts and your rules on alts cover the rest.

## Siblings, shared Wi-Fi, schools

People who really share a connection are linked too. Give the one who should also collect
`oberonafk.altguard.bypass`. An account with it always collects and **holds nobody back**, so both
accounts collect.

The staff alert tells staff who was held back and which account is collecting, so they know whom to give
the bypass.

## Behind a proxy

Behind Velocity or BungeeCord the server sees the proxy unless the proxy forwards player addresses:

- **Velocity:** `player-info-forwarding-mode = "modern"`, and the forwarding secret on the backend in
  `config/paper-global.yml`.
- **BungeeCord:** `ip_forward: true`, and `settings.bungeecord: true` in `spigot.yml`.
- **Bedrock (Geyser):** players should come through **Floodgate**, which passes their real address.

Without forwarding every player has the proxy's address and only one of them would collect. The
defaults in `ignore-addresses` (this machine and private networks) cover the usual case of a proxy
on the same machine or LAN. If 5 or more players are online from one address that is not ignored, the
console warns and names the setting to check. If the proxy shows up under a public address, add that
address to `ignore-addresses` until forwarding works.

## What is stored

| Where | What |
|---|---|
| Database, table `oberonafk_addresses` | Account UUID, a **keyed hash** of the address, and when it was last seen |
| `data.yml`, `alt-guard.key` | The secret key for that hash, made on first start |

The address itself is never stored. The hash is an HMAC-SHA256 under the key in `data.yml`. Without
that key, someone reading the database cannot tell which address a row belongs to. A plain hash
would not hide anything, since every IPv4 address can be hashed in minutes. Deleting the key makes the
plugin forget every link.

Rows older than `remember` are deleted (a minute after start, then every six hours). With
`remember: 0` nothing is written and the rows already stored are deleted. Without the database
(`database.yml` `enabled: false`) nothing is stored either. In both cases only accounts online at the
same time from one address are linked.

A hashed address is still personal data under the GDPR (it is pseudonymised, not anonymous). If your
privacy policy lists what the server keeps, add: *a keyed hash of connection addresses, kept for 30 days,
to stop one player collecting AFK rewards on several accounts.*

## Settings

In [`config.yml`](/plugins/oberonafk/configuration/config/#alt-guard):

```yaml
alt-guard:
  enabled: true
  max-accounts: 1
  ignore-addresses: [ "127.0.0.0/8", "::1", "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "fc00::/7" ]
  remember: 30d
  staff-alert:
    enabled: true
    cooldown: 5m
    console: true
```

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | Off: every account collects |
| `max-accounts` | `1` | How many linked accounts collect at once |
| `ignore-addresses` | loopback and private networks | Addresses that link nobody: single addresses or ranges (CIDR), IPv4 or IPv6. Host names are not accepted |
| `remember` | `30d` | How long a shared address keeps accounts linked: `30d`, `12h`, `90m`. `0`: nothing is stored |
| `staff-alert.enabled` | `true` | A chat line to players with `oberonafk.altguard.notify` when an account is held back |
| `staff-alert.cooldown` | `5m` | Alerts about the same account wait this long |
| `staff-alert.console` | `true` | Also write the alert to the console |

Everything here is re-read by `/afk reload`. A changed ignore list or `remember` applies to everyone
online at once, and a lowered `max-accounts` holds back the accounts that started last. The console
names any entry it cannot read.

## What players and staff see

| Who | What | Where it is set |
|---|---|---|
| Held-back player | `notice.alt-blocked`, once when held back | Shown: [`notifications.alt-blocked`](/plugins/oberonafk/configuration/config/#notifications) |
| Held-back player | `countdown-blocked` on the action bar instead of the countdown | `countdown.enabled`, `countdown: false` per zone |
| Player who collects again | `notice.alt-unblocked` | `notifications.alt-unblocked` |
| Staff | `alt-guard.staff-alert.same-address` or `.remembered` | `alt-guard.staff-alert` above, and `Presentation` |

The player is never told which account is collecting, how accounts are linked, or that addresses are
involved. Staff are told both names and whether the link is a shared address now or one remembered.
All the texts are in [`messages.yml`](/plugins/oberonafk/configuration/messages/#alt-guard).
