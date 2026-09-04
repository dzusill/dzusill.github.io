---
title: "goals.yml"
description: "Community goals. See Community Goals for how progress is computed and what each option means — this page is the file laid out in full."
---

Community goals. See [Community Goals](/plugins/oberondonations/features/community-goals/) for how progress is computed and what each option means — this page is the file laid out in full.

```yaml
enabled: true

bar:
  full: '<green>|'
  empty: '<grey>|'

goals:

  default:
    name: 'Community Goal'
    description: 'Help us reach the target!'
    type: amount            # amount | count | package
    target: 100.0
    currency: USD            # must match store.default-currency in config.yml
    packages: []              # only for type: package — names or Tebex package ids
    enabled: true
    provider: internal        # internal (recommended) | tebex
    tebex-goal-id: '…'        # only used when provider: tebex
    on-complete: hold-until-month-end   # none | hold-until-month-end | reset
    starts: ''                 # optional campaign window, 'yyyy-MM-dd HH:mm', config.yml's timezone
    ends: ''
    milestones:
      '50':
        commands: []
      '100':
        commands: []
```

Add as many keys under `goals:` as you like — each runs independently, with its own type, currency, target and milestones. `%goal% %percent% %target%` are substituted in milestone `commands`.

`packages:` accepts a [packages.yml](/plugins/oberondonations/configuration/packages-yml/) key (`nebula`), that package's display name, or the raw store id or name — all four mean the same package. Writing the key is the one that survives renaming the package on the store.

## See also

- [Community Goals](/plugins/oberondonations/features/community-goals/)
- [Discord Webhooks](/plugins/oberondonations/features/discord-webhooks/#events) — `goal-milestone` / `goal-complete` embeds
- [Reloading](/plugins/oberondonations/configuration/reloading/)
