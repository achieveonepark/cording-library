---
title: Steam
---
# Steam

Steam を連携するまでの内容を記録しました。

## Steam アカウントを作成する

- 作業を始める前に、Steam 開発者用アカウントが必要です。
- Steam クライアントをインストールしてログインします。テスト中はクライアントを常に起動しておく必要があります。

## Steamworks.NET
- Steam は Unity 向けの公式 SDK を提供していないため、C# 環境から Steamworks 機能を利用できるようにする Steamworks.NET パッケージを使用します。
- まずは [Steamworks.NET](https://github.com/rlabrecque/Steamworks.NET-Test) のテストリポジトリを見ると理解しやすいです。

## SteamManager.cs をプロジェクトに含める

### SteamManager とは？
- Unity アプリ起動時に Steamworks.NET の初期化と終了を管理し、毎フレーム Steam API のコールバックを処理します。
- Steamworks.NET の開発者が提供しているサンプルコードです。詳細は Steamworks.NET の SteamManager ドキュメントを参照してください。

### 使い方
- [SteamManager.cs](https://raw.githubusercontent.com/rlabrecque/SteamManager/master/SteamManager.cs) を `Assets` フォルダ内に配置します。
- SteamManager 内の `if (SteamAPI.RestartAppIfNecessary(AppId_t.Invalid))` の箇所に発行された AppId を入力します。
- 開始シーンに SteamManager コンポーネントを追加します。

## ビルドする

### 一般インストール設定
- Steam Client でゲームビルドをダウンロード・インストールした後に実行するファイル名を指定する必要があります。
- 対象 OS に合わせて設定します。
- 実行ファイル欄は Unity 側の製品名と必ず一致させてください。
  - `{Project Settings/Player/Product Name}.exe`

### Depot を追加する
1. SteamPipe/Depot に入り、下部の新しい Depot 追加ボタンを押します。
2. Depot 名を設定して確認します。最初の Depot なら通常 `appID + 1`、以降は最後に作成した Depot ID + 1 が初期値になります。
3. 作成した Depot を設定します。例として Windows 用と Mac 用を分けて作成できます。
4. 必ず保存してから、アプリ管理トップへ戻って次の項目を押します。
5. ストアパッケージのパッケージタイトルをクリックします。
6. 含まれる Depot 項目に、先ほど追加した Depot を登録すれば完了です。

### Branch を追加する
1. `新しいアプリブランチを作成` を選択し、作成するブランチ名を入力します。
2. 説明: このブランチをどう使うか。パスワード: 入力すると非公開、空欄なら公開テストです。
3. 更新をクリックすると新しいブランチが適用されます。

## Windows ビルド ...

## アップロード後の動作
1. アップロードしたビルドが正常に反映されたか確認します。
2. Steam クライアントを開き、ライブラリでテストクライアントを右クリックしてプロパティを開きます。
3. ベータタブに作成・アップロード済みのブランチがあるので、それを選択します。
4. 更新後、ゲームを起動します。
