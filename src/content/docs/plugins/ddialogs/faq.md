---
title: "FAQ & Troubleshooting"
description: "Every failure mode with what it actually means, and the quick answers to the questions people ask most."
---

## Quick diagnosis

| What you see | What it means |
|---|---|
| The dialog does not appear at all | It did not parse. The console names the file, the key and what was expected |
| `/mycommand` says unknown | Commands register at startup — restart, do not reload |
| A placeholder shows as `%…%` | PlaceholderAPI is missing, or that expansion is not installed |
| A button does nothing | Its command does not exist here. The console lists these at startup |
| An icon is a pink square | It is a block or an animated item |
| The dialog appears **in chat** | The server could not encode it — see below |
| Blank rows in a leaderboard | Add `skip-empty: true` |
| The whole leaderboard is missing | That is `skip-empty` working — the placeholders are not resolving |
| The pause button shows an old menu | Restart once more; the datapack lags by one start |

`/ddialogs list` shows every dialog that loaded. If yours is not there, it did not parse.

---

## My dialog renders in chat instead of on screen

The most confusing failure, and it is not a fallback for old clients.

The server builds the screen, hands it to the vanilla codec to encode, and if the codec refuses, the whole thing drops to a chat prompt:

```
[dDialogs] Dialog backend failed to render for <player>; falling back
java.lang.RuntimeException: Failed to encode input: ... ; <the actual reason>
```

**Read to the very end of that message.** The reason is appended *after* a long dump of the dialog object, and it names the exact field.

The usual cause is `<head:%some_placeholder%>` where that expansion is not installed — the head is asked for a player called `%ajlb_lb_..._name%` and the encoder rejects the name. Current versions drop an invalid icon instead of failing the screen, so this should not reach you.

**Why "some" dialogs break and not others:** one failure invalidates the rendering backend, so the *next* dialogs also go to chat until it is resolved again. One bad screen looks like several.

## Why does my icon show a pink square?

Two causes, both covered on [Icons](/plugins/ddialogs/features/icons):

**It is a block.** Blocks are 3D models with no flat icon. `<item:gold_block>` fails; `<sprite:block/gold_block>` works. Chests, beds, shields and skulls are models too.

**It is animated.** A clock ships as `clock_00` … `clock_31`; there is no plain `item/clock`. Same for compasses. Pick a different item.

Verify against your client jar rather than guessing — the command is on the Icons page.

## Why is my leaderboard empty?

Almost always: the placeholders are not resolving, and `skip-empty: true` is correctly hiding rows that would otherwise be literal `%ajlb_...%` text.

Check the placeholder itself first:

```
/papi parse me %ajlb_lb_statistic_player_kills_1_alltime_name%
```

If that comes back unchanged, the expansion is missing or the board was never created. See [Leaderboards](/plugins/ddialogs/features/leaderboards) for the `/ajlb add` commands.

To see the shape without any of that, open example 12 — a leaderboard from a live source that needs nothing installed.

## Why does my settings toggle not update?

Check the action order:

```yaml
    actions:
      - "[player] settings toggle chat"     # first: change the value
      - "[dialog] my-settings"              # then: rebuild the screen
```

`[player]` runs immediately; `[dialog]` is deferred one tick, so the command finishes before the new screen reads the value. Reversed, the screen rebuilds from the old value.

And if the value updates but the colour does not: **colour has to come from the placeholder**. A dialog has no conditionals.

## Why does my stats card show my own stats?

Placeholders always resolve against **the player looking at the screen**, never the one whose button was clicked.

Run a command instead and let the stats plugin open its own screen:

```yaml
      actions:
        - "[player] stats $(player_name)"
        - "[close]"
```

## Why does the pause menu show an old version?

Datapacks are read when the world loads; the plugin writes the new one afterwards, during enable. So a change written on one start is only served on the **next** one.

If you edited the menu and restarted once, restart once more.

## Can I have pages?

No. Dialogs have no pagination — nothing on a rendered screen can grow.

For a **list from a source**, narrow it with `[filter]` instead of splitting it. For **fixed slots** like homes, page two is a separate dialog file with its own Back button.

## Can a dialog update while it is open?

No. It is drawn once and never changes. Everything that looks like an update is the screen being reopened.

## Can I show a different screen depending on a value?

Not inside YAML — there are no conditionals. Two options:

1. Have a placeholder return the pre-worded, pre-coloured value, so one screen covers both cases.
2. Run a command and let a plugin decide which dialog to open with `/dopen`.

## Do old clients break?

No. A client older than 1.21.6 cannot draw dialogs, so those players are routed to the chat fallback — a worse screen, but a working one.

That routing needs **ViaVersion** to detect client versions. Without it every client is assumed to speak the server's protocol, which is true unless a translating proxy is involved.

Icons need 1.21.9+; on older clients they render as nothing rather than breaking the screen.

## My other plugin still uses chat prompts

Most likely it **shades DzusillCore** into its own jar instead of depending on a separate core jar. It then carries a private copy of the dialog interfaces, and Bukkit's service lookup matches on class identity — so dDialogs' registration is invisible to it.

The fix is in that plugin: switch core to `provided` scope and install DzusillCore separately.

## Do I need to restart, or is reload enough?

| Change | Reload | Restart |
|---|---|---|
| Editing a dialog's text, buttons, layout | ✅ | |
| Adding or deleting a dialog file | ✅ | |
| A new `open: command:` | | ✅ |
| Anything under `pause-menu` | | ✅ (often twice) |
| Updating the jar | | ✅ |

## Is YAML indentation really that fussy?

Yes. **Spaces only, never tabs**, and items at the same level must line up exactly. It is the most common reason a file refuses to load, and the console tells you which line.

If a value contains `:` or starts with a special character, quote it: `label: "<green>Yes: really"`.
