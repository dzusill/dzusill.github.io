---
title: "config.yml"
description: "Full reference for plugins/dWebLink/config.yml — the API base URL, shared key, tenant slug, command cooldown, and the profile-sync options."
---

The whole plugin is configured from `plugins/dWebLink/config.yml`.

```yml
# Base URL of the website API (no trailing slash, no /api/v1).
api-base-url: "https://api.yourserver.gg"

# Shared secret. MUST equal MC_PLUGIN_API_KEY on the API. Keep it private.
api-key: ""

# Which website tenant this server maps to (sent as the X-Tenant-Slug header).
tenant-slug: "default"

# Seconds a player must wait between /linkdiscord requests.
cooldown-seconds: 30

# Push each player's LuckPerms rank to the website so it shows as their author identity.
profile-sync:
  enabled: true
  join-delay-ticks: 40
  min-interval-seconds: 300
```

## Reference

| Key | Default | Description |
|---|---|---|
| `api-base-url` | `http://localhost:3000` | Host of the Phalanx API. **No trailing slash and no `/api/v1`** — the plugin appends the path itself. |
| `api-key` | `""` | Shared service key. Must equal the API's `MC_PLUGIN_API_KEY`. Empty ⇒ `/verify`, `/linkdiscord` and sync are disabled. |
| `tenant-slug` | `default` | Sent as the `X-Tenant-Slug` header; selects which website tenant this server maps to. |
| `cooldown-seconds` | `30` | Minimum seconds between `/linkdiscord` uses per player. (`/verify` is throttled server-side instead.) |
| `profile-sync.enabled` | `true` | Master switch for pushing LuckPerms rank on join and after `/verify`. |
| `profile-sync.join-delay-ticks` | `40` | Ticks to wait after join before reading LuckPerms (20 ticks = 1s). Raise if LuckPerms loads slowly. |
| `profile-sync.min-interval-seconds` | `300` | Minimum seconds between **automatic** (join) pushes per player. `/verify` pushes ignore this. |

## Notes

- After editing, restart the server (or reload if you use a config-reload flow) so the values take effect.
- `api-key` is a secret — do not commit it or share screenshots of `config.yml`.
- Set `profile-sync.enabled: false` to keep account linking while turning off rank sync entirely.
