---
title: AbstractFactory
---

# Abstract Factory

## パターン一言説明
関連するオブジェクト群を、具体型に依存せず生成するパターンです。

## Unity でよく使う状況
- プラットフォームごとのサービス一式を丸ごと差し替えたいとき
- テスト用製品群を分離したいとき

## 構成要素（役割）
- Abstract Factory
- Concrete Factory
- Abstract Product

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
public interface IPlatformServiceFactory
{
    ILoginService CreateLoginService();
    IStoreService CreateStoreService();
}

public sealed class MobilePlatformServiceFactory : IPlatformServiceFactory
{
    public ILoginService CreateLoginService() => new MobileLoginService();
    public IStoreService CreateStoreService() => new MobileStoreService();
}

public sealed class PcPlatformServiceFactory : IPlatformServiceFactory
{
    public ILoginService CreateLoginService() => new PcLoginService();
    public IStoreService CreateStoreService() => new PcStoreService();
}
```

## 長所
- オブジェクト生成責務が整理され、依存関係の管理がしやすくなります。
- 環境や状況ごとに生成方針を柔軟に変えられます。

## 注意点
- 単純な問題に過度な生成抽象化を入れないようにする必要があります。
- 生成ルールが増えるほど、文書とテストの同期が重要になります。

## 動作ダイアグラム

プラットフォーム別の製品群を同じインターフェースの裏で生成する流れです。

```d2 title="Abstract Factory の流れ"
direction: right

client: "Game Client"
factory_selector: "Platform Factory"
mobile_factory: "MobileFactory"
pc_factory: "PcFactory"
login: "LoginService"
store: "StoreService"

client -> factory_selector: "runtime choice"
factory_selector -> mobile_factory: "mobile"
factory_selector -> pc_factory: "pc"
mobile_factory -> login
mobile_factory -> store
pc_factory -> login
pc_factory -> store
```
