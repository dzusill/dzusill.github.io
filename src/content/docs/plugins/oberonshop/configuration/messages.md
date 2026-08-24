---
title: "Messages"
description: "Every player-facing string is in messages.yml."
---

Every player-facing string is in `messages.yml`.

## Format

**MiniMessage only.** Legacy `&7` codes and bare `#RRGGBB` are *not* translated here — they would print
literally.

```yaml
shop:
  not-enough-money: "<#FF5555>You don't have enough money."
  inventory-full: "<#FF5555>Your inventory is full."
```

This differs from `gui/*.yml` and `shops/*.yml`, which accept all three dialects. The split is
deliberate: those files are lists of items where legacy codes are what people paste in, and chat goes
through one renderer that supports click and hover events.

Placeholders are `{token}` braces, listed per message in the file.

> **`{price}` already includes the currency symbol.** Writing `${price}` gives you `$$5M`.

## Turning one off

**An empty string disables that message.** The sound and the action-bar twin still fire.

```yaml
shop:
  purchase-success: ""
```

That is how a busy shop stops spamming chat on every purchase, and it is how the file ships.

## The action bar

```yaml
actionbar:
  not-enough-money: "<#FF5555>You don't have enough money."
  inventory-full: "<#FF5555>Your inventory is full."
  purchase-success: ""
```

These are **separate keys**, not a channel setting, so you can blank the chat line and keep the action
bar or the other way round.

## Two ways to say the same thing

`shop.not-enough-money` is used for the server's default currency; `shop.not-enough-currency` with a
`{currency}` token for anything else. One key for both would have turned "You don't have enough money."
into "You don't have enough Money."

## Adding or renaming keys

Don't rename them. A message key that does not exist prints **as its own key** in game, which is visible
rather than silent — but it is still a broken message. New keys appear with their defaults on upgrade.

## A YAML trap worth knowing

Never write a key as a bare `on:`, `off:`, `yes:` or `no:`. YAML reads those as booleans, so the path
never resolves and the message silently falls back to printing itself. Quote them, or name them something
else. The plugin's own build fails if any shipped key ends in one of those words.
