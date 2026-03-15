---
title: Proxy
---

# Proxy

## パターン一言説明
実オブジェクトの前に代理オブジェクトを置き、制御、遅延ロード、キャッシュを担当させるパターンです。

## Unity でよく使う状況
- 重いリソースを遅延ロードしたいとき
- リモート呼び出しの前段でキャッシュや権限確認を行いたいとき

## 構成要素（役割）
- Subject
- Real Subject
- Proxy

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using System.Collections.Generic;

public interface IRemoteInventoryService
{
    IReadOnlyList<string> GetItemIds();
}

public sealed class CachingInventoryProxy : IRemoteInventoryService
{
    private readonly IRemoteInventoryService remoteService;
    private IReadOnlyList<string> cachedItemIds;

    public CachingInventoryProxy(IRemoteInventoryService remoteService)
    {
        this.remoteService = remoteService;
    }

    public IReadOnlyList<string> GetItemIds()
    {
        cachedItemIds ??= remoteService.GetItemIds();
        return cachedItemIds;
    }
}
```

## 長所
- モジュール境界が明確になり、結合度を下げられます。
- 既存コードを変更せずに機能拡張や統合がしやすくなります。

## 注意点
- ラッパー層が深くなりすぎるとデバッグが難しくなります。
- 責務境界が曖昧にならないよう、インターフェースは小さく保つべきです。

## 動作ダイアグラム

代理オブジェクトがアクセス制御、遅延ロード、キャッシュを担当する流れです。

```d2 title="Proxy の流れ"
direction: right

client: "Client"
proxy: "TextureProxy"
check_cache: "Loaded?"
real: "RealTexture"
result: "Texture Data"

client -> proxy: "Draw()"
proxy -> check_cache
check_cache -> real: "no"
real -> proxy: "load once"
check_cache -> proxy: "yes"
proxy -> result: "forward/cached"
result -> client
```
