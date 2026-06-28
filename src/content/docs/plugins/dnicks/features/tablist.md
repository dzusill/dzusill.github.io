---
title: "The Tab List"
description: "When surfaces.tablist is enabled, dNicks sets each player's tab-list name (playerListName) to their rendered nick, so the gradient shows when you hold Tab."
---

When `surfaces.tablist` is enabled, dNicks sets each player's tab-list name (`playerListName`) to their rendered nick, so the gradient shows when you hold **Tab**.

```yml
surfaces:
  tablist: true
```

## With or without the TAB plugin

- **No TAB plugin (default):** leave `tablist: true`. dNicks owns the tab list directly and renders the gradient there.
- **TAB plugin installed:** the TAB plugin controls the tab list via packets and will fight a second owner. Set `tablist: false` and point TAB at the dNicks placeholder instead:

  ```yml
  # TAB groups.yml / users.yml
  customtabname: "%dnicks_name%"
  ```

  (Needs PlaceholderAPI.) dNicks stays the source of truth; TAB just renders it. See [Integrations](/plugins/dnicks/integrations/).

## Prefixes & suffixes

dNicks only owns the **name** part of the tab entry. Rank prefixes/suffixes from your permissions or tab plugin still apply around it.
