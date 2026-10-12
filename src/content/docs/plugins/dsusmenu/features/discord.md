---
title: "Discord"
description: "Discord runs through dPhalanx 1.3.0+ and the Phalanx website. dSusMenu sends events to dPhalanx, dPhalanx forwards them to the Phalanx API, and the Phalanx…"
---

Discord runs through [dPhalanx](/plugins/dphalanx/) 1.3.0+ and the Phalanx website. dSusMenu sends events to dPhalanx, dPhalanx forwards them to the Phalanx API, and the Phalanx bot posts them. Button presses travel the same way back.

If Discord or the website is down, the game is never affected. Events wait in dPhalanx's queue and are delivered once it is back.

## Setup

1. Install **dPhalanx 1.3.0+** next to dSusMenu (same DzusillCore).
2. In the Phalanx admin panel (*Server → Discord*):
   - turn on the **anti-cheat integration**,
   - pick the **staff roles** allowed to press the buttons (none = nobody),
   - optionally pick a **ping role** for CRITICAL alerts and the daily summary hour,
   - set the channels: **Anti-cheat alerts**, **Anti-cheat punishments**, **Anti-cheat staff log** and **System errors**.
3. Staff link their Discord to their Minecraft account (dWebLink) so their in-game permissions can be checked.

## What gets posted

| Event | Channel | When |
| --- | --- | --- |
| Case alert | Alerts | A case reaches HIGH or CRITICAL. Shows the trigger check, top contributing checks, ping/TPS/CPS, version and client, with **Open case / Freeze / Kick / Ban** buttons. CRITICAL pings the ping role. |
| Client detection | Alerts | A notable client rule matched |
| Punishment | Punishments | A ban or mute AdvancedBan confirmed, a kick, or a Vulcan punishment |
| Staff action | Staff log | Freeze and unfreeze (from game, console or Discord), a frozen player logging out, and a punishment AdvancedBan refused |
| Case status | Staff log | A case opened by staff, reviewed, resolved or dismissed |
| Case export | Staff log | The markdown report as a file |
| System error | System errors | Database or delivery problems, at most once a minute per kind |

Each event can be switched off in `config.yml` under `discord.events`. Embeds never contain IP addresses, and whatever a player wrote (brand, reasons) cannot form links or mentions.

## Buttons

- **Open case:** shows a summary of the case (only to you).
- **Freeze:** asks for an optional reason, then freezes the player on the server.
- **Kick / Ban:** asks for a reason (and for a ban, an optional duration; blank = permanent).

Before anything runs, it is checked twice. The website checks your Discord role. dSusMenu checks that your linked Minecraft account has the permission: `dsusmenu.action.freeze`, `.kick` or `.ban`. That check works through LuckPerms even when you are offline.

The result is posted as a reply under the alert. An action that didn't reach the server within two minutes expires and is not run later.

## Daily summary

Once a day, at the hour set in the admin panel (in the server's configured time zone), the alerts channel gets a summary of the last 24 hours:

- alerts by risk,
- the top checks,
- repeat offenders,
- punishments by source,
- errors.
