---
title: "OpenClaw Ships Three Releases in Three Days, Then a Same-Day Hotfix"
description: "OpenClaw dropped v2026.5.3, v2026.5.4, and v2026.5.5 from May 4-6, covering file transfers, Google Meet voice bridging, and cross-platform fixes — then rushed out v2026.5.6 hours later to fix a GPT-5.5 OAuth regression."
pubDate: 2026-05-11
storyOfTheDay: true
---

OpenClaw shipped an unusually tight sequence of releases in the first week of May 2026 — three releases across three days, followed by a same-day hotfix that landed within hours of the third.

## The Releases

**v2026.5.3 (May 4)** led with a new **File Transfer Plugin** shipping four agent tools — `file_fetch`, `dir_list`, `dir_fetch`, and `file_write` — for binary file operations between paired nodes. Default-deny path policies, explicit opt-in for symlink traversal, and a 16 MB per-round-trip ceiling. The release also unified streaming progress configuration across Discord, Telegram, Slack, Matrix, and Microsoft Teams, replacing channel-specific configs with a single `streaming.mode: "progress"` shape. macOS LaunchAgent users got a fix for a SIGTERM issue that could fire during `openclaw update` restarts.

**v2026.5.4 (May 5)** added a real-time **Google Meet voice bridge via Twilio** — previously Meet voice agents used a basic TwiML fallback. The new implementation brings paced audio streaming, backpressure-aware buffering, and barge-in queue clearing. Also notable: **Gateway startup performance was overhauled** through systematic lazy-loading of plugin discovery, cron, schema, sessions, and model metadata. For plugin-heavy deployments, startup time and peak memory pressure both dropped noticeably.

**v2026.5.5 (May 6)** was the largest by fix count — over 50 fixes across xAI/Grok, LINE, Feishu, iOS pairing, Docker hardening, Telegram/Codex progress rendering, and Discord heartbeat reconnect loops. Docker compose now drops `NET_RAW` and `NET_ADMIN` capabilities and enables `no-new-privileges`.

## The Hotfix: v2026.5.6

v2026.5.5 introduced a `doctor --fix` repair that rewrote `openai-codex/*` routes to `openai/*`. Correct for most users — but it broke GPT-5.5 setups running the OAuth route via the Codex plugin. v2026.5.6 shipped **same day**, reverting that specific repair. Affected users need to run:

```bash
openclaw models set openai-codex/gpt-5.5
openclaw config validate
```

## What This Means

Four releases in three days is a sign of active development under pressure — and the hotfix turnaround shows the community is monitoring regressions closely. If you self-host, pull the latest compose file (the `NET_RAW`/`NET_ADMIN` drops require it) and run `openclaw config validate` after upgrading.
