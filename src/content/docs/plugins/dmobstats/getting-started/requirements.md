---
title: "Requirements"
description: "dMobStats documentation"
---

| Requirement | Version |
|---|---|
| Server software | **Paper**, 1.21.x up to 26.x. One jar for all of them. |
| Java | **21+** |
| DzusillCore | **1.14.6+**, required, separate download |
| Other plugins | none required, none optional |

## Notes

- **Paper only.** Spigot and CraftBukkit are not supported (dMobStats uses Paper API). `plugin.yml` does not declare Folia support, so treat Folia as untested.
- **Mobs newer than 1.21.1** (for example the Copper Golem or the Zombie Nautilus on versions that have them) appear in the mob list automatically because the mob list is read from the server's registry. Their common properties and attributes always work; the special properties of a few newer mobs and variant types are only offered on versions that have the matching Paper API.
- **Attributes a server version does not know** (for example `tempt_range` on older versions) are simply not offered for that server.
- **Player-only attributes** (mining speed, interaction range, luck, attack speed, max absorption...) are never offered.
