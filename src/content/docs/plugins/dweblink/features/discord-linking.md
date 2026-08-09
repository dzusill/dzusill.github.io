---
title: "Discord Linking"
description: "Attaches a Discord account to the same profile, which is what lets the Discord bot know who a message came from — required for tickets, reports and role…"
---

Attaches a Discord account to the same profile, which is what lets the Discord bot know who a message came from — required for tickets, reports and role syncing in [dPhalanx](https://dzusill.github.io/plugins/dphalanx/).

Unlike website login, the code flows the other way: the **plugin** issues it and the **bot** consumes it.

---

## Linking

```
/linkdiscord
```

The plugin asks the API for a code and shows it to the player. They give it to the Discord bot, and the bot completes the link.

### Cooldown and caching

`cooldown-seconds` (default **30**) limits how often a player may request a code. Requesting again inside that window returns the **same code** from cache rather than failing outright — a player who lost the message in chat scrollback gets it back without burning a new code or waiting.

Already linked? The player is told so instead of getting a second code.

---

## Unlinking

```
/discordunlink
```

This is deliberately two steps. The plugin asks the player to type **confirm** in chat:

- Type `confirm` within `unlink-confirm-seconds` (default **60**, minimum 5) → the account is unlinked.
- Type anything else, or say nothing → *"Unlink cancelled — your Discord is still linked."*

The confirmation is a plain chat listener, so it works on every client with no GUI involved.

### Staff-locked links

Some links are administrative — a staff member's Discord tied to their account for audit reasons. Those return *admin blocked* and cannot be removed by the player. Only a website admin can undo them.

---

## Permissions

| Permission | Default | Grants |
|---|---|---|
| `dweblink.linkdiscord` | true | `/linkdiscord` |
| `dweblink.discordunlink` | true | `/discordunlink` |

## Failure messages

Both commands surface the API's reason inline — *"couldn't reach the website"*, *"the website returned an unexpected response"* — so a broken bot integration is visible without opening the console.

## Next

- [Profile & Rank Sync](/plugins/dweblink/features/profile-sync/)
