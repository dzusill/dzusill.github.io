---
title: "Requirements"
description: "---"
---

| Requirement | Version | Notes |
|---|---|---|
| Server | Paper / Purpur / Folia **1.21.x** | `folia-supported: true` |
| Java | **21+** | |
| DzusillCore | **required** | hard dependency |
| LuckPerms | optional | group mentions and `suffix_color` groups |
| EssentialsX | optional | AFK and ignore respect — **skipped on Folia** |
| StaffPlusPlus | optional | vanish detection |
| PlaceholderAPI | optional | |

---

## Storage

None. dMentions keeps per-player preferences (mention toggle, custom display) in memory and in DzusillCore's storage layer — there is no database to configure and no external service to reach.

## Chat plugin compatibility

dMentions listens to chat and rewrites the message. That means it works with most chat plugins, but **event priority matters**: a chat plugin that rebuilds the message component after dMentions runs will discard the highlighting.

If mentions ping correctly but the name is not coloured, it is a priority conflict — see the [FAQ](/plugins/dmentions/faq/).

## Folia

Supported, with one caveat: the **EssentialsX hook is skipped on Folia**, so AFK respect and ignore respect are unavailable there. Everything else works.

## LuckPerms

Only needed for group mentions (`@vip`) and for the `suffix_color.group` colours. Without it, player, nearby and everyone mentions all work normally.

## Next

- [Installation](/plugins/dmentions/getting-started/installation/)
