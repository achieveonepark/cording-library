> For AI agents: the complete documentation index is available at /lite-db/en/llms.txt, the full documentation bundle is available at /lite-db/en/llms-full.txt.

# Introduction

LiteDB is a lightweight package that lets you treat a SQLite database as a read-only table data store in Unity projects. You can map static data that ships with your build — such as game balance data, quests, items, and localized text — to C# models and query it.

This package does not wrap sqlite-net or the SQLite Asset package. It provides a familiar interface like `SQLiteConnection`, `[Table]`, and `[PrimaryKey]`, but internally calls the native SQLite C API directly.

## Features

- Copies a DB file bundled in StreamingAssets to runtime storage and initializes it
- Single-record lookup by primary key
- Id-range queries, existence checks, and safe lookups
- CSV table insertion via the Editor CSV Importer
- Data model code generation based on CSV headers
- Localization helper

## Next steps

- [Getting Started](/lite-db/en/getting-started.md) — from installation to your first query
- [Usage](/lite-db/en/usage.md) — data models, CSV Importer, localization
- [API](/lite-db/en/api.md) — runtime API reference
