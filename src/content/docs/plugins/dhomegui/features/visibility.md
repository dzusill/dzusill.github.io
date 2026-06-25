---
title: "Visibility & Whitelist"
description: "Homes are private by default, but can be shared. Visibility is toggled per-home in the editor (the Visibility button)."
---

Homes are private by default, but can be shared. Visibility is toggled per-home in the [editor](/plugins/dhomegui/features/home-editor/) (the **Visibility** button).

## Visibility modes

| Mode | Who can teleport |
|---|---|
| **Private** | The owner only. |
| **Whitelist** | The owner **and** players on the home's whitelist. |

Trying to teleport to a home you can't access gives *"This home is private…"* or *"This home is whitelisted and you're not on the list."*

## Managing the whitelist

When a home is whitelisted, the **Whitelist** button in the editor opens a menu to add or remove allowed players. Confirmations are shown as *"You added/removed `<player>`…"*. You can also clear the whitelist.

> Whitelisted homes appear to allowed players and can be teleported to like any home they own access to. Private homes are only ever visible to the owner.

## Access in lore

Each home's lore shows its current access (`access.private` / `access.whitelisted` in [messages.yml](/plugins/dhomegui/configuration/messages/)), so owners can see at a glance which homes are shared.
