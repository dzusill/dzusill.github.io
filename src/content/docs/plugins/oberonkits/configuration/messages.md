---
title: "messages.yml"
description: "Every text the plugin sends, in MiniMessage. <prefix> is replaced by prefix. An empty string \"\" turns"
---

Every text the plugin sends, in MiniMessage. `<prefix>` is replaced by `prefix`. An empty string `""` turns
a message off.

## Where a message appears

A message is either one line (chat) or a block with any of these channels:

```yaml
kit-received:
  chat: "<prefix><gray>You received the <white>%kit_display%</white> kit."
  actionbar: "<green>%kit_display%"
  title: { title: "<gold>%kit_display%", subtitle: "", fade-in: 5, stay: 40, fade-out: 10 }
  sound: { name: entity.player.levelup, volume: 0.6, pitch: 1.4 }
```

## Placeholders

`%player%`, `%kit%`, `%kit_display%`, `%profile%`, `%world%`, `%uses%`, `%price%`, `%cooldown%`, `%amount%`,
`%victim%`, `%time%`, `%seconds%`. With PlaceholderAPI installed, any PAPI placeholder works too.

## Keys

| Key | Sent when |
|---|---|
| `kit-received` | A kit was given |
| `kit-received-paid` | A Stardust kit was given (shows uses left) |
| `kit-next-respawn` | A kit was queued for the next respawn |
| `kit-change-locked` | `allow-change: never` and the player already has a kit |
| `kit-change-cooldown` | Changing again too soon (`%cooldown%`) |
| `kit-no-permission` | Kit needs a permission the player lacks |
| `kit-out-of-uses` | Stardust kit with no uses |
| `no-kit-available` | Random mode found no usable kit |
| `kit-error` | Essentials could not give the kit |
| `data-loading` | The player's data is still loading after join |
| `choose-opened` | The menu opened (off by default) |
| `choose-timeout` | Time ran out and a kit was given |
| `choose-timeout-none` | Time ran out, no kit |
| `choose-reminder` | Countdown while the menu is open (`%seconds%`) |
| `purchase-success` | Stardust kit bought |
| `purchase-not-enough` | Not enough Stardust |
| `purchase-failed` | Withdrawal failed, nothing taken |
| `purchase-unavailable` | ExcellentEconomy missing |
| `killer-xp` | Sent to the killer (`%victim%`) |
| `regen-warning` | Before a regen (`%time%`) |
| `regen-started` | Regen begins |
| `regen-done` | Regen finished |
| `not-in-kit-world` | `/kits` outside a kit world |
| `drop-blocked` | Dropping an item where `prevent-drop` is on |
| `layout.saved` / `invalid` / `holding-item` / `kit-changed` / `disabled` / `not-arrangeable` | The [kit arranger](/plugins/oberonkits/features/kit-layouts/): saved, a stack was split, an item is still on the cursor, the kit changed while open, arranging is off or not allowed, the kit cannot be arranged |
| `admin.*` | Replies to `/okits` and its help lines |
| `admin.gui.saved` / `unchanged` / `rejected` / `note` | The result of an admin GUI change (`%what%`, `%reason%`, `%note%`) |
| `admin.gui.no-permission` | A locked GUI button was clicked (`%permission%`) |
| `admin.gui.prompt` / `prompt-cancelled` | The question asked in chat (`%what%`, `%current%`, `%hint%`) |
| `admin.gui.contents-saved` / `contents-failed` / `contents-empty` | Saving kit items from the inventory (`%kit%`, `%amount%`) |

The last block holds OberonCore's framework messages (no permission, usage, unknown player...).
