---
title: "ggwave.yml"
description: "The GG Wave's mechanics. Presentation lives in announcements.yml instead — see GG Wave for how triggering, entering and rewarding fit together."
---

The GG Wave's mechanics. Presentation lives in `announcements.yml` instead — see [GG Wave](/plugins/oberondonations/features/gg-wave/) for how triggering, entering and rewarding fit together.

```yaml
enabled: false

trigger-message: GG
trigger-match: exact       # exact | contains

duration-seconds: 10
cooldown-seconds: 60

trigger:
  min-amount: 0
  eligible-packages: []
  ignored-packages: []

min-participants: 1

reward-mode: everyone       # everyone | anything else = winner-count random entrants
winner-count: 3

reward-timing: after_wave   # after_wave | during_wave

eligibility:
  permission: ''
  min-seconds-online: 0
  allow-triggering-donor: true

rewards:
  commands:
    - 'crate key give %player% rare 1'
  money: 0
  currency: ''
  money-command: ''
```

`%player%` and `%uuid%` are substituted in `rewards.commands`; `%player% %uuid% %amount% %currency%` in `rewards.money-command`.

## See also

- [GG Wave](/plugins/oberondonations/features/gg-wave/)
- [Reloading](/plugins/oberondonations/configuration/reloading/)
