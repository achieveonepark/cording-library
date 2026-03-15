---
title: Facade
---

# Facade

## パターン一言説明
複雑なサブシステムを単純な上位 API で包み、使いやすさを高めるパターンです。

## Unity でよく使う状況
- ゲーム起動手順を 1 つのメソッドで隠したいとき
- モジュール内部の詳細を外部へ隠したいとき

## 構成要素（役割）
- Facade
- Subsystem
- Client

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
public sealed class GameStartupFacade
{
    private readonly SaveSystem saveSystem = new();
    private readonly AudioSystem audioSystem = new();
    private readonly UiSystem uiSystem = new();

    public void StartGame()
    {
        saveSystem.Load();
        audioSystem.Initialize();
        uiSystem.OpenLobby();
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

複雑なサブシステム呼び出しを単一の入口へ単純化する流れです。

```d2 title="Facade の流れ"
direction: right

client: "Game Bootstrap"
facade: "StartGameFacade"
assets: "AssetLoader"
save: "SaveSystem"
network: "NetworkClient"
result: "Ready To Play"

client -> facade: "StartGame()"
facade -> assets: "load"
facade -> save: "restore"
facade -> network: "connect"
assets -> result
save -> result
network -> result
```
