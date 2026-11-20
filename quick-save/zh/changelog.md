> For AI agents: the complete documentation index is available at /quick-save/zh/llms.txt, the full documentation bundle is available at /quick-save/zh/llms-full.txt.

# 更新日志

## \[1.0.3] `最新` — 2026-05-23

### 新增

- **`SaveDataAsync(T data)`** — 异步保存方法。基于 `File.WriteAllBytesAsync`，不阻塞主线程。
- **`LoadDataAsync()`** — 异步读取方法。在大容量存档或慢速存储环境（移动端）中防止掉帧。
- **`HasSaveData()`** — 在尝试读取前确认存档文件是否存在的方法。此前需要检查 `LoadData()` 返回值是否为 `null`。

### 修复

- **`Builder.UseVersion()` 被忽略的 Bug** — 修复了调用 `UseVersion(n)` 时设置的版本值在内部始终固定为 `0` 的问题。同时使用加密 + 版本管理时，存档文件路径会与预期不符。
- **`SaveData<T>` 类型参数遮蔽** — 修复了可以序列化与 `QuickSave<T>` 类泛型 `T` 不同类型的结构性 Bug。
- **改进 `LoadData()` 的错误区分** — 文件不存在时返回 `null`，反序列化失败时抛出 `InvalidDataException`，从而明确区分两种情况。

### 性能

- **保存目录创建优化** — 改进了每次调用都执行 `Directory.Exists` 的结构。现在仅在 `Build()` 时检查并创建一次目录，之后缓存文件路径。

## \[1.0.2] — 2026-05-16

### 新增

- **`DeleteData()`** — 在运行时直接删除存档文件（`.acqs`）的方法。文件不存在时也不会抛出异常。
- **编辑器菜单 `Achieve > Delete Save`** — 一次性删除 `quicksave/` 目录中所有 `.acqs` 文件的工具。删除前会显示确认对话框。

## \[1.0.0] — 2024-01-01

### 新增

- 包首次发布
- **`SaveData(T data)`** — 基于 MemoryPack 的二进制序列化保存
- **`LoadData()`** — 二进制文件的反序列化读取
- 保存到 `Application.persistentDataPath/quicksave/`，扩展名为 `.acqs`
- **加密选项** — 通过 `USE_ENCRYPT` define 与 DataProtector 联动支持 AES 加密
- **版本管理** — 用 `UseVersion(int)` 在文件名中附加版本号
- **Builder 模式** — 用 `QuickSave<T>.Builder` 构建实例
