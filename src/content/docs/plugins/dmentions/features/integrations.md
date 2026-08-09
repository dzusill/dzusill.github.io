---
title: "Integrations"
description: "All optional. Each one is loaded only if the plugin is present, and its absence changes nothing else."
---

All optional. Each one is loaded only if the plugin is present, and its absence changes nothing else.

---

## LuckPerms

Powers [group mentions](/plugins/dmentions/features/group-mentions/) — resolving which group a player is in and which groups exist — and the `suffix_color.group` colours.

Without it, `@vip` stays plain text. Player, nearby and everyone mentions are unaffected.

## Vanish

```yaml
vanish_respect: true
vanish_provider: auto
```

A vanished player is not pinged and is not revealed by an `@everyone` or `@nearby`. Without this, a broadcast mention silently confirms that a hidden staff member is online.

`vanish_provider: auto` detects the installed provider. Supported: **EssentialsX** and **StaffPlusPlus**. Set it explicitly if you run more than one and want a specific answer.

Set `vanish_respect: false` only if you have a reason — the default is the safe one.

## EssentialsX

```yaml
afk_respect: false
ignore_respect: true
```

| Setting | Effect |
|---|---|
| `afk_respect` | when true, AFK players are not pinged |
| `ignore_respect` | when true, a player who ignored the sender is not pinged |

`ignore_respect` defaults to **on**: a mention should not be a way around `/ignore`.

`afk_respect` defaults to **off**, because the usual reason to mention an AFK player is precisely to get their attention when they come back.

> ⚠️ **Not available on Folia.** The EssentialsX hook is skipped there, so both settings have no effect on a Folia server.

## StaffPlusPlus

An alternative vanish provider. Detected automatically by `vanish_provider: auto`.

## PlaceholderAPI

Soft dependency, used where placeholders appear in configured text.

## Chat plugins

dMentions rewrites the chat message, so **event priority decides who wins**. A chat plugin that rebuilds the message component after dMentions has run discards the highlight.

Symptom: the ping fires and the sound plays, but the name is not coloured. Fix: adjust the other plugin's chat priority — see the [FAQ](/plugins/dmentions/faq/).

## Next

- [config.yml](/plugins/dmentions/configuration/config/)
