---
title: "Dynamic inputs"
description: "Form fields decided when the screen opens, one per row a plugin supplies — the dynamic-list model applied to inputs."
---

**`dynamic-inputs` builds fields from live data**, the same way `dynamic-list` builds buttons.

A static `inputs:` list is read once, when the file loads. That is fine when the questions never change. It is no use when the questions come from somewhere else at runtime — a support category's questions, a form an admin edits on a website, anything the YAML author cannot know.

## The shape

```yaml
dynamic-inputs:
  source: phalanx_ticket_questions
  template:
    key: "$(q_key)"
    label: "$(q_text)"
    max-length: "$(q_max)"
    height: "$(q_height)"
    required: "$(q_required)"
    min-length: "$(q_min_length)"
    width: 320
```

One field per row. Generated fields are appended **after** any static `inputs:`, so a form can pair a fixed subject line with a category's questions underneath it.

The `source` is a name a plugin registered — see [calling other plugins](/plugins/ddialogs/features/external-plugins). It is asked with the [parameters](/plugins/ddialogs/features/parameters) the screen was opened with, which is how it knows *which* category's questions to hand over.

## The template is the mapping layer

The plugin translates its own vocabulary into a dialog's, and the file just repeats the row. A source that knows about `SHORT` and `PARAGRAPH` hands over rows that already say `q_height: 100` or leave it out, so nothing in the YAML has to know either word.

That is why the template looks the way it does — every value is a token, and the plugin decides what fills it.

## A missing token means absent, not literal

This is the rule that makes a partly-filled template safe.

After substitution, a value still containing `$(` is treated as **not set at all**, so the field falls back to that key's default:

| Row supplies | Result |
|---|---|
| `q_height: 100` | a multi-line box a hundred tall |
| no `q_height` at all | a single-line field |
| no `q_max` | the 128-character default |

A short question whose row carries no `q_height` gets a one-line field, not a broken one.

:::note[Numbers may arrive as text]
A row is `Map<String,String>`, so `max-length: "1000"` is a string. It is read as a thousand anyway — treating it as absent would quietly cap every generated field at 128 characters, and a long answer would be truncated with nothing saying why.
:::

## required and min-length

Both are checked **before** a [`[call]`](/plugins/ddialogs/features/external-plugins) runs, while the player is still looking at the form. A violation skips the call and runs `on-failure` with the reason in `$(result_error)`.

```yaml
    template:
      key: "$(q_key)"
      label: "$(q_text)"
      required: "$(q_required)"
      min-length: "$(q_min_length)"
```

They work on static `inputs:` too:

```yaml
inputs:
  - key: reason
    label: "Why?"
    required: true
    min-length: 10
```

:::tip[This is often the only enforcement there is]
A plugin may read `required` off a website and pass it along without enforcing it anywhere itself. The dialog is then the first and last place an empty answer can be refused while the player can still fix it — after the screen closes it is a support ticket with nothing in it.
:::

## What gets skipped

Nothing here takes a screen down. Three things are dropped quietly, because each is visible immediately as a missing field:

- a row that produces no usable `key`
- a row whose values cannot make a valid field
- a generated field whose key **matches a static one** — the file's own input wins, since losing it to a row from another plugin would be a surprising way to break a form

## When the whole thing comes out empty

If the source returns rows and **none** of them become a field, the console says so once:

```
Dialog 'ticket-form' got 3 row(s) from its dynamic-inputs source but built
no fields from them. The template's tokens do not match the fields the
source supplies - check the $(names) in dynamic-inputs.template.
```

That is always the same fault: the file asks for `$(q_key)` and the rows carry `question_id`. Without the message the screen just opens with no fields on it, which reads as the source being empty and sends you looking in the wrong place.

## Load-time checks

Two things are rejected when the file loads rather than when a player opens it:

- `dynamic-inputs` with no `source`
- a `template` with no `key` — an input with no key is a field the player fills in and nothing ever reads

## Where next

- [Inputs](/plugins/ddialogs/features/inputs) — the four field types and everything a static form can do
- [Calling other plugins](/plugins/ddialogs/features/external-plugins) — where the rows come from, and how to submit the answers
- Examples 23 and 24 are a category picker and the form it opens
