---
title: "Quick Start"
description: "A five-minute end-to-end test of all three link types."
---

A five-minute end-to-end test of all three link types.

---

## 1. Link a website account

1. On the website, start a login and enter your Minecraft nickname.
2. The site shows a code.
3. In game:

```
/verify 123456
```

Expected: a success message, and your Minecraft name now appears on your website profile.

Type a wrong code deliberately — you should get *"Wrong code. 2 attempt(s) left"*. That counter is enforced by the API, not the plugin.

## 2. Verify an email

1. On your website profile, request an email verification code.
2. Check the inbox.
3. In game:

```
/verifyemail 654321
```

Expected: success. Try the same email on a second account and you get *"That email is already verified by another player on this server."*

## 3. Link Discord

```
/linkdiscord
```

The plugin returns a code. Give it to the Discord bot. Your Discord account is now attached to the same profile.

Run `/linkdiscord` again within 30 seconds and you get a cooldown message — the same code is cached and reused rather than burning a new one.

## 4. Unlink Discord

```
/discordunlink
```

The plugin asks you to type **confirm** in chat within 60 seconds. Type anything else — or wait — and the unlink is cancelled with your Discord still attached.

## 5. Check rank sync

Give yourself a new rank:

```
lp user <you> parent set vip
```

Within a couple of seconds your website profile should show the new rank, without you rejoining. If it does not, see [Profile & Rank Sync](/plugins/dweblink/features/profile-sync/).

---

## Typical first-run problems

| Symptom | Cause |
|---|---|
| "Website linking isn't configured" | one of `api-base-url`, `api-key`, `tenant-slug` is empty |
| "couldn't reach the website" | wrong URL, or outbound HTTPS blocked |
| "the website returned an unexpected response" | `api-key` does not match `MC_PLUGIN_API_KEY`, or wrong `tenant-slug` |
| Rank never appears on the site | LuckPerms missing, or `profile-sync.enabled: false` |

## Next

- [Website Login](/plugins/dweblink/features/website-login/)
- [config.yml](/plugins/dweblink/configuration/config/)
