---
title: "Search"
description: "Find a warp by name without scrolling pages. Enable with Settings.Search.Enabled."
---

Find a warp by name without scrolling pages. Enable with `Settings.Search.Enabled`.

## Using search

- **Command** — `/warp search <query>` jumps straight to the results, or `/warp search` opens a prompt.
- **Menu** — the **Search** tab opens a chat (or anvil) prompt; type your query, or type `cancel` to abort.

Results open in a paginated menu titled with your query. Matching is by warp name.

```
/warp search shop
```

## Prompt text

The prompt strings are configurable:

- `Search.Prompt` in [messages.yml](/plugins/warpgui/configuration/messages/) — the chat instruction.
- `GUI.SearchPromptTitle` / `GUI.SearchPromptDefault` in [config.yml](/plugins/warpgui/configuration/config/) — the anvil prompt title and placeholder text.

> If the feature is disabled, `/warp search` replies *"The search feature is disabled."*
