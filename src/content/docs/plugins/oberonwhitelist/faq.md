---
title: "FAQ & Troubleshooting"
description: "The questions that come up in the first week: menus that stopped working, commands that will not tab-complete, and how to get back in when you lock yourself out."
---

## My menu buttons stopped working

The most common one. A menu button runs its command as the player, so under `strict` a command no rank grants is denied and the button silently does nothing.

```
/obw scan-dialogs
```

Paste the suggested entries into `execute-only`, reload, and they work again. Full explanation in [Menu & Dialog Plugins](/plugins/oberonwhitelist/features/menu-plugins/).

## The scan says a command would fail, but it belongs to staff

Then leave it out. Commands like `/back` or `/staffchat` are granted to a rank; a staff menu offering them is working correctly — staff can click them, ordinary players cannot.

Putting them in `execute-only` would grant them to *everyone*, because execute-only is not rank-aware. Hide the button from players who lack the rank in the menu plugin instead.

The scan reports these separately for exactly this reason, and never in the list to paste.

## A command is in the config but does not tab-complete

Check the startup log first:

```
[OberonWhitelist] Group command '/homes' is not registered by any plugin on this
server; it can never be suggested or run.
```

That means nothing on the server provides it — a typo, or a plugin that failed to load.

If there is no warning:

```
/obw check <player> /homes
```

If it says `Runs` but `Not suggested in tab`, the trace names the reason — usually the player lacking the command's own permission, which stops it being suggested even though the rank grants it.

## A player can run a command their rank does not have

Three possibilities, in order of likelihood:

1. They hold `oberonwhitelist.bypass` — check with `/obw check`, which reports `BYPASS` first.
2. The mode is `tab-only`, where an unlisted command typed anyway still runs. Only `blocked-commands` stops execution there.
3. The command is in `execute-only`, which grants to everyone.

## A player bought /fly but the whitelist blocks it

Ranks are not the only way to grant a command, but they are the only one checked by default. When the permission sits on the player rather than on a rank — a bought perk, a crate reward, a timed trial — turn on per-player perks:

```yaml
permission-grants:
  enabled: true
  commands:
    - /fly
```

Then `/obw reload`. The command now runs *and* tab-completes for anyone holding `essentials.fly`, whatever their rank.

Full behaviour, including why a command with no permission of its own is never granted this way, in [Per-Player Perks](/plugins/oberonwhitelist/features/permission-grants/).

## I am an operator and my commands are blocked

They should not be — operators bypass the whitelist by default. Check that `bypass.operators` has not been set to `false`:

```yaml
bypass:
  operators: true
```

Then `/obw reload`.

If it is already `true`, confirm you are actually op (`/obw check <you> <command>` reports `BYPASS` as the first line when you are). Note that being op in the server console is not the same as your in-game account being op.

## Do I have to reload after changing someone's rank?

With LuckPerms, no — the change applies immediately, including when you edit a group they inherit from.

Without LuckPerms, ranks come from permission nodes and the plugin has no event to listen for, so the change applies on their next login or after `/obw reload`.

## I locked myself out

Console is never filtered. From the server console:

```
lp user <you> permission set oberonwhitelist.bypass true
```

Or edit `config.yml` directly and restart. Give yourself the bypass *before* you start tightening ranks.

## Players still see /essentials:fly in tab completion

They should not — every namespaced spelling is stripped regardless of rank. If you are seeing it, the account holds `oberonwhitelist.bypass`, which skips filtering entirely.

## Does this hide my plugin list?

Largely, yes. `/pl`, `/version`, `/about`, `/icanhasbukkit`, `/paper`, `/timings` and `/spark` ship blocked, namespaced spellings are stripped from tab completion, and blocked commands answer identically to commands that do not exist.

What it cannot cover: plugins that announce themselves in chat, join messages, or resource-pack prompts. It closes the command-shaped holes.

## Can players still discover commands by guessing?

They get the same reply for a blocked command, a hidden one and one that was never installed, so guessing produces no information — see [One Indistinguishable Error](/plugins/oberonwhitelist/features/one-error/).

Two caveats worth knowing. A command that *runs* obviously reveals itself. And a plugin that replies before the whitelist sees the command can leak — if you run another command-inspecting plugin, make sure it defers to this one.

## Does it work on a proxy network?

It runs on the backend and filters what players type there.

Proxy-level commands (Velocity's `/server`, `/glist`) never reach a backend, so they cannot be filtered here — use the proxy's own permissions. `/velocity:callback` ships in `execute-only` because clickable messages need it.

## What about console and command blocks?

Never filtered. The whitelist applies to players only.

## Is there a performance cost?

A command lookup is a map read against a snapshot built at load time, and the tab list is filtered once per tree send rather than per keystroke. Group lookups are cached per player until they quit or you reload.

## Does it work with Folia?

Yes.

## Can I use MiniMessage in the messages?

Yes, and `&`-codes too — both work in `blocked-actions`, so a config carried over from another plugin needs no rewriting.

## What happens if config.yml has a mistake?

It loads anyway and reports the problem. A broken `extends` keeps whatever resolved cleanly; an unparseable action is skipped and the rest still run.

The one case worth watching for is an empty `blocked-actions`, which is reported at startup — a denial that produces no reply at all behaves differently from one that does, which is itself a signal.

## Updating breaks my group lists?

No. `groups`, `execute-only`, `blocked-commands` and `blocked-actions` are never merged from the shipped defaults, so a command you deleted stays deleted.
