> For AI agents: the complete documentation index is available at /data-protector/zh/llms.txt, the full documentation bundle is available at /data-protector/zh/llms-full.txt.

# API

## DataProtector

### Encrypt

返回对数据先压缩再加密后的结果。

```csharp
byte[] DataProtector.Encrypt(byte[] data, string key);
```

### Decrypt

返回对数据先解密再解压后的结果。

```csharp
byte[] DataProtector.Decrypt(byte[] data, string key);
```

## HashChecker

### ComputeHash

提取加密数据的哈希值。

```csharp
string HashChecker.ComputeHash(byte[] data);
```

### ValidateHash

比较两个哈希值。

```csharp
bool HashChecker.ValidateHash(string hashA, string hashB);
```
