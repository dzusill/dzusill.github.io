---
title: "Installation"
description: "It works immediately with sensible defaults. Everything below is optional tuning."
---

1. Install **DzusillCore** in `plugins/`.
2. Drop `dMentions.jar` into `plugins/`.
3. Restart.

It works immediately with sensible defaults. Everything below is optional tuning.

---

## First things to check

`plugins/dMentions/config.yml`:

```yaml
lang_file: "en-US"
prefix: "<dark_gray>[<#ffd16d>dMentions</#ffd16d>]</dark_gray>"
mention_limit: 2
disabled_worlds:
  - "no_mention_world_1"
  - "no_mention_world_2"
```

The shipped `disabled_worlds` are **placeholders**, not real worlds. Replace them with your own or empty the list:

```yaml
disabled_worlds: []
```

## Grant the mention permissions

Player, nearby and everyone mentions each need their own permission:

```
lp group default permission set dmentions.mention.player true
lp group default permission set dmentions.mention.nearby true
```

`@everyone` is worth restricting:

```
lp group default permission set dmentions.mention.everyone false
lp group mod permission set dmentions.mention.everyone true
```

## Group mentions

Group mentions need LuckPerms. Grant per group:

```
lp group default permission set dmentions.mention.group.vip true
```

and exclude the ones nobody should be able to ping:

```yaml
group:
  disabled_groups:
    - "admin"
    - "owner"
```

## Verifying it worked

Say `@YourName` in chat. The name should be coloured and you should hear the mention sound.

If the ping fires but the colour does not stick, another chat plugin is rebuilding the message after dMentions — see the [FAQ](/plugins/dmentions/faq/).

## Updating

Replace the jar and restart. New config keys are merged into your file with their comments; your values are preserved.

## Next

- [Quick Start](/plugins/dmentions/getting-started/quick-start/)
