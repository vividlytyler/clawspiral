---
title: "OpenClaw v2026.6.11 Fixes Channel Delivery Across Telegram, WhatsApp, Matrix, and More"
description: "OpenClaw's mid-June release addressed reliability issues that had plagued message delivery across a wide range of channels, with fixes spanning Telegram, WhatsApp, Matrix, Google Chat, iMessage, Feishu, Mattermost, and WebChat."
pubDate: 2026-07-03
storyOfTheDay: false
---

OpenClaw **v2026.6.11**, released in late June 2026, tackled the rough edges causing OpenClaw to feel unreliable for many users — specifically around channel delivery and message routing failures.

## Key Fixes

- **Telegram durability** — Recovered stalled ingress claims, retry logic for restart-dropped media, survival through transient polling errors, dead-letter poison update handling, rich text forwarding preservation, correct plugin callback routing, and safe fallback when rich final replies are rejected.

- **Cross-channel delivery reliability** — Fixes span WhatsApp, Matrix, Google Chat, iMessage, Feishu, Mattermost, and WebChat — addressing reconnection handling, misdirected replies, and stuck send queues.

- **Safer admin defaults** — Several default configuration values were tightened to reduce accidental exposure in production deployments.

- **Channel control expansion** — Slack relay mode, native Mattermost `/oc_queue` support, and per-Direct-Message model overrides give operators more granular control.

## Context

The v2026.6.11 release came shortly after the community reported widespread gateway crashes and Discord delivery issues with the prior v2026.4.26 update, which had introduced regressions that took several weeks to fully address.

For the complete release notes, visit the [OpenClaw releases page on GitHub](https://github.com/openclaw/openclaw/releases).
