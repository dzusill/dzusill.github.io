---
title: "FAQ & Troubleshooting"
description: "Everyone shows as Member, vanished players are visible, /tp does nothing — the usual causes and the setting that fixes each one."
---

## Players can hear when vanished staff teleport

They should not — the arrival sound is skipped when either player is vanished, by default. Check the setting has not been turned off:

```yaml
Teleport:
  Sound:
    Silent-When-Vanished: true
```

If it is on and players still hear it, check which vanish integration took:

```
/oberonstaff status
```

`Vanish: none` means the plugin does not know anybody is hidden, so nothing keyed on vanish works — not the sound, not the tab filter. See [Other vanish plugins](/plugins/oberonstaff/features/vanish/#other-vanish-plugins).

Note this covers the sound this plugin plays. A teleport also has its own particle effects and any sounds other plugins play, which are theirs to suppress.

## Everyone shows as "Member" in staff chat

No entry in `Ranks` matched. Two causes:

1. **Your permission plugin uses different node names.** The shipped list assumes `group.owner`, `group.admin` and so on. Check one:

   ```
   /lp user <someone> permission check group.admin
   ```

2. **You edited `Ranks` and left an entry without `Permission` or `Display`.** Those are skipped; the reload message tells you how many loaded.

## Everyone shows as the *lowest* rank

`Ranks` is in the wrong order. An owner usually also inherits `group.admin`, `group.mod` and `group.helper`, and the **first match wins** — so the highest rank has to be listed first.

## Vanished players are still visible

```
/oberonstaff status
```

**`Vanish: none`** means no vanish plugin was detected. OberonStaff supports PremiumVanish and SuperVanish; other vanish plugins are not detected and the ladder then has nothing to act on.

**`Vanish: PremiumVanish (enabled: no)`** means you set `Vanish.Enabled: false`.

If the integration is there and the ladder is on, check the permissions themselves — a viewer holding `pv.see` sees plainly-vanished players by design, and that is what `Fallback-Required` is for.

## Vanished players still appear in tab completion

`Vanish.Filter-Tab-Completion: true`, and **restart** — the listener is only registered at startup when both that and `Vanish.Enabled` are on. Turning it on with a reload does not create it.

## A junior mod can see a senior admin who is vanished

That is what the ladder is for, and it needs the rungs set up. A vanished player on no rung at all is visible to anyone with `Fallback-Required` (`pv.see`).

Give the senior staff a rung:

```
/lp group admin permission set pv.see.level4 true
```

Now only somebody with `pv.see.level4` can see them. See [Vanish](/plugins/oberonstaff/features/vanish/).

## `/tp` says "This player is not online" for someone who is

They are vanished above your level. The message is deliberately the same one a genuinely offline player gets — a distinct message would confirm that somebody invisible is on the server.

If that is wrong, either your ladder is stricter than you meant, or you are missing the permission the rung requires.

## `/tp` does nothing at all

Another plugin — usually EssentialsX — won the command registration. Two plugins registering `/tp` means load order decides.

Switch one off. In `config.yml`:

```yaml
Commands:
  tp: { Enabled: false }
```

or rename ours (`Name: stp`). Restart afterwards.

## `/tpo` is refused too

`/tpo` overrides `/tptoggle`, not permissions. You still need `oberonstaff.teleport.override` to run it at all.

## Teleport commands tab-complete for admins but not for staff

Fixed, and the reason is worth knowing because it explains why nothing on the server could fix it earlier.

A client only asks for suggestions on a command **its own command tree contains**, and the server filters that tree by
permission before sending it. Registering under `oberonstaff:tp` alone left the plain `/tp` pointing at vanilla's
node — which requires operator. So an admin's client had the node and asked (getting *vanilla's* suggestions, not
ours), and everybody else's client had nothing there and never sent a packet at all. No server-side handler can answer
a question that is never asked.

Command names are now taken in the command map rather than only rewritten at dispatch, which puts our node on the
plain name with **our** permission.

> A name another **plugin** owns is still only taken when you ask for it, with
> `Take-Name-From-Other-Plugins: true` on that command. Without it the other plugin keeps the name, deliberately — so
> load order never silently decides which one a server ends up with. This is the setting to use for `/tphere` against
> a tpa plugin.

**A name taken back after startup.** `/oberonstaff status` used to be able to show `/tp -> the server (taken on use)`
even with everything above configured correctly — some other plugin re-registered `/tp` *after* our own startup claim
ran, and a claim made once does not defend itself against a second claim made later. Execution kept working (the
`/tp` → `oberonstaff:tp` label rewrite is independent of who owns the plain name), so this only ever showed up as
tab-complete quietly breaking again some time after the server had already come up clean.

DzusillCore now checks command ownership on a repeating timer, not just once at startup, and re-sends a fresh command
tree to a player a moment after they join in case something took a name back before they connected. `(taken on use)`
in the status output means the fallback path is active for that command right now; it should self-correct within a
few seconds without needing a restart.

## `/tphere` makes no sound

Fixed. The arrival sound was played *to the moved player*, and `/tphere` moves somebody else — so the only person who
heard anything was the one who had just been pulled across the map, while the staff member watching them appear heard
nothing.

It is now played at the location the player lands, so everyone standing there hears it. `Teleport.Sound` controls it,
and it is on by default with `entity.enderman.teleport`.

## The toggle confirmation shows in chat *and* above the hotbar

Fixed, and it is now your choice. `Staff-Chat.Toggle-Action-Bar` sent both with no way to ask for one; it is replaced
by the `Presentation` block, where `TOGGLE` ships as `ACTION_BAR` only. Put it back in chat with
`Channel: CHAT`, or have both with `Channel: BOTH`. See
[Action bar, chat & sounds](/plugins/oberonstaff/features/presentation/).

## Staff chat messages have weird colours in them

They shouldn't — player text is inserted as literal characters and never parsed. If somebody typed `<red>` it shows as `<red>`.

If you are seeing *actual* colours from player input, that is a bug and worth reporting immediately.

## Staff chat mode resets when I relog

The database is off. Check `database.yml` and the console at startup:

```
[OberonStaff] Database is off; staff preferences will reset when the server restarts.
```

## `/oberonstaff log` is empty

Both of these have to be true:

- `Teleport.Log-Actions: true` in `config.yml`
- `enabled: true` in `database.yml`

The command says which is missing rather than showing an empty list.

## `/back` doesn't work after a restart

By design. `/back` locations live in memory only — a coordinate from a previous server session is more likely to be wrong than useful.

## `/back` doesn't work after dying

`Teleport.Back.Record-Deaths: true` in `config.yml`. It is on by default.

## Can I keep my old permission nodes?

Yes. Every command's `Permission` is in `config.yml`, so a server already permissioned with `teleport.use` and `staffchat.use` keeps working:

```yaml
Commands:
  tp:        { Permission: "teleport.use" }
  staffchat: { Permission: "staffchat.use" }
Staff-Chat:
  Permission: "staffchat.use"
```

Set both the command's permission and `Staff-Chat.Permission` — the first decides who can run the command, the second who **receives** staff chat.

## Does it work on Folia?

Yes, `folia-supported: true`. Teleports go through DzusillCore's Folia-aware scheduler.

## Where do I report a problem?

[github.com/dzusill](https://github.com/dzusill). Please include:

- Server software and version (`/version`)
- OberonStaff and DzusillCore versions
- The full output of `/oberonstaff status`
- The relevant part of `config.yml`
