---
title: "DzusillCore"
description: "DzusillCore is a reusable Paper plugin framework designed to eliminate boilerplate so that developers can focus on plugin logic rather than infrastructure.…"
---

**DzusillCore** is a reusable Paper plugin framework designed to eliminate boilerplate so that developers can focus on plugin logic rather than infrastructure. Whether you are building a simple utility plugin or a large, production-grade server feature set, the framework provides the same composable building blocks.

---

## Design philosophy

DzusillCore is built around four classic OOP pillars applied consistently across every subsystem:

| Principle | How it appears in the framework |
|---|---|
| **Abstraction** | `CorePlugin`, `AbstractModule`, `Menu`, `AbstractSqlRepository` — base classes that define shape, not content |
| **Inheritance** | Concrete plugins/modules/menus extend the abstract bases and override only what differs |
| **Polymorphism** | `DataStore`, `Database`, `ArgumentType`, `MenuTemplate` — uniform interfaces with interchangeable implementations |
| **Encapsulation** | `ServiceRegistry`, `HookManager`, `CommandRegistry` — internal wiring hidden behind clean APIs |

---

## Feature matrix

| Area | Key classes |
|---|---|
| Plugin bootstrap | `CorePlugin`, `ModuleManager`, `ServiceRegistry` |
| Configuration | `Config`, `AbstractConfig`, `ConfigManager` |
| Messages & colors | `MessageService`, `Placeholder`, `ColorUtils` (MiniMessage) |
| Commands | `CoreCommand`, `SubCommand`, `@CommandMeta`, `ArgumentType` built-ins |
| GUIs | `Menu`, `PaginatedMenu`, `MenuTemplate`, `MenuItem`, `PlayerMenuContext` |
| Events | `CoreListener`, `ListenerRegistry`, `@AutoRegister` |
| Optional integrations | `PluginHook`, `HookManager` (Vault, PlaceholderAPI, EssentialsX) |
| File storage | `DataStore`, `YamlDataStore` |
| SQL databases | `Database`, `DatabaseManager`, `AbstractSqlRepository`, `SqlDataStore` |
| Utilities | `ItemBuilder`, `CooldownManager`, `SchedulerService`, `LocationUtils`, `TimeUtils`, `NumberUtils`, `TextUtils` |
| Testing | MockBukkit + JUnit 5 + H2 in-memory |

---

## Version targets

| Requirement | Version |
|---|---|
| Minecraft / Paper API | 1.21.1 |
| Java | 21 |
| Maven | 3.8+ |

---

## Quick links

- [Getting Started](/plugins/dzusillcore/getting-started/requirements/)
- [Core Concepts](/plugins/dzusillcore/core-concepts/lifecycle/)
- [Commands](/plugins/dzusillcore/commands/overview/)
- [GUIs](/plugins/dzusillcore/guis/overview/)
- [Database](/plugins/dzusillcore/database/overview/)
- [Credits](/plugins/dzusillcore/credits/)
