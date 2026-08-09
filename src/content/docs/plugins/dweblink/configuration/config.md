---
title: "config.yml"
description: "Every key, with its default."
---

Every key, with its default.

---

## Connection

```yaml
# Base URL of the website API (no trailing slash), e.g. https://api.yourserver.gg
api-base-url: "http://localhost:3000"

# Shared secret. MUST equal MC_PLUGIN_API_KEY configured on the API. Keep it private.
api-key: ""

# Which website tenant this server maps to (sent as the X-Tenant-Slug header).
tenant-slug: "default"
```

| Key | Default | Notes |
|---|---|---|
| `api-base-url` | `http://localhost:3000` | **no trailing slash** — a trailing `/` produces double-slash URLs and 404s |
| `api-key` | *(empty)* | must match `MC_PLUGIN_API_KEY` on the API exactly |
| `tenant-slug` | `default` | sent as `X-Tenant-Slug`; a wrong value looks like a broken API key |

While any of these is empty, every command answers *"Website linking isn't configured on this server yet."*

---

## Timings

```yaml
# Seconds a player must wait between /linkdiscord requests.
cooldown-seconds: 30

# Seconds a player has to type "confirm" in chat after running /discordunlink
# before the pending unlink expires (minimum 5).
unlink-confirm-seconds: 60
```

| Key | Default | Notes |
|---|---|---|
| `cooldown-seconds` | 30 | inside the window the cached code is returned instead of a new one |
| `unlink-confirm-seconds` | 60 | values below 5 are clamped to 5 |

---

## Profile sync

```yaml
profile-sync:
  enabled: true
  join-delay-ticks: 40
  min-interval-seconds: 300
  on-rank-change: true
  rank-change-settle-ticks: 10
  rank-change-coalesce-seconds: 2
```

Explained in full on [Profile & Rank Sync](/plugins/dweblink/features/profile-sync/).

---

## Security notes

- `api-key` grants the ability to verify accounts on your website. Treat it like a database password.
- Keep the file readable by the server user only (`chmod 600`).
- Use **https** in production. Over plain http the key travels in the clear.

## Next

- [messages.yml](/plugins/dweblink/configuration/messages/)
- [Reloading](/plugins/dweblink/configuration/reloading/)
