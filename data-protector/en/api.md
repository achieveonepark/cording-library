> For AI agents: the complete documentation index is available at /data-protector/en/llms.txt, the full documentation bundle is available at /data-protector/en/llms-full.txt.

# API

## DataProtector

### Encrypt

Returns the result of compressing and then encrypting the data.

```csharp
byte[] DataProtector.Encrypt(byte[] data, string key);
```

### Decrypt

Returns the result of decrypting and then decompressing the data.

```csharp
byte[] DataProtector.Decrypt(byte[] data, string key);
```

## HashChecker

### ComputeHash

Extracts the hash value of the encrypted data.

```csharp
string HashChecker.ComputeHash(byte[] data);
```

### ValidateHash

Compares two hash values.

```csharp
bool HashChecker.ValidateHash(string hashA, string hashB);
```
