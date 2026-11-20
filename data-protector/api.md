> For AI agents: the complete documentation index is available at /data-protector/llms.txt, the full documentation bundle is available at /data-protector/llms-full.txt.

# API

## DataProtector

### Encrypt

데이터를 압축한 뒤 암호화한 결과를 반환합니다.

```csharp
byte[] DataProtector.Encrypt(byte[] data, string key);
```

### Decrypt

데이터를 복호화한 뒤 압축을 해제한 결과를 반환합니다.

```csharp
byte[] DataProtector.Decrypt(byte[] data, string key);
```

## HashChecker

### ComputeHash

암호화된 데이터의 해시 값을 추출합니다.

```csharp
string HashChecker.ComputeHash(byte[] data);
```

### ValidateHash

두 해시 값을 비교합니다.

```csharp
bool HashChecker.ValidateHash(string hashA, string hashB);
```
