> For AI agents: the complete documentation index is available at /data-protector/zh/llms.txt, the full documentation bundle is available at /data-protector/zh/llms-full.txt.

# 简介

Data Protector 在保存之前对 `byte[]` 和 `string` 数据进行压缩和加密，保护其不被外部轻易访问。

## 主要功能

- 对 `byte[]` 和 `string` 数据进行压缩和加密
- 加密使用由用户提供的 16 字节字符串密钥
- 通过生成并比较 `SHA256` 哈希值来检测文件是否被修改

## 工作原理

- 使用 `AES-128` 加密保障数据安全。
- 压缩由 C# 的 `GZipStream` 处理，高效利用存储空间。

## 后续步骤

- [快速开始](/data-protector/zh/getting-started.md) — 安装与基本用法
- [API](/data-protector/zh/api.md) — 完整 API 参考
