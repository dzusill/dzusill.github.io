---
title: "FAQ & Troubleshooting"
description: "A chat plugin is rebuilding the message component after dMentions ran, discarding the highlight. Adjust that plugin's chat event priority so it runs before…"
---

### The ping fires but the name is not coloured.

A chat plugin is rebuilding the message component **after** dMentions ran, discarding the highlight. Adjust that plugin's chat event priority so it runs before dMentions, or configure it to preserve existing components.

The tell: the sound plays and the right person is notified, but the chat line looks plain.

### Nothing happens at all when I type `@name`.

Work down the list:

1. Is the type enabled? `player.enabled: true`
2. Does the sender have `dmentions.mention.player`?
3. Is the target **online**? Offline names are never matched.
4. Is the world in `disabled_worlds`? Remember the two shipped placeholder names.
5. Is the sender inside `player.cooldown`?
6. Over `mention_limit` (default 2) for that message?
7. Has the target used `/dm toggle`?
8. Does the target hold `dmentions.mention.restricted`?

### `@vip` does nothing.

Group mentions need LuckPerms. Then check the group is not in `group.disabled_groups`, and that the sender has `dmentions.mention.group.vip`.

### Players cannot use `/dm toggle`.

Command permissions default to **op**. Grant it:

```
lp group default permission set dmentions.toggle true
```

### `@everyone` is being abused.

Restrict it and raise its cooldown:

```
lp group default permission set dmentions.mention.everyone false
lp group mod permission set dmentions.mention.everyone true
```

```yaml
everyone:
  cooldown: 60
```

### One message pings six people.

Lower `mention_limit`. Cooldowns cannot help here — they only start after the message is sent.

### AFK and ignore settings do nothing.

They need EssentialsX, and the EssentialsX hook is **skipped on Folia**. On Folia neither `afk_respect` nor `ignore_respect` has any effect.

### Vanished staff are being revealed by `@everyone`.

Check `vanish_respect: true` and that `vanish_provider` resolves — `auto` detects EssentialsX or StaffPlusPlus. If you run both, name the one you want explicitly.

### Can players ping each other from different worlds?

Player, everyone and group mentions ignore world boundaries (subject to `disabled_worlds`). `@nearby` is same-world only, by distance.

### How do I change `@everyone` to `@all`?

```yaml
everyone:
  keyword: "@all"
  display: "@all"
```

Change both, or players type one thing and see another.

### Are custom displays permanent?

Yes, per player, across restarts. Staff can override one with `/dm user <player> display <value>`.

### Is this the same as the original DMentions?

It is a rebuild of desaxx's DMentions on the DzusillCore framework — same concepts, reworked internals, MiniMessage throughout, and a chat-prompt settings GUI instead of anvil input. Configuration is not file-compatible with the original.

### Does it work on Folia?

Yes, except the EssentialsX-backed AFK and ignore respect.

## Next

- [Credits](/plugins/dmentions/credits/)
