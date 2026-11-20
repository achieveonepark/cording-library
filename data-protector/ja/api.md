> For AI agents: the complete documentation index is available at /data-protector/ja/llms.txt, the full documentation bundle is available at /data-protector/ja/llms-full.txt.

# API

## DataProtector

### Encrypt

データを圧縮してから暗号化した結果を返します。

```csharp
byte[] DataProtector.Encrypt(byte[] data, string key);
```

### Decrypt

データを復号してから解凍した結果を返します。

```csharp
byte[] DataProtector.Decrypt(byte[] data, string key);
```

## HashChecker

### ComputeHash

暗号化されたデータのハッシュ値を抽出します。

```csharp
string HashChecker.ComputeHash(byte[] data);
```

### ValidateHash

2 つのハッシュ値を比較します。

```csharp
bool HashChecker.ValidateHash(string hashA, string hashB);
```
