> For AI agents: the complete documentation index is available at /lite-db/zh/llms.txt, the full documentation bundle is available at /lite-db/zh/llms-full.txt.

# 简介

LiteDB 是一个轻量级包，让你在 Unity 项目中把 SQLite 数据库当作只读的表数据存储来使用。你可以把随构建打包的静态数据（如游戏数值数据、任务、道具、本地化文本）映射到 C# 模型并进行查询。

本包不封装 sqlite-net 或 SQLite Asset 包。它提供与 `SQLiteConnection`、`[Table]`、`[PrimaryKey]` 类似的熟悉接口，但内部直接调用原生 SQLite C API。

## 功能

- 将打包在 StreamingAssets 中的 DB 文件复制到运行时存储并初始化
- 基于主键的单条数据查询
- Id 范围查询、存在性检查与安全查询
- 通过编辑器 CSV Importer 插入 CSV 表
- 基于 CSV 表头生成数据模型代码
- 本地化辅助工具

## 后续步骤

- [快速开始](/lite-db/zh/getting-started.md) — 从安装到第一次查询
- [使用方法](/lite-db/zh/usage.md) — 数据模型、CSV Importer、本地化
- [API](/lite-db/zh/api.md) — 运行时 API 参考
