> For AI agents: the complete documentation index is available at /quick-save/en/llms.txt, the full documentation bundle is available at /quick-save/en/llms-full.txt.

# Changelog

## \[1.0.3] `latest` — 2026-05-23

### Added

- **`SaveDataAsync(T data)`** — Async save method using `File.WriteAllBytesAsync`. Prevents blocking the main thread during file I/O.
- **`LoadDataAsync()`** — Async load method. Avoids frame drops on large save files or slow storage (especially mobile).
- **`HasSaveData()`** — Check whether a save file exists before attempting to load. Previously, you had to call `LoadData()` and check for `null`.

### Fixed

- **`Builder.UseVersion()` ignored bug** — When `UseVersion(n)` was called, the version value was silently hardcoded to `0` internally. This caused save files to be created at the wrong path when using encryption with versioning.
- **`SaveData<T>` type parameter shadowing** — A structural bug that allowed serializing a different type than the class-level `T` in `QuickSave<T>`. For example, passing a `string` to a `QuickSave<MyData>` instance compiled without error.
- **`LoadData()` error distinction** — Previously, a missing file and a corrupted file were handled ambiguously. Now a missing file returns `null`, while a deserialization failure throws `InvalidDataException`, making the two cases clearly distinguishable.

### Performance

- **Save directory creation optimized** — Previously, `Directory.Exists` was called on every `SaveData`, `LoadData`, and `DeleteData` call. Now the directory is checked and created exactly once at `Build()` time, and the file path is cached in `_filePath`.

***

## \[1.0.2] — 2026-05-16

### Added

- **`DeleteData()`** — Delete the save file (`.acqs`) at runtime. Does not throw if the file doesn't exist.
- **Editor menu `Achieve > Delete Save`** — Unity Editor utility to batch-delete all `.acqs` files in the `quicksave/` directory. Shows a confirmation dialog with the file count and path before deleting.

***

## \[1.0.0] — 2024-01-01

### Added

- Initial package release
- **`SaveData(T data)`** — Binary serialization using MemoryPack
- **`LoadData()`** — Binary deserialization and load
- Save files stored as `.acqs` under `Application.persistentDataPath/quicksave/`
- **Encryption option** — AES encryption via DataProtector integration (`USE_ENCRYPT` define)
- **Versioning** — Append version numbers to file names with `UseVersion(int)` for multi-version save management
- **Builder pattern** — Fluent instance configuration via `QuickSave<T>.Builder`
