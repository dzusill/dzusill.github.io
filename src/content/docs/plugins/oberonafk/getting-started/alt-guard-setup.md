---
title: "Setting up the alt guard"
description: "The alt guard is on by default: of the accounts that connect from one address, only one collects in"
---

The alt guard is on by default: of the accounts that connect from one address, only one collects in
the AFK zones. This guide makes sure it works on your network and is set up for your staff.
[One account per player](/plugins/oberonafk/features/alt-guard/) explains how it decides.

## 1. Check that the server sees real addresses

This is the one step that can break it. Behind a proxy, a server that does not get player addresses
sees every player with the proxy's address, and the guard then lets only one player on the whole
server collect.

Look at the console when someone joins. Paper writes the address it sees on the login line:

```
[12:34:56 INFO]: Steve[/203.0.113.10:52314] logged in with entity id 123 at ([spawn]0.5, 64.0, 0.5)
```

| What the login lines show | Meaning |
|---|---|
| Different public addresses for different players | Correct. Go on to step 2 |
| `127.0.0.1` or a private address (`10.…`, `172.16.…`, `192.168.…`) for everybody | The proxy does not forward addresses. The guard ignores these addresses, so it is **off in practice** until you fix forwarding |
| The same public address for everybody | The proxy does not forward addresses, and the guard will hold everybody back but one. Fix forwarding, or add that address to `alt-guard.ignore-addresses` for now |

To turn forwarding on:

**Velocity.** In `velocity.toml`:

```toml
player-info-forwarding-mode = "modern"
```

and on every backend server, in `config/paper-global.yml`:

```yaml
proxies:
  velocity:
    enabled: true
    online-mode: true
    secret: "<the contents of Velocity's forwarding.secret>"
```

**BungeeCord or Waterfall.** `ip_forward: true` in the proxy's `config.yml`, and
`settings.bungeecord: true` in every backend's `spigot.yml`.

**Bedrock players (Geyser).** Run Geyser with **Floodgate**, so Bedrock players arrive with their real
address too.

Restart the proxy and the backends, join, and check the login line again.

If 5 or more players are online from one address that is not ignored, the console also warns:

```
[OberonAFK] 5 players are online from one address. If the server is behind a proxy (Velocity,
BungeeCord), check that it forwards player addresses ...
```

## 2. Let staff see the alerts

Players with `oberonafk.altguard.notify` get a chat line when an account is held back. Ops have it, and
`oberonafk.admin` includes it. To give it to a staff group in LuckPerms:

```
/lp group mod permission set oberonafk.altguard.notify true
```

The alert names both accounts:

```
⚠ Alt is online from the same address as Main and does not collect in AFK zone afk.
```

It comes at most once per account every 5 minutes, and the console logs the same event.

## 3. Let people who share a connection both collect

Siblings, roommates, a school network: they share an address, so the guard links them. Give **one** of
the two the bypass. It is enough, because an account with it collects and holds nobody back:

```
/lp user Sister permission set oberonafk.altguard.bypass true
```

The staff alert is how you hear about these cases: a player asks why they are not collecting, and the
alert in chat shows which account they are linked to.

## 4. Test it with two accounts

Shorten the interval first, as in the [Quick start](/plugins/oberonafk/getting-started/quick-start/): `interval: 10s` in `zones.yml`, then
`/afk reload`.

1. Log in with two accounts from the same computer or the same Wi-Fi, without the bypass.
2. Send the first one to the zone with `/afk`. Its action bar counts down as usual.
3. Send the second one. It gets:

   ```
   You are not collecting AFK rewards — another of your accounts already is. One account per player
   collects. Not an alt? Ask staff.
   ```

   and `Not collecting — another of your accounts is` on the action bar instead of the countdown. Staff
   get the alert.
4. Walk the first account out of the zone. The second one gets `You are collecting AFK rewards now.` and
   its countdown starts from the beginning.

Put the interval back afterwards and `/afk reload`.

## 5. Adjust it if you need to

Everything is under `alt-guard` in [`config.yml`](/plugins/oberonafk/configuration/config/#alt-guard), and
`/afk reload` applies it at once.

| You want | Set |
|---|---|
| Two accounts per player to collect | `max-accounts: 2` |
| A shorter memory of shared addresses | `remember: 7d` |
| No addresses stored at all | `remember: 0`. Only accounts online together from one address are linked, and stored rows are deleted |
| Fewer staff alerts | `staff-alert.cooldown: 30m`, or `staff-alert.enabled: false` |
| Nothing in the console | `staff-alert.console: false` |
| The guard switched off | `enabled: false` |

What the held-back player reads is `notice.alt-blocked`, `notice.alt-unblocked` and `countdown-blocked`
in [`messages.yml`](/plugins/oberonafk/configuration/messages/#notice). Whether it shows in chat, on the action bar or
as a title, and its sound, is set under `notifications.alt-blocked` and `notifications.alt-unblocked` in
`config.yml`. The staff alert text is `alt-guard.staff-alert` in `messages.yml`.

## 6. Mention it in your privacy policy

The database keeps a keyed hash of each address players connect from, for 30 days. Not the address,
but still personal data under the GDPR. If your server has a privacy policy, a line like this covers it:

> To stop one player collecting AFK rewards on several accounts, we keep a keyed hash of the addresses
> accounts connect from for 30 days.

Keep `data.yml` private. It holds the key, and deleting it makes the plugin forget every link.

## What it cannot do

An alt that never connects from the player's own network (a VPN or mobile data from its very first
join) is not linked to anything. Blocking VPNs belongs on the proxy: an anti-VPN plugin on Velocity covers
the whole network. Beyond that, staff alerts and your server rules on alts cover the rest.
