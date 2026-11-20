> For AI agents: the complete documentation index is available at /AchEngine/ja/llms.txt, the full documentation bundle is available at /AchEngine/ja/llms-full.txt.

# HttpLink

`HttpLink` は UnityWebRequest をビルダーパターンでラップし、GET/POST、JSON、ヘッダー、タイムアウトを扱います。

```csharp
var result = await new HttpLink.Builder()
    .SetUrl("https://api.example.com/users/1")
    .AddHeader("Authorization", "Bearer token123")
    .SetTimeout(10)
    .GetAsync<UserData>();

bool success = await new HttpLink.Builder()
    .SetUrl("https://api.example.com/login")
    .SetJsonBody(json)
    .PostAsync();
```

`Build().SendAsync()` では `Success`、`Result`、`ReceiveDataString`、`ReceiveData`、`DownloadSize`、`DownloadProgress` を直接確認できます。`SetMethod` は GET と POST のみ対応し、JSON は Newtonsoft.Json を使います。
