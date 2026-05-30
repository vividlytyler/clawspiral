---
title: "OpenClaw v2026.5.28 Pre-Release: Stability Overhaul, Claude Opus 4.8, MiniMax Music"
description: "The May 29 pre-release delivers broad stability fixes across agent recovery, channel delivery, and mobile surfaces — plus new model support including Claude Opus 4.8 and MiniMax streaming music responses."
pubDate: 2026-05-30
storyOfTheDay: true
---

OpenClaw shipped a substantial pre-release on May 29, spanning agent runtime recovery, channel security hardening, mobile UI refreshes, and new model integrations.

## Stability: the headline

The most impactful changes are under the hood. Agent and Codex runtime recovery is now steadier — subagents maintain workspace separation, hook context stays prompt-local, session locks release on timeout abort, and Codex app-server failures no longer tear down shared runtime state. Five PRs (#87218, #86875, #87409, #87399, #87375) address various failure modes that could cause instability in longer-running agent sessions.

Channel delivery and session identity received safety improvements across eight platforms: Matrix, iMessage, Slack, Discord, WhatsApp, Telegram, and Microsoft Teams. Mobile and chat surfaces — iOS Pro UI, hosted push relay, realtime Talk tab, WebChat, session picker — now preserve state more reliably across reconnects.

## New model support

Provider and media coverage expanded:
- **Claude Opus 4.8** — added to the model catalog
- **Fal Krea** image schemas
- **NVIDIA featured models**
- **MiniMax streaming music responses** — first mention of music generation in a release
- **GitHub Copilot agent runtime** support
- **Codex Supervisor plugin path** for delegated Codex workflows
- Encrypted PDF extraction

## CLI and auth improvements

Malformed numeric/version options are now rejected earlier, workspace dotenv provider credentials are handled more cleanly, and OAuth paths fail faster with clearer recovery messages.

The full changelog with all PR links is on the [GitHub releases page](https://github.com/openclaw/openclaw/releases).

📦 [Release notes on GitHub](https://github.com/openclaw/openclaw/releases)
