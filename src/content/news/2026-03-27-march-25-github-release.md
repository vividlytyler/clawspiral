---
title: "March 25 GitHub Release: v2026.3.1 Features Land Stable"
description: "Gateway/OpenAI compatibility, Microsoft Teams SDK migration, skills one-click install, Docker container flag, Discord auto-threads, and Android node expansion all ship to stable."
pubDate: 2026-03-27
---

The March 25 GitHub release shipped several features to stable:

- **Gateway/OpenAI compatibility** — `/v1/models` and `/v1/embeddings` endpoints added, plus passthrough for explicit model overrides. Broadens RAG and client compatibility
- **Microsoft Teams SDK migration** — now uses the official Teams SDK with streaming replies, welcome cards, prompt starters, typing indicators, and native AI labeling
- **Skills one-click install** — bundled skills (coding-agent, gh-issues, openai-whisper-api, session-logs, tmux, trello, weather) now offer dependency installation automatically when requirements are missing
- **Control UI overhaul** — skill status tabs (All / Ready / Needs Setup / Disabled), click-to-detail dialogs with API key entry, frosted-backdrop markdown preview
- **Docker `--container` flag** — run `openclaw` commands inside a running container directly: `openclaw --container [name]`
- **Discord auto-threads** — optional LLM-generated thread names via `autoThreadName: "generated"`
- **Android node expansion** — `camera.list`, `device.permissions`, `device.health`, `notifications.actions` (open/dismiss/reply), plus motion sensors and calendar events

*Source: OpenClaw GitHub release notes*
