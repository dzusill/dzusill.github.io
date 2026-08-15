---
title: "Kill Confirmation Menu"
description: "/kill and /suicide behind a confirm menu that only reacts to clicks inside itself."
---

`/suicide` and `/kill <player>` both open a confirmation menu rather than acting immediately.

## Only clicks inside the menu count

The menu is identified by owning its own inventory, and any click that did not land inside it is
ignored.

That sounds obvious. It is worth spelling out because the version this replaced got it wrong in a
way players could trigger by accident: it decided what you clicked from the slot **number**, without
checking which inventory the click came from. A slot number is relative to whichever inventory was
clicked — so with the menu open, a click at the matching slot of your own backpack was
indistinguishable from clicking Confirm, and killed you.

Every click is cancelled while the menu is open, so items cannot be shifted around underneath it
either.

## Deaths read correctly

```yaml
kill:
  suicide-cause: SUICIDE
  staff-kill-cause: KILL
```

The player is killed directly rather than by running another plugin's command, and the death carries
a real damage cause — so a death-message plugin prints what it would print for any other death.
`/suicide` reads as a suicide; `/kill <player>` deliberately does not.

Both accept any damage cause name, if your death-message plugin words something differently.

## Layout

```yaml
  menu:
    title: "<#C21807>💀 <gradient:#C21807:#F11800><b>Confirm Kill</b></gradient>"
    rows: 3
    cancel:  {slot: 11, material: RED_STAINED_GLASS_PANE,  name: "<gradient:#FF5555:#E64D4D>Cancel</gradient>",  lore: []}
    confirm: {slot: 15, material: LIME_STAINED_GLASS_PANE, name: "<gradient:#55FF55:#4DE64D>Confirm</gradient>", lore: []}
    target:  {slot: 13, name: "<#C21807><target>", lore: []}
    filler: AIR
```

The target slot shows that player's head. `<target>` works in its name and lore.

`filler` fills every other slot — `AIR` leaves them empty. A slot number outside the menu falls back
to the default and says so in console rather than silently vanishing.

## Combat

```yaml
  block-in-combat: false
  cooldown: 0s
```

`block-in-combat` refuses `/suicide` while PvPManager has the player tagged. It ships **off**,
because the command is open to everyone by default — but it is the switch that closes "type
`/suicide` to deny your attacker the kill", where the attacker gets no credit and the death is
recorded as a suicide instead.

## Closing

The menu closes a tick after the click, not during it. Closing an inventory from inside the click
event leaves the view and the cursor mid-update, which shows up as ghost items and a desynced
cursor.

## Sounds

The two buttons are ordinary messages, so their sounds live in `messages.yml`:

```yaml
Presentation:
  Overrides:
    kill.menu-cancel:  {Channel: NONE, Sound: {Name: ui.button.click, Volume: 0.8, Pitch: 1.0}}
    kill.menu-confirm: {Channel: NONE, Sound: {Name: ui.button.click, Volume: 0.8, Pitch: 1.0}}
```

`Channel: NONE` means the sound plays and no text is sent.
