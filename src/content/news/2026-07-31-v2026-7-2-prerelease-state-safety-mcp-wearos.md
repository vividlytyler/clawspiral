---
title: "OpenClaw 2026.7.2 Pre-Release: State Safety, Session Rewind, MCP Dashboards, Wear OS, and Native Local Inference"
description: "The newest OpenClaw pre-release adds quarantine-store state safety, session rewind and branching, interactive MCP app dashboards, a Wear OS companion, native meeting attendance, and guided local inference setup with llama.cpp."
pubDate: 2026-07-31
storyOfTheDay: true
---

OpenClaw's latest pre-release, **v2026.7.2**, is a significant reliability and capability upgrade that touches nearly every layer of the stack. Here's what's new.

## State Safety and Recovery

OpenClaw now protects persisted data through a **quarantine store** that survives primary-database damage. SQLite snapshots are crash-recoverable, filesystem publications are crash-durable, schema upgrades reject data loss, and a rollback-writer snapshot recovery mechanism handles corruption scenarios that would previously have required manual intervention.

## Durable Channel Delivery

Messages across Telegram, Signal, Slack, QQBot, Twitch, Synology Chat, Tlon, IRC, and Zalo User are now kept **recoverable across gateway restarts and local crashes** via a shared ingress drain and dead-letter recovery system.

## Session Rewind and Branching

Users can now **rewind or fork conversations from individual messages**, switch transcript branches across web and native apps, fork upstream Codex sessions, and restore prompt images after a fork. Branch-safe queued sends and stale-pane write rejection keep multi-branch sessions clean.

## Interactive MCP Apps and Dashboards

The MCP Apps system gains **ticketed hostable apps with bound tools, resources, and bounded context updates**. Apps can be opened from channel replies, pinned to durable dashboards, and declared directly by native plugins. The sandbox is hardened.

## Questions and Approvals Everywhere

Agents can now ask structured questions with option cards across web, channels, macOS, and native apps. Approvals gain **push notifications, history, fair queuing, headless resolution, Claude tool-request relay, reviewer detail, and clearer formatted prompts**.

## Meetings and Realtime Talk

OpenClaw can now **join Teams, Zoom, and Google Meet** calls via default-enabled meeting plugins, collecting durable transcripts. Realtime Talk adds OpenAI and Gemini video support plus GPT Live through Codex OAuth.

## Wear OS Companion

A new **Wear OS companion** app pairs via phone proxy and provides home-screen agent/session/model selection, realtime Talk controls, audio-reactive playback, and an instant-talk tile.

## Guided Local Inference Setup

Onboarding now detects local inference providers, guides users through **in-process llama.cpp/Gemma setup**, offers downloadable models from web and macOS, and includes an in-process RAM-gated llama.cpp path.

## New Models

The release also adds **Claude Opus 5**, **Kimi K3**, and **GPT Live through Codex OAuth** across the catalog and runtime.

---

*Source: [GitHub Releases – openclaw/openclaw](https://github.com/openclaw/openclaw/releases/tag/v2026.7.2)*
