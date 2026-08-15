---
title: "Vanish"
description: "The level ladder, where it applies, why the tab-completion filter is server-wide, and how to check the integration actually took."
---

OberonStaff works with **PremiumVanish** and **SuperVanish**, which share an API, and falls back to the `vanished` metadata flag that **EssentialsX**, **VanishNoPacket** and **CMI** publish. Both are reached by reflection or plain Bukkit, so there is no dependency to install beyond the vanish plugin itself and no shaded copy of anything — see [Other vanish plugins](#other-vanish-plugins).

## Check it took — first thing you do

```
/oberonstaff status
```

```
Vanish: PremiumVanish (enabled: yes, 6 level(s))
```

**`none` means no vanish plugin was found.** On a server that runs one, the ladder is then doing nothing — and that looks exactly like it working, right up until somebody vanishes and gets seen.

This is why the status line exists.

## Why not the placeholder

The old script asked PlaceholderAPI for `%premiumvanish_isvanished%` and compared the answer to the string `"Yes"`. That breaks silently — by deciding **nobody is vanished** — if the expansion is missing, renamed, or ever returns a localised value.

OberonStaff asks the vanish plugin directly.

## The ladder

```yaml
Vanish:
  Enabled: true
  Levels:
    - Target: "pv.see.level6"
      Required: "pv.see.level100"
    - Target: "pv.see.level5"
      Required: "pv.see.level5"
    - Target: "pv.see.level4"
      Required: "pv.see.level4"
    # …
  Fallback-Required: "pv.see"
```

Read one rung as: *a vanished player holding `Target` can only be seen by somebody holding `Required`.*

**Highest rung first.** The first rung the vanished player holds decides, and it decides outright:

| Vanished player holds | Viewer holds | Sees them? |
|---|---|---|
| nothing | `pv.see` | ✅ via the fallback |
| nothing | nothing | ❌ |
| `pv.see.level3` | `pv.see` | ❌ — the rung is stricter than the fallback |
| `pv.see.level3` | `pv.see.level3` | ✅ |
| `pv.see.level6` | `pv.see.level6` | ❌ — the top rung needs `level100` |
| `pv.see.level6` | `pv.see.level100` | ✅ |

That "decides outright" behaviour is the point of the rungs: it is what lets senior staff hide from junior staff. A rung is not a lower bar than the fallback, it is a *different* bar.

The default list reproduces PremiumVanish's own levels. Change, add or delete rungs freely — `Vanish.Levels` is never merged back from the defaults.

## Where the ladder applies

Everywhere it should, which is the point:

| | What happens |
|---|---|
| **Teleports** | refused with "This player is not online" |
| **`/tp a b`** | **both** players are checked, not just the one being moved |
| **Tab completion** | vanished names are stripped from suggestions |

## The tab-completion filter is server-wide

This is deliberate and worth knowing about.

Vanish is only worth anything if it holds everywhere. A staff member hidden from the player list but suggested the moment somebody types `/msg ` is not hidden at all.

So the filter runs on `TabCompleteEvent`, for **every command on the server** — not just OberonStaff's own. Any suggestion that names an online player the sender cannot see is removed. Suggestions that are not player names are left alone, because a completion is just as likely to be a world, a warp or a number.

This is also the piece the old script meant to do and silently did not: it filtered a local variable it never filled, so the loop had nothing to walk.

Turn it off if you must:

```yaml
Vanish:
  Filter-Tab-Completion: false
```

The listener is not even registered when this is off, or when vanish is disabled — it would otherwise sit on every keystroke of every command deciding it has nothing to do.

## One message, on purpose

A player who cannot see a vanished target is told **"This player is not online"** — the same message a genuinely offline player gets, right down to `player-not-found` in `messages.yml` being the same text.

Keep them identical when you restyle. A distinct message tells the sender that somebody is hiding, which defeats the whole thing.

## The console always sees everyone

Console has no permissions to check, and hiding server output from an operator helps nobody.

## With no vanish plugin

Everyone is visible to everyone. That is correct rather than degraded — the ladder simply has nothing to act on.

You can also switch it off explicitly:

```yaml
Vanish:
  Enabled: false
```

## Other vanish plugins

There are two checks, tried in order.

**The PremiumVanish API**, which SuperVanish shares — same author, same `de.myzelyam` package, so one hook covers both. Preferred, because it answers from the plugin's own state.

**The `vanished` metadata flag**, which EssentialsX, VanishNoPacket, CMI and most others publish. Used when the API above is not on the server and something that might set the flag is installed.

`/oberonstaff status` names whichever took:

```
Vanish: PremiumVanish (enabled: yes, 6 level(s))
Vanish: metadata (enabled: yes, 6 level(s))
```

The metadata check is second rather than first because it is a convention, not a contract: a plugin is free not to set it. If `status` shows `metadata` and hidden players still read as visible, your vanish plugin is one of the few that does not — tell us and we will add a hook for it.

Either way the **levels come from permissions**, not from the vanish plugin. Which staff can see which hidden staff is decided by the ladder above, whichever check answered.
