---
title: "Installation"
description: "---"
---

1. Install **DzusillCore** in `plugins/`.
2. Drop `dWebLink.jar` into `plugins/`.
3. Start the server once — this generates `plugins/dWebLink/config.yml` and `messages.yml`.
4. Stop the server, or keep it running and reload after step 5.
5. Fill in the three API values in `config.yml`.
6. Run `/dweblink reload` (or restart).

---

## Minimum config

```yaml
api-base-url: "https://api.yourserver.gg"
api-key: "the value of MC_PLUGIN_API_KEY on the API"
tenant-slug: "default"
```

> ⚠️ **`api-key` is a shared secret.** Anyone holding it can verify accounts on your website. Keep `config.yml` readable by the server user only, and never paste it into a support channel.

## Verifying it worked

Run `/verify` with no arguments as a player. You should get the usage line:

```
WebLink » Usage: /verify <code> — get the code by logging in on the website.
```

If you instead get *"Website linking isn't configured on this server yet"*, one of the three values is still empty or the reload did not pick them up.

For a real end-to-end check, follow the [Quick Start](/plugins/dweblink/getting-started/quick-start/).

## Permissions

Out of the box every player can use `/verify`, `/verifyemail`, `/linkdiscord` and `/discordunlink`. Only `/dweblink reload` is op-only. See [Commands & Permissions](/plugins/dweblink/commands-and-permissions/) if you want to tighten that.

## Updating

Replace the jar and restart. Config keys added by a new version are merged into your existing file with their comments intact — your values are never overwritten.

## Next

- [Quick Start](/plugins/dweblink/getting-started/quick-start/)
