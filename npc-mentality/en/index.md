> For AI agents: the complete documentation index is available at /npc-mentality/en/llms.txt, the full documentation bundle is available at /npc-mentality/en/llms-full.txt.

# Introduction

**NPC Mentality** is a Unity package with 7 AI systems that make NPCs feel alive.

## Why We Built This

Traditional NPCs follow one of three patterns:

- Move to a target point
- Output pre-written dialogue
- Rush toward the player

NPC Mentality adds layers of **memory, relationships, emotion, and time**. When a player steals from a merchant, the merchant remembers it, rumors spread to friendly neighbors, and the village atmosphere changes — all with a single line of code.

## Systems Overview

| # | System                                                            | Key Role                                          |
| - | ----------------------------------------------------------------- | ------------------------------------------------- |
| 1 | [NPC Memory](/npc-mentality/en/usage/memory.md)                   | Accumulate player actions, calculate attitude     |
| 2 | [Relationship Contagion](/npc-mentality/en/usage/relationship.md) | Spread emotions through friend networks           |
| 3 | [Crowd AI](/npc-mentality/en/usage/crowd-ai.md)                   | NavMesh-based autonomous crowd behavior           |
| 4 | [Emotion Animation](/npc-mentality/en/usage/emotion.md)           | Emotion → speed, animator, blink auto-sync        |
| 5 | [Quest Generator](/npc-mentality/en/usage/quest-generator.md)     | Behavior-driven automatic quest generation        |
| 6 | [World Time](/npc-mentality/en/usage/world-time.md)               | Game time schedule management                     |
| 7 | [Rumor System](/npc-mentality/en/usage/rumor.md)                  | Information propagation and mutation between NPCs |

## Requirements

- **Unity** 2021.3 LTS or higher
- **NavMesh** — required for Crowd AI and Emotion Animation
- **.NET Standard 2.1**
