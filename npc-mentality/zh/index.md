> For AI agents: the complete documentation index is available at /npc-mentality/zh/llms.txt, the full documentation bundle is available at /npc-mentality/zh/llms-full.txt.

# 简介

**NPC Mentality** 是一个 Unity 包，包含 7 个 AI 系统，让 NPC 感觉真实存在。

## 为什么要做这个

传统 NPC 遵循以下三种模式之一：

- 移动到目标点
- 输出预设对话
- 向玩家冲刺

NPC Mentality 在此基础上增加了**记忆、关系、情感、时间**层。当玩家从商人处偷窃时，商人会记住它，谣言会传播给亲近的邻居，整个村子的氛围都会改变——只需一行代码。

## 系统构成

| # | 系统                                                 | 核心作用             |
| - | -------------------------------------------------- | ---------------- |
| 1 | [NPC记忆](/npc-mentality/zh/usage/memory.md)         | 累积玩家行为，计算态度      |
| 2 | [关系传染](/npc-mentality/zh/usage/relationship.md)    | 通过朋友网络传播情感       |
| 3 | [群体AI](/npc-mentality/zh/usage/crowd-ai.md)        | 基于NavMesh的自主群体行为 |
| 4 | [情感动画](/npc-mentality/zh/usage/emotion.md)         | 情感 → 速度、动画器自动联动  |
| 5 | [任务生成](/npc-mentality/zh/usage/quest-generator.md) | 基于行为的自动任务生成      |
| 6 | [时间世界](/npc-mentality/zh/usage/world-time.md)      | 游戏时间调度管理         |
| 7 | [谣言系统](/npc-mentality/zh/usage/rumor.md)           | NPC间信息传播与变形      |

## 需求

- **Unity** 2021.3 LTS 或更高版本
- **NavMesh** — 使用群体AI和情感动画时需要
- **.NET Standard 2.1**
