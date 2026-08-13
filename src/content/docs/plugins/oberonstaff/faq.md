---
title: "FAQ & Troubleshooting"
description: "Everyone shows as Member, vanished players are visible, /tp does nothing — the usual causes and the setting that fixes each one."
---

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

Fixed. This was ours, and it looked like a permission problem because of how it failed.

`/tp` is a name vanilla owns, so this plugin takes it on use — the command runs as ours. Completion took a different
route: newer Paper hands vanilla commands out owned by an *internal* plugin, which the ownership test read as a third
party's, so completion was declined and fell through to vanilla's own command node. That node requires operator.
Admins therefore got vanilla's suggestions and everybody else got silence.

Execution and completion now use the same rule: if we run the command, we complete it.

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
