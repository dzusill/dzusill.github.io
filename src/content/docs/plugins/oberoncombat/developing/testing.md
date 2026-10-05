---
title: "Testing"
description: "MockBukkit and JUnit 5 cover the logic: attribution, tagging, kills and money, the combat log, the command blacklist, the cooldowns,"
---

## Automated tests

```
mvn test
```

MockBukkit and JUnit 5 cover the logic: attribution, tagging, kills and money, the combat log, the command blacklist, the cooldowns,
soup, the barrier geometry and refusal, the PvP toggle, restrictions, tag effects, the boss bar, commands on events, the kill-abuse
guard, the Duels hook and the config upgrade (a config from the first release gains every later section intact). Maven on JDK 25
needs `<fork>true</fork>` on the compiler plugin and `-Dnet.bytebuddy.experimental=true` on surefire; both are in the `pom.xml`.

## What a unit test cannot show

What a player's client does. These are the checks to make by hand with two players on a test server (or staging), with WorldEdit,
WorldGuard, **Vault and an economy** installed, and Duels-Shyam (with FastAsyncWorldEdit) for the duel checks. A local server is
started with `./testserver.sh <log> "command" …` and listens on port 25569 in offline mode.

Set up a safe zone first: `/rg define safe`, `/rg flag safe pvp deny`, and give yourself money.

### Tagging

| Do | Expect |
|---|---|
| Hit B with a sword; shoot B; throw a snowball, an egg, hook B with a rod | both tagged; the countdown on the action bar |
| Light TNT next to B; break an end crystal next to B | B tagged, and you |
| Use a respawn anchor next to B (overworld) or a bed (nether) | B tagged and credited to you |
| Throw splash poison at B, then healing | poison tags both, healing nobody |
| While tagged, throw a pearl or shoot a wind charge | the countdown goes back to full |
| `/tag`, `/tag B`, `/untag B`, `/untag all` | as named |

### Kills and money

| Do | Expect |
|---|---|
| Kill B (5 percent, B has 1000) | you +50 at once with a sound; B -50 |
| B presses respawn | the "you lost" notice arrives **after** the respawn |
| Kill B while still tagged by C | you are untagged and the action bar shows the money, not the countdown |
| Kill B again at once | money moves again |
| Kill B inside an excluded region | no money, no lightning |
| Push B into the void after hitting them | credited to you |
| B runs `/kill` while tagged | no credit |

### Combat log

B quits tagged: B dies, drops land, OberonKills prints the combat-log line. `/kick B` or a `stop`: nothing, unless you switched
those on.

### Soup (client only)

Hold mushroom stew and right-click: healed, fed, soup gone; **hold the click and try to run: no lingering animation, no slowdown.**
Left-click in the air works too. Rabbit stew, beetroot soup and suspicious stew use their own numbers. `/soup` with empty bowls fills
them. A right-click on a chest opens the chest and keeps the soup.

### Barrier

Get tagged, walk toward a `pvp: deny` region: a red wall appears near its edge; walking into it stops and pushes you back, the countdown
renews. A pearl or chorus fruit into the region is refused; a warp is allowed. Standing inside when tagged: you can walk out, no wall.
Gliding into it on an elytra: you are stopped and dropped. Compare the look and reach with PvPManager's if you have a baseline.

### PvP toggle, restrictions, effects

With `pvp-toggle.enabled: true`: `/pvp off`, then have B hit you: refused, B is told. A potion thrown at you has no effect. Standing in a
region with `pvp: allow` while PvP is off: you can be hit and you are told. With a restriction on (say `place-blocks`) tagged: refused with
the message, once a second. With `tag-effects.disable-fly` on, tagged while flying: flight is gone, and back when the tag ends. With
`barrier.vulnerable: true`: two tagged fighters can hit each other inside the safe zone, a bystander cannot hit them.

### Duels-Shyam 1.0.4

`/oberoncombat status` shows it found. A 1v1 duel: both tagged, a third player cannot tag them. `/oberoncombat debug` turns on the event trace:
win a duel and read the console to see **whether a death event is printed for the loser**. After the duel: both untagged, no money moved, no
lightning. Quit in the middle of a duel: Duels handles it, no combat-log death.

### The rest

`%oberoncombat_in_combat%` and `%pvpmanager_combat_timeleft%` in a scoreboard or `/papi parse`. `/oberoncombat reload` after editing both files.
Teleport commands from OberonUtils refuse while tagged.
