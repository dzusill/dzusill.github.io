---
title: "The Statistics Website"
description: "What the plugin records in game becomes a public leaderboard, player and faction profiles, season"
---

What the plugin records in game becomes a public leaderboard, player and faction profiles, season
archives and shareable cards on your phalanx-mono site.

This page describes the website side. For the in-game half — what is tracked, how seasons work, and
the commands — see [Statistics & Seasons](/plugins/dfactions/features/statistics/).

## Why the split

Every scoring decision lives on the website, not in the plugin. That is deliberate:

- **The Minecraft server stays fast.** It records observations and hands them over. No rating maths
  ever runs on the server tick.
- **A past season can be corrected.** The plugin's log is append-only, so when a new exploit turns
  up, the same observations are replayed through better rules. Nothing is lost, so nothing is
  unfixable.
- **A cheater gets no feedback.** Their in-game numbers keep climbing normally; only their position
  on the site is affected, and nothing in game hints at why.

## Enabling it

Three steps, in order.

**1. Run the database migration** on your phalanx-mono deployment:

```bash
pnpm db:migrate:deploy
```

**2. Enable the module** for your tenant in the admin panel under **Modules** → *Season Statistics*.
Grant the `factionStats` permission to whichever role should handle the review queue
(**Roles** → the role → *Season Stats*).

**3. Turn on the push** in the plugin's `config.yml`:

```yaml
integrations:
  phalanx:
    stats:
      enabled: true
```

The plugin starts from the beginning of its local log, so everything recorded before you enabled
the push is uploaded too.

## What players see

### `/stats` — the leaderboard

Players and factions, for the running season or any past one. Sortable by rating, kills, best
streak or playtime; factions by value, kills, raids, defences, claims or power. Every control
writes to the URL, so a sorted view of a finished season is a shareable link.

> A row with **more kills sitting below one with fewer** is normal and expected. The board is
> ordered by skill rating, and kills are shown because they are the player's own honest total.

### `/stats/player/<name>` — a player profile

Rating and rank, kills, deaths, K/D, best streak, playtime, sessions and money earned for the
selected season.

Once a season has finished, the profile also shows **Season Wrapped** — a personal summary with the
final placing, a top-percent figure, and whoever the player fought most that season. It only
appears after the season closes; a wrapped for a season still running would be a half-told story.

### `/stats/faction/<name>` — a faction profile

The ten public metrics, plus the **value curve across the season**. The curve is the most useful
thing on the page: a closing number tells you what a faction is worth, but only the shape tells you
whether it is rising or collapsing — which is what a player actually wants to know before deciding
whom to join and whom to raid. It can also be switched to show power, claims or member count.

Leader-only figures (TNT detonated, blocks destroyed, time under raid, roster churn) are recorded
but deliberately kept off the public profile, where they would only dilute what matters.

Overclaims render as `n/a`. The server rejects claiming an already-claimed chunk, so there is
nothing to count — showing `0` would imply the faction had never suffered one.

### Share cards

Posting a profile link to Discord generates a branded image showing the headline figures and your
server's name. Every share puts the server in front of someone else's channel at no cost per
impression, which is the main reason profiles are public at all.

Set the name that appears on the card:

```
NEXT_PUBLIC_SERVER_NAME="Your Server"
```

Cards can be turned off per tenant in the module's configuration.

## What staff see

**Admin → Season Stats**, behind the `factionStats` permission.

### Pipeline health

Whether events are arriving, how many are waiting to be rated, and how many players and factions
are being tracked this season.

The panel calls out one failure explicitly, because it is invisible from the public board: events
still arriving while the rating engine has stopped. The leaderboard just goes quietly stale, so a
growing backlog next to a recent last-event time is flagged as its own warning.

### The review queue

Patterns that looked mechanical, with the numbers behind them: how many kills of one player, the
average gap between them, how regular those gaps were, and how many distinct locations.

Two things about this queue matter:

- **A flag is not an accusation.** It says a pattern looked repetitive. Two brothers on one
  connection genuinely playing together can produce the same shape.
- **Nothing is ever enforced automatically.** No page here bans, mutes or restricts anyone. Marking
  a flag *Acted on* records that staff acted through their normal channels — it does not itself do
  anything to the player. The player is never notified either way.

### Re-scoring a season

If the rules improve, a whole season can be recalculated from the original observations:

```
POST /api/v1/admin/faction-stats/seasons/<number>/requeue
```

Derived figures are cleared and rebuilt; the underlying event log is untouched. This is the
mechanism behind "if a new trick is discovered next month, we recalculate the past".

## How the ranking is computed

Three independent reductions apply to every kill, in order.

**Was it a real fight?** An opponent with no armour, who never fought back, or who is brand new
scores **zero** — neither player's rating moves. A fight over in under a second and a half is
discounted rather than erased, since a genuine ambush is fast too.

**How often has this exact pairing happened?** Value decays hyperbolically with the repeat count,
so a real rivalry still counts for something while bulk repetition does not:

| Kill of the same victim | Worth |
|---|---|
| 1st | 100% |
| 5th | 43% |
| 10th | 25% |
| 50th | 6% |
| 500th | 0.6% |

Five hundred kills of one player total roughly twenty kills' worth of value across a whole season.

> The repeat count is recomputed on the website, not taken from the plugin. The plugin's own
> counter lives in memory and resets when the server restarts, so trusting it would let a farmer
> clear their history by waiting for a reboot.

**How much was this win worth?** Standard Elo. A 400-point favourite is expected to win about 91%
of the time, so beating someone far weaker already moves the rating by a fraction of a point. Two
equally rated friends trading kills back and forth end exactly where they started — the pool is
conserved, so nothing can be minted by fighting each other.

### The repetition signal

Separately from scoring, pairings are watched for how mechanical they look, built from three things
that are hard to fake at once: how many kills, how regular the gaps are, and how few distinct
locations. A busy honest rivalry spread across the map at irregular times scores low even at
hundreds of kills; the same count in one chunk at a steady cadence does not.

Crossing the threshold raises a staff flag. It does not change the player's numbers, and it never
tells them.

### The economy

Valuable assets are tracked per item key, so a spawner passed between friendly factions produces a
matching negative and positive entry moments apart. Those are netted to zero, which is what stops
two factions inflating each other's worth by passing the same asset back and forth.

## API reference

The plugin pushes batches to:

```
POST {api-url}/api/v1/factions/stat-events
Authorization: Bearer <api-key>
X-Tenant-Slug: <tenant-slug>
X-Batch-Uid: <uuid>
```

Delivery is at-least-once — a batch whose response was lost is re-sent — so both the batch and each
individual event are deduplicated on arrival. A duplicate is a normal outcome, not an error.

The response optionally carries the ranking mirror, which is all the plugin ever learns:

```json
{
  "ok": true,
  "accepted": 500,
  "duplicates": 0,
  "leaderboard": [
    { "playerUuid": "...", "rankedRating": 1450, "rankedPosition": 2 }
  ],
  "factionLeaderboard": [
    { "factionId": "...", "rankedPosition": 1 }
  ]
}
```

There is no weight, no reason and no flag in that payload — by design.

### Public read endpoints

Unauthenticated, and safe to embed anywhere. None of them expose a weighting or a suspicion score.

| Endpoint | Returns |
|---|---|
| `GET /api/v1/factions/stats/seasons` | Every season, newest first |
| `GET /api/v1/factions/stats/leaderboard/players` | Paged player board (`season`, `page`, `pageSize`, `sort`, `q`) |
| `GET /api/v1/factions/stats/leaderboard/factions` | Paged faction board |
| `GET /api/v1/factions/stats/player/:name` | One player's season profile |
| `GET /api/v1/factions/stats/faction/:name` | One faction's profile, including the value curve |
| `GET /api/v1/factions/stats/wrapped/:name` | End-of-season personal summary |

`:name` accepts a name or a UUID, and `?season=<number>` selects a past season.

## Troubleshooting

**Nothing appears on the site.** Check `/fa stats debug` in game. If `Rows` is climbing but
`Pending push` never falls, the plugin cannot reach the API — verify `api-url`, `api-key` and that
`integrations.phalanx.stats.enabled` is `true`. A wrong key is retried forever rather than
discarded, so fixing it uploads the whole backlog.

**Everyone shows rating 1000 and rank `—`.** The rating engine has not run. It lives in the
phalanx-mono worker process — check that the worker is running, and look at the backlog figure on
the admin health panel.

**The board is stale but events are arriving.** Same cause. The admin health panel flags this
explicitly.

**A player's kills went up but their rank did not.** That is the system working as intended. See
[how the ranking stays honest](/plugins/dfactions/features/statistics/#how-the-ranking-stays-honest).
