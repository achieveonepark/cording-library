> For AI agents: the complete documentation index is available at /npc-mentality/ja/llms.txt, the full documentation bundle is available at /npc-mentality/ja/llms-full.txt.

# 概要

**NPC Mentality** は、Unityゲームの NPC を生きているように感じさせる 7 つの AI システムパッケージです。

## なぜ作ったのか

従来の NPC は次の 3 パターンのどれかです。

- 目標地点へ移動する
- あらかじめ用意されたセリフを出力する
- プレイヤーに向かって突進する

NPC Mentality はここに **記憶・関係・感情・時間** のレイヤーを追加します。プレイヤーが商人の物を盗めば商人が覚えており、親しい隣人に噂が広がり、村の雰囲気が変わります。コード 1 行でです。

## システム構成

| # | システム                                                 | 主な役割                |
| - | ---------------------------------------------------- | ------------------- |
| 1 | [NPC記憶](/npc-mentality/ja/usage/memory.md)           | プレイヤー行動の蓄積、態度の計算    |
| 2 | [関係伝染](/npc-mentality/ja/usage/relationship.md)      | 友人ネットワークを通じた感情の伝播   |
| 3 | [群衆AI](/npc-mentality/ja/usage/crowd-ai.md)          | NavMeshベースの自律的な群衆行動 |
| 4 | [感情アニメーション](/npc-mentality/ja/usage/emotion.md)      | 感情 → 速度・アニメーター自動連動  |
| 5 | [クエスト生成](/npc-mentality/ja/usage/quest-generator.md) | 行動ベースのクエスト自動生成      |
| 6 | [時間世界](/npc-mentality/ja/usage/world-time.md)        | ゲーム内時間スケジュール管理      |
| 7 | [噂システム](/npc-mentality/ja/usage/rumor.md)            | NPC間の情報伝播と変形        |

## 要件

- **Unity** 2021.3 LTS 以上
- **NavMesh** — 群衆AI・感情アニメーション使用時
- **.NET Standard 2.1**
