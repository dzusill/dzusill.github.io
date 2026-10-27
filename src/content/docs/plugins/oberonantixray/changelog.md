---
title: "Changelog & testing"
description: "What each Oberon build of the anti-xray fixed, and how to check it in game."
---

## 0.24.0beta-oberon3

**Fixed**

- **Ores behind glass.** An ore touching glass (glass block, pane, stained or tinted glass) with stone on its other
  sides stayed stone forever, even when you looked straight at it. It now shows once you can see it. Ores behind
  glass *and* a stone wall stay hidden.
- **Entities around corners.** With `boundingBoxExpansion` above `0`, a player or mob standing just past a wall corner
  was sent to the client before any part of it was visible, so ESP users saw it early. Entities now show only when
  part of their real hitbox is in view. F5 (third person) views still work.

**Unchanged:** configs, commands, permissions, the Vulcan fix from oberon1 and the idle tracing from oberon2.

**How to test**

1. Dig a 1×2 tunnel in stone. Place an ore at the end and a glass block (or pane) right in front of it. Walk up and
   look through the glass: the ore must show.
2. Put stone between the glass and the ore: it must stay stone.
3. With an x-ray pack, check ores you cannot see stay stone and that you see fake ores.
4. Two players: one sneaks just behind a wall corner, the other stands on the other side. The hidden player must
   appear only when they come into view, not a block early. In F5 they appear when the camera can see them.
5. Mine into a mineshaft or dungeon and stand still: chests and ores in view show up without moving.
6. Join with Vulcan on: no `invalid confirmation packet` kick.

## 0.24.0beta-oberon2

- Standing still no longer freezes ray tracing. Digging into a structure revealed nothing until you moved; now ores
  and chests in view show up right away. Costs about 2 % of a CPU core per standing player.

## 0.24.0beta-oberon1

- Runs on Paper 26.3.
- Vulcan no longer kicks every player on join: the anti-xray ping now uses an ID outside Vulcan's range.
- Renamed to OberonAntiXray; config folder `plugins/OberonAntiXray/`.
