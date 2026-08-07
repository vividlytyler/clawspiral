---
title: "OpenClaw Adds Session Rewind and Conversation Branching"
description: "Users can now rewind or fork any conversation mid-chat, switch transcript branches across web and native apps, and fork upstream Codex sessions — a major quality-of-life upgrade."
pubDate: 2026-08-07
storyOfTheDay: false
---

One of the most-requested features has arrived in OpenClaw v2026.7.2: **full session rewind and branching**.

## What It Means

Previously, if you wanted to explore a different direction in a conversation, you'd have to start a new session or manually copy context. Now, you can:

- **Rewind** a conversation to any previous message and continue from there
- **Fork** a conversation to explore multiple branches simultaneously
- **Switch transcript branches** across web and native apps
- **Fork upstream Codex sessions** directly from the OpenClaw interface
- **Restore prompt images** after a fork

## Session Boards and Dashboards

Rewind and branching integrate with OpenClaw's session boards and dashboards, which gain new states: **archived**, **visibility** (public/private), **draft**, and **incognito**. Users can maintain multiple parallel threads of the same conversation without losing any of them.

## Queued Sends and Pane Safety

The release also ensures **branch-safe queued sends** — messages queued in one branch won't accidentally post to another — and rejects stale-pane writes to prevent context bleed between branches.

---

See the [full release notes](https://github.com/openclaw/openclaw/releases) for implementation details.
