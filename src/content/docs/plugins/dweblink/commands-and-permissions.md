---
title: "Commands & Permissions"
description: "---"
---

---

## Commands

| Command | Permission | Description |
|---|---|---|
| `/verify <code>` | `dweblink.verify` | Confirm a website login code |
| `/verifyemail <code>` | `dweblink.verifyemail` | Confirm an email verification code |
| `/linkdiscord` | `dweblink.linkdiscord` | Generate a code for the Discord bot |
| `/discordunlink` | `dweblink.discordunlink` | Unlink your Discord account (chat confirmation) |
| `/dweblink reload` | `dweblink.admin` | Reload `config.yml` and `messages.yml` |

All commands are player-only except `/dweblink reload`, which also works from console.

---

## Permissions

| Permission | Default | Grants |
|---|---|---|
| `dweblink.verify` | `true` | `/verify` |
| `dweblink.verifyemail` | `true` | `/verifyemail` |
| `dweblink.linkdiscord` | `true` | `/linkdiscord` |
| `dweblink.discordunlink` | `true` | `/discordunlink` |
| `dweblink.admin` | `op` | `/dweblink reload` |

The four player permissions default to `true` on purpose: linking is how a player gets onto your website in the first place, and gating it behind a rank generally means nobody ever links.

---

## LuckPerms examples

Give staff the reload permission without full op:

```
lp group staff permission set dweblink.admin true
```

Restrict Discord linking to a rank:

```
lp group default permission set dweblink.linkdiscord false
lp group vip permission set dweblink.linkdiscord true
```

Stop players unlinking themselves (staff handle it on the website):

```
lp group default permission set dweblink.discordunlink false
```

---

## Command registration

Commands are registered at runtime through DzusillCore's `CommandRegistry`, which is why `plugin.yml` has no `commands:` block. Tab-completion is generated from the same definitions, so it always matches what the command actually accepts.

## Next

- [FAQ & Troubleshooting](/plugins/dweblink/faq/)
