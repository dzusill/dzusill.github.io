---
title: "Commands & Permissions"
description: "Base command /toolsnotifier, aliases /tn and /toolnotifier."
---

Base command `/toolsnotifier`, aliases `/tn` and `/toolnotifier`.

## Commands

| Command | Permission | Edition | Description |
|---|---|---|---|
| `/tn` | — | Free | Show version & help. |
| `/tn reload` | `toolsnotifier.reload` | Free | Reload `config.yml`. |
| `/tn toggle` | `toolsnotifier.toggle` | Free | Mute/un-mute your own notifications. |
| `/tn status` | `toolsnotifier.status` | Free | List the durability of your held & worn items. |
| `/tn settings` | `toolsnotifier.pro.settings` | PRO | Open your personal [preferences GUI](/plugins/toolsnotifier/features/preferences-gui/). |
| `/tn admin` | `toolsnotifier.pro.admin` | PRO | Open the [admin gear monitor](/plugins/toolsnotifier/features/admin-monitoring/). |

`settings` and `admin` exist only on the PRO edition.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `toolsnotifier.notify` | everyone | **Receive** low-durability notifications. Revoke to exclude a player/group. |
| `toolsnotifier.toggle` | everyone | Use `/tn toggle`. |
| `toolsnotifier.status` | everyone | Use `/tn status`. |
| `toolsnotifier.reload` | op | Use `/tn reload`. |
| `toolsnotifier.pro.settings` | everyone | Open the preferences GUI *(PRO)*. |
| `toolsnotifier.pro.admin` | op | Open the admin monitor *(PRO)*. |

### Suggested setup

Defaults are sensible out of the box — every player receives notifications and can check/toggle/customise their own; only ops can reload or use the admin monitor. To stop a group receiving notifications entirely:

```
/lp group spectators permission set toolsnotifier.notify false
```
