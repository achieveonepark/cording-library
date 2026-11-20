> For AI agents: the complete documentation index is available at /data-protector/en/llms.txt, the full documentation bundle is available at /data-protector/en/llms-full.txt.

# Introduction

Data Protector compresses and encrypts `byte[]` and `string` data before saving, protecting it from being easily accessed externally.

## Features

- Compression and encryption for `byte[]` and `string` data
- Encryption uses a 16-byte string key provided by the user
- Detects file changes by generating and comparing `SHA256` hash values

## How it works

- Uses `AES-128` encryption for data security.
- Compression is handled with C#'s `GZipStream` for efficient storage.

## Next steps

- [Getting Started](/data-protector/en/getting-started.md) — installation and basic usage
- [API](/data-protector/en/api.md) — full API reference
