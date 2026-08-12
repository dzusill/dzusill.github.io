---
title: "Milestones & Ranks"
description: "A milestone is a kill count that runs commands. That's the whole feature — and because it runs commands, it works with any permissions, economy, crate or…"
---

A milestone is a kill count that runs commands. That's the whole feature — and because it runs *commands*, it works with any permissions, economy, crate or broadcast plugin you already have.

## Defining them

```yaml
Milestones:
  Enabled: true
  Default-Rank: "Rookie"
  Backfill: false
  Broadcast: true
  Tiers:
    '5':
      Rank: "Bandit"
      Commands:
        - "rank %player% bandit"
    '10':
      Rank: "Raider"
      Commands:
        - "rank %player% raider"
        - "give %player% diamond 5"
    '25':
      Rank: "Slayer"
      Commands:
        - "rank %player% slayer"
        - "eco give %player% 5000"
    '50':
      Rank: "Warlord"
      Broadcast: true
      Commands:
        - "rank %player% warlord"
```

There is no limit on how many tiers you add. Keys must be whole numbers and are quoted (`'5'`, not `5`) so YAML keeps them as keys rather than turning them into integers — both work, quoting is just tidier.

A key that isn't a number is skipped with the rest of the file left working, so one typo can't disable every reward.

### Per tier

| Key | | |
|---|---|---|
| `Rank` | The display name. Surfaced by `%killtracker_rank%`. | Defaults to `Default-Rank` |
| `Commands` | Console commands to run. A leading `/` is optional. | Empty = nothing runs |
| `Broadcast` | Announce this one server-wide. | Falls back to `Milestones.Broadcast` |

### Command tokens

| Token | Becomes |
|---|---|
| `%player%` | The player's name |
| `%uuid%` | Their UUID |
| `%kills%` | Their kill count at the moment the milestone fired |
| `%milestone%` | The threshold (`25`) |
| `%rank%` | The tier's `Rank` value |

Commands run **from the console**, so they have full permissions. Each one runs inside its own error guard — a broken command logs a warning and the rest of the tier still runs.

## A milestone never fires twice

This is the part that matters. The highest awarded threshold is **stored per player**, on disk, alongside their kill count. It is not recalculated from the kill total.

That means:

- A server restart doesn't re-run every reward.
- A relog doesn't.
- `/killtracker reload` doesn't.
- Restoring a backup of `kills.yml` doesn't.

Without this, every restart would re-rank your entire playerbase.

## Adding a tier later

The awkward case: your server has been running for months, players have hundreds of kills, and now you add a `'15'` tier. Should everyone above 15 kills get it?

```yaml
Milestones:
  Backfill: false
```

| | What happens |
|---|---|
| `false` *(default)* | The new tier is absorbed silently. Nobody's commands run. Only players who cross 15 kills **from now on** get it. |
| `true` | Players above 15 kills catch up on their next kill — the commands run for real. |

`false` is the default because the alternative, on a server with 200 active players, is 200 rank commands firing over the next hour with no warning.

> If you want to grant a new tier to existing players deliberately, set `Backfill: true`, reload, let it settle, then set it back to `false`.

## Skipped tiers are caught up

Backfill is only about tiers added *below* someone's existing total. A player who jumps several tiers at once in normal play always gets all of them:

```
Player at 4 kills → admin runs /killtracker add Steve 21 → now at 25
Milestones 5, 10 and 25 all fire, in order.
```

## Ranks

`Rank` is a label, not a permission group. dKillTracker never assigns a permission itself — the `rank %player% bandit` command in your config does that, via LuckPerms or whatever you use.

`%killtracker_rank%` reads the **last awarded** milestone, not the raw kill count. That's deliberate: it can never disagree with the last rank command that actually ran. If a player has 100 kills but `Backfill: false` meant only the tier-5 command has fired, they show as `Bandit` — which is the truth of what's in the permissions plugin.

Players below the first tier show `Default-Rank`.

## Exempting staff and donor ranks

`rank %player% bandit` **replaces** a group in most permission plugins. So the moment a moderator gets their fifth kill, the tier-5 command fires, their staff group is swapped for Bandit, and the rank they had is gone.

Give those groups the exemption:

```
lp group mod permission set killtracker.bypass.milestones true
lp group admin permission set killtracker.bypass.milestones true
lp group vip permission set killtracker.bypass.milestones true
```

| | |
|---|---|
| Kills | Still counted. They stay on `/killtop` and every placeholder keeps working. |
| Reward commands | Never run. Their group is never touched. |
| `milestone-reached` / broadcast | Never sent. |
| `%killtracker_rank%` | Stays at `Default-Rank` — no milestone was ever awarded, so there is nothing else honest to show. |

The node is **not** part of `killtracker.*`, on purpose: exemption belongs to a rank, not to a permission level, and plenty of servers want their ops ranking up normally. Grant it explicitly.

It is also safe to remove later. Their watermark never moved while exempt, but the `Backfill: false` rule still applies — the tiers they passed as staff are absorbed silently on their next kill, so demoting someone doesn't dump five rank commands on them at once.

> Also worth exempting: the *victim* side. `killtracker.bypass.victim` stops players farming a staff member who has to stand at spawn. The two nodes are independent.

## Announcements

```yaml
Milestones:
  Broadcast: true
```

Server-wide announcement when someone hits a tier, using `milestone-broadcast` from `messages.yml`. Individual tiers override it with their own `Broadcast:` key — a common setup is global `false` with `Broadcast: true` on the big ones only, so the chat isn't full of "Steve reached 5 kills".

The player themselves always gets `milestone-reached`.

## Admin control

| | |
|---|---|
| `/killtracker add <player> <n>` | Adds kills and **fires** every milestone crossed. Target must be online. |
| `/killtracker set <player> <n>` | Sets the count and recomputes the watermark. Does **not** fire commands. |
| `/killtracker reset <player>` | Wipes everything including the watermark — milestones can fire again from scratch. |

Lowering someone with `set` moves their watermark down too, so climbing back re-earns the tiers. That is what "reset a player's progress" should mean.

## Turning it off

```yaml
Milestones:
  Enabled: false
```

Kills are still tracked and all placeholders still work; nothing fires. `%killtracker_rank%` returns `Default-Rank` for everyone.
