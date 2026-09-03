---
title: "boards.yml"
description: "Donation board rendering. See Donation Boards for what each renderer and section actually does — this page is the file laid out in full."
---

Donation board rendering. See [Donation Boards](/plugins/oberondonations/features/donation-boards/) for what each renderer and section actually does — this page is the file laid out in full.

```yaml
default-renderer: TEXT_DISPLAY   # TEXT_DISPLAY | HEAD | NPC
default-spacing: 2.2
default-render-radius: -1

general:
  lines:
    - '<#C21807>#{rank} {player}'
    - '<#AAAAAA>{metric}: <#00FC00>{value}'

rank-lines:
  '1':
    - '<#FBBF24><bold>#1 {player}'
    - '<#AAAAAA>{metric}: <#00FC00>{value}'

empty:
  name: 'No Data'
  value: '-'
  skin-name: ''
  lines:
    - '<#555555>#{rank} {player}'
    - '<#555555>{metric}: {value}'

metric-names:
  spent: Donated
  donations: Purchases
  hype: Hype

period-names:
  today: Today
  week: This Week
  month: This Month
  alltime: All Time

hologram:
  position: above           # above | below
  always-face-viewer: true
  billboard: CENTER          # FIXED VERTICAL HORIZONTAL CENTER
  alignment: CENTER          # LEFT RIGHT CENTER
  see-through: false
  shadow: true
  scale: 1.0
  view-range: -1
  base-offset-y: 0.35
  skin-base-offset-y: 1.85
  line-spacing-y: 0.25

armor-stand:
  small: false
  marker: false
  visible: false
  gravity: false
  invulnerable: true
  base-plate: false

npc:
  type: head                # head | skin
  skin-backend: auto         # auto | fancynpcs | znpcsplus | citizens
  skinsrestorer-integration: false
  async-profile-skin-lookup: true
  sessionserver-skin-fallback: true
  mojang-username-skin-lookup: true
  mojang-username-skin-lookup-disabled: false
  skin-fetch-delay-ms: 800
  skin-fetch-retry-pause-ms: 5000
  skin-retry-delays-seconds: [5, 20]
  head-cache-ttl-seconds: 300
  fancy-skin-refresh-enabled: true
  fancy-skin-refresh-delays-seconds: [3, 8, 15]
  animate-refresh: false

behaviour:
  respawn-delay-ticks: 2
  proximity-check-ticks: 10
  nearest-look-max-distance: 48

actions:
  enabled: false
  right-click:
    console: []
    player: []
```

## See also

- [Donation Boards](/plugins/oberondonations/features/donation-boards/)
- [Known Limitations](/plugins/oberondonations/limitations/) — `npc.type: skin` verification status by backend
- [Reloading](/plugins/oberondonations/configuration/reloading/)
