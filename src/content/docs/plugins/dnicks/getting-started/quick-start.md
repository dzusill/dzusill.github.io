---
title: "Quick Start"
description: "A two-minute tour once dNicks is installed."
---

A two-minute tour once dNicks is installed.

## Set a nick

```
/nick <gradient:#ff5fa2:#a18fff>Steve</gradient>
```

Use any [MiniMessage](https://docs.papermc.io/adventure/minimessage/) styling you have permission for:

```
/nick <rainbow>Rainbow</rainbow>
/nick <#00ffaa>Mint</nick>
/nick <red>Red</red>
/nick <gold><bold>VIP</bold></gold>
```

The styled name immediately appears in **chat**, the **tab list**, and on the **floating nametag** above your head.

## Use the picker GUI

Don't want to type tags? Open the picker:

```
/nick picker
```

Click a color or gradient swatch to apply it to your name, or click **Custom** to type a full nick in chat. Swatches you don't have permission for are hidden automatically.

## Reset

```
/nick reset
```

Back to your normal username everywhere.

## Set someone else's nick (admin)

```
/nick Notch <rainbow>King</rainbow>
```

Requires `dnicks.nick.others`.

## Find who's behind a nick

```
/realname King
```

→ `King = Notch`.

## Reload after editing config

```
/dnicks reload
```

Re-reads `config.yml` + the language file and re-applies every online player's nick live.

Next: [Gradient & Color Nicks](/plugins/dnicks/features/gradient-nicks/).
