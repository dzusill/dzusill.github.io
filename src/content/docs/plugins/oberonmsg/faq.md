---
title: "FAQ & Troubleshooting"
description: "/msg does nothing, vanished players are reachable, ignore lists reset — the usual causes and the setting that fixes each one."
---

## `/msg` does nothing, or runs EssentialsX's version

Two plugins registering the same command means load order decides which wins. Switch one off:

```yaml
Commands:
  msg: { Enabled: false }
```

or rename ours (`Name: pm`). Restart afterwards.

## Vanished players are still reachable

```
/oberonmsg status
```

**`Vanish: none`** means no vanish plugin was detected. OberonMSG supports PremiumVanish and SuperVanish; others are
not detected and the ladder then has nothing to act on.

If the integration is there, check the ladder — a viewer holding `pv.see` reaches plainly-vanished players by design,
and that is what `Fallback-Required` is for.

## Vanished players still appear in tab completion

`Vanish.Filter-Tab-Completion: true`, and **restart** — the listener is only registered at startup when both that and
`Vanish.Enabled` are on.

## No AFK note

```
/oberonmsg status
```

**`AFK: none`** means EssentialsX was not found. The note is a courtesy; messages are delivered either way.

## `/ignore` un-ignored somebody

That was the old script's behaviour. Here `/ignore` adds and `/unignore` removes, and each tells you which happened.
If you are seeing a toggle, you are still running the Skript.

## Ignoring somebody doesn't hide their public chat

`Ignore.Hide-Public-Chat: true` in `config.yml`, and **restart** — the listener is only registered at startup when it
is on.

Also check the player is not holding `oberonmsg.ignore.bypass`, which exempts them from being hidden.

## A player says they can't message staff

They probably ignored them. Ignoring somebody stops you messaging them too, and they are told to `/unignore` first —
that is deliberate, so it does not silently fail.

If it is the other way round, give the staff group `oberonmsg.ignore.bypass` so they cannot be ignored at all.

## Ignore lists reset every restart

`enabled: false` in `database.yml`, or the database failed to open. Check the console at startup:

```
[OberonMSG] Database is off; ignore lists and preferences will reset when the server restarts.
```

## `/r` forgets who I was talking to

Check `Reply.Timeout-Seconds` — 300 by default. Set it to `0` to never expire.

Note that reply targets are dropped when *you* disconnect, but not when the other person does, and not on join. The
old script cleared them on join, which is the bug this replaced.

## Social spy shows my own messages twice

It shouldn't — the two people in the conversation are excluded from the spy broadcast. If you can reproduce it,
please report it.

## My edited messages don't seem to save

The wording always survived — but `messages.yml` was being rewritten on **every start**, because one key
(`player-ambiguous`) was missing from the shipped defaults. The merge adds what is missing and then saves, and saving
reflows the whole document: comments, blank lines and wrapping all come back as the writer produces them rather than
as you typed them.

Fixed by shipping the missing key. A file with nothing missing is now left byte-for-byte alone.

If a specific message is still not what you configured, check you edited `messages.yml` and not `Formats` in
`config.yml` — the three private-message lines live there, not in `messages.yml`.

## Can `/msgtoggle` and `/socialspy` confirm above the hotbar?

Yes, and they do by default now. `Presentation.Categories.TOGGLE` ships as `ACTION_BAR` with a sound, and covers the
ignore confirmations too. See [Action bar, chat & sounds](/plugins/oberonmsg/features/presentation/).

## Are private messages logged?

**Not by default.** `Log.Enabled` is `false` in `config.yml`, deliberately: recording what players say in private is
a decision you should make knowingly and be able to tell your players about.

## Can players put colours in messages?

No. All three values — both names and the message — go in as literal text the parser never looks inside. Typing
`<red>hello` shows `<red>hello`.

## Does it work on Folia?

Yes, `folia-supported: true`.

## Where do I report a problem?

[github.com/dzusill](https://github.com/dzusill). Please include:

- Server software and version (`/version`)
- OberonMSG and DzusillCore versions
- The full output of `/oberonmsg status`
- The relevant part of `config.yml`
