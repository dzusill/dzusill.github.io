---
title: "Search"
description: "Find a warp by name without scrolling pages. Enable with Settings.Search.Enabled."
---

Find a warp by name without scrolling pages. Enable with `Settings.Search.Enabled`.

## Using search

- **Command** — `/warp search <query>` jumps straight to the results, or `/warp search` opens a prompt.
- **Menu** — the **Search** tab opens an input box, prefilled and ready to type in. On servers or clients that can't draw one you're asked in chat instead; type your query there, or type `cancel` to abort (a chat prompt left unanswered for a minute expires on its own).

Results open in a paginated menu titled with your query. Matching is by warp name.

```
/warp search shop
```

## Prompt text

The prompt strings are configurable:

- `Search.Prompt` in [messages.yml](/plugins/warpgui/configuration/messages/) — the chat instruction.
- `GUI.SearchPromptTitle` / `GUI.SearchPromptDefault` in [config.yml](/plugins/warpgui/configuration/config/) — the input box's title and the text it starts with.

> If the feature is disabled, `/warp search` replies *"The search feature is disabled."*
