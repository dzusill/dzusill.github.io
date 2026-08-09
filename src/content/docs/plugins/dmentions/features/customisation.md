---
title: "Player Customisation"
description: "Players can change how their own name renders when someone mentions them."
---

Players can change how their own name renders when someone mentions them.

```
/dm customize <display>
```

Requires `dmentions.customize`.

---

## How it renders

Once a player sets a custom display, mentions of them use `player.customized_display` instead of `player.display`:

```yaml
player:
  display: "@{p}"                      # normal
  customized_display: "<#eac773>@{display}"   # customised
```

`{display}` is the player's chosen text. Because the two formats are separate, you can make customised tags visually distinct — the shipped default gives them a different colour, so a custom tag cannot be mistaken for a plain one.

## Whether to grant it

`dmentions.customize` defaults to **op**. Two reasonable policies:

**Keep it staff-only.** Simple, and no player can pick a confusing tag.

**Sell it as a perk.** Custom mention tags are a decent VIP feature:

```
lp group vip permission set dmentions.customize true
```

If you do grant it widely, make `customized_display` clearly different from `display`, so nobody can style their tag to look like another player's.

## Staff overrides

```
/dm user <player> display <value>
```

Sets another player's display directly. Requires `dmentions.admin`.

```
/dm user <player> mentions <value>
```

Sets whether that player receives mentions — the admin equivalent of their `/dm toggle`.

Use both to clean up a tag that breaks the rules without waiting for the player to log in.

## Persistence

Custom displays and toggle state survive restarts. They are per player, not per session.

## Next

- [Settings GUI](/plugins/dmentions/features/settings-gui/)
