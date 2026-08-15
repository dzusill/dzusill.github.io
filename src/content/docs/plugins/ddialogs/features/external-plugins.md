---
title: "Calling other plugins"
description: "[call] hands a form's answers to another plugin as data, and on-success decides what the player sees — plus how a plugin registers rows and handlers."
---

**dDialogs renders. It does not know what a ticket, a home or a warp is** — and it never will. The plugin that owns the data registers it here instead.

Three seams cover all of it:

| You want | Write |
|---|---|
| Rows another plugin supplies | `dynamic-list` / `dynamic-body` over a registered **source** |
| Fields decided at runtime | [`dynamic-inputs`](/plugins/ddialogs/features/dynamic-inputs) over a registered **source** |
| A form's answers handed back | `[call] <handler>` with **`on-success` / `on-failure`** |

## `[call]` in a file

```yaml
buttons:
  - label: "<green><b>Submit</b></green>"
    actions:
      - "[call] phalanx_ticket_create $(category)"
    on-success:
      - "[message] <green>Ticket <white>#$(result_number)</white> opened."
      - "[sound] entity.player.levelup"
    on-failure:
      - "[message] <red>$(result_error)"
      - "[sound] block.note_block.bass"
```

Everything after the handler's name is its argument, substituted like any other action — so `$(category)` arrives as the category the screen was opened with.

## Why not `[player] ticket create …`

Because it does not work, and it fails quietly.

A submitted value bound for a command is stripped of quotes, semicolons, backslashes and newlines, and cut at **256 characters** — a command line is exactly where an unsanitised value does damage. A paragraph answer may be a thousand characters with line breaks in it.

Values reach a handler **raw**. The map goes to a Java method, not to a command line, so there is nothing to break out of.

:::caution[This is the difference that matters]
`[player]` and `[console]` are for *doing something*. `[call]` is for *handing over data*. If your button is submitting a form, it wants `[call]` — the command route silently mangles long answers.
:::

## The outcome lists

The handler returns data, not messages. What the player sees is written in the file:

| Token | Where |
|---|---|
| `$(result_error)` | `on-failure` — the reason, whether that is a rejected field or the other plugin's own refusal |
| `$(result_<name>)` | `on-success` — whatever the handler returned, prefixed |

A handler returning `number` gives you `$(result_number)`. The prefix keeps a returned value from colliding with a field on the screen.

Because a button press closes the dialog, the outcome arrives as a chat message or a fresh screen — there is no spinner problem to solve.

## Rules the file has to follow

Both are caught at startup, not when a player clicks:

- **One `[call]` per button.** Two would leave `on-success` following whichever finished first — an outcome decided by timing rather than by anything written down. Two things to submit means two buttons, which is also how a player reads the screen.
- **`on-success` / `on-failure` need a `[call]`.** Without one, nothing would ever run them.

Anything written *after* a `[call]` in the same list never runs. The handler is still working; what comes next belongs in an outcome list.

:::note[A handler nobody registered]
The player is told it is unavailable and the console names it, exactly like a button pointing at a command no plugin provides. The dialog stays open rather than closing on a failure nobody saw.
:::

## What it costs in the pause menu

A `[call]` button is **dropped** from the baked pause-screen copy. That screen is registry data baked once for everyone, with no way back into the plugin and no answers to hand over. See [the pause menu page](/plugins/ddialogs/features/pause-menu).

---

## For plugin authors

Everything below is Java, in the plugin that owns the data.

### Registering rows

```java
DDialogsApi.registerSource("faction_warps", viewer -> warps.stream()
        .map(w -> Map.of("warp_name", w.getName(), "warp_world", w.getWorld()))
        .toList());
```

Each map is one row; its keys become `$(key)` tokens in the template.

When the rows depend on what the player picked, take the [parameters](/plugins/ddialogs/features/parameters) too:

```java
DDialogsApi.registerSource("phalanx_ticket_questions",
        (viewer, params) -> questionsOf(params.get("category")));
```

Two lambdas, two interfaces — `DialogSource` and `DialogSource.WithParams`. A lambda can only implement the one abstract method an interface has, and leaving `rows(Player)` as that method is what keeps every source written before parameters existed compiling untouched.

:::danger[A source must never block]
It is read **on the main thread, every time the dialog opens**. There is no caching layer and no async path. A source that makes an HTTP request or a database round trip freezes the server for as long as it takes — and on a bad day, for as long as the timeout.

Serve it from memory and refresh in the background. The first open showing slightly stale data beats a server that stutters.
:::

Other things worth knowing:

- rows are capped at **60** — a full server would otherwise draw a few hundred buttons
- a source that throws, or returns `null`, is treated as empty rather than taking the dialog down
- an unregistered name is not fatal: that section renders empty and the console names it
- registrations are dropped when dDialogs disables, so register from your own `onEnable`

### Registering a handler

```java
DDialogsApi.registerAction("phalanx_ticket_create", (player, argument, values, params) -> {
    var created = api.createTicket(player.getUniqueId(), argument, values);
    return created.ok()
            ? Result.success(Map.of("number", String.valueOf(created.number())))
            : Result.error(created.error());
});
```

| Parameter | What it holds |
|---|---|
| `argument` | whatever was written after the handler's name, already substituted |
| `values` | every field on the screen, **raw** — not sanitised, not truncated |
| `params` | the screen's parameters, plus a snapshot of the player |

Handlers run **off the main thread by default**, because the reason to write one is nearly always a call that blocks. Override `async()` to `false` if yours genuinely does not.

:::caution[A handler must not touch the player]
By the time it runs it is on another thread. The facts it would want are in `params` already — `player_name`, `player_uuid`, `player_world`, `player_x`, `player_y`, `player_z`, `player_gamemode` — snapshotted on the player's own thread before the handler was dispatched.
:::

Outcome actions run back on the player's thread, so a handler never has to schedule anything itself.

Name your handlers with a prefix. The name is what an admin writes in YAML, so it is part of your plugin's surface — two plugins will eventually both want `create`.

### Building against it

```xml
<dependency>
    <groupId>me.dzusill</groupId>
    <artifactId>dDialogs</artifactId>
    <version>1.0.0</version>
    <scope>provided</scope>
    <optional>true</optional>
</dependency>
```

plus `softdepend: [dDialogs]` in your `plugin.yml`.

:::danger[Do not name a dDialogs class outside a guard]
These classes ship inside the dDialogs jar, and the JVM links a class the first time it is used. On a server without dDialogs, naming one is a `NoClassDefFoundError` at the moment the enclosing class is verified — not at the call.

Put the registration in a class of its own, and reach it only after `isPluginEnabled("dDialogs")`. The bridge class that does the checking must not mention a dDialogs type itself.
:::

## Where next

- [Dialog parameters](/plugins/ddialogs/features/parameters) — carrying a selection between screens
- [Dynamic inputs](/plugins/ddialogs/features/dynamic-inputs) — fields built from a source
- [Dynamic lists](/plugins/ddialogs/features/dynamic-lists) — buttons built from a source
- Examples 23–26 are a full ticket flow, plus a suggestion and report form
