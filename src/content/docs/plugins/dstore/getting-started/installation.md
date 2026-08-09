---
title: "Installation"
description: "---"
---

1. Drop `dStore.jar` into `plugins/`.
2. Start the server once to generate `plugins/dStore/config.yml`.
3. In the website admin panel, open **Store → Settings** and create an installation.
4. Copy the installation ID and secret into `config.yml`.
5. `/dstore reload`.

---

## Minimum config

```yaml
api-base-url: "https://api.yourserver.gg/api/v1"
installation-id: "inst_..."
secret: "..."
```

> ⚠️ `secret` authorises granting ranks and items. Keep `config.yml` readable by the server user only (`chmod 600`), and never paste it into a support channel.

## Verifying it worked

```
/dstore status
```

A healthy installation reports that it is polling and shows a recent successful contact with the API. If it reports an authentication failure, the ID or secret is wrong, or they belong to a different tenant.

Then place a real test purchase — see [Quick Start](/plugins/dstore/getting-started/quick-start/).

## If you use LuckPerms

Install it before you configure rank products. Without LuckPerms, entitlement actions fail and the job is reported back as failed rather than silently skipped — the website will show the purchase as undelivered, which is the correct outcome.

## Updating

Either replace the jar manually and restart, or use the built-in updater:

```
/dstore update
```

See [Updates](/plugins/dstore/features/updates/).

## Next

- [Quick Start](/plugins/dstore/getting-started/quick-start/)
