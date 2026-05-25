---
title: "OpenClaw May 24 Pre-Release: iMessage Tapbacks, Meeting Notes, and Performance Overhaul"
description: "The latest pre-release adds iMessage thumb-approval reactions (👍/👎), a new Meeting Notes plugin with Discord voice capture, adaptive image compression, and significant gateway performance improvements across caching and startup paths."
pubDate: 2026-05-25
storyOfTheDay: true
---

OpenClaw's May 24 pre-release delivers a notable mix of quality-of-life improvements and architectural changes.

**iMessage reactions** now mirror WhatsApp behavior: 👍 resolves an approval as `allow-once`, 👎 as `deny`, with `allow-always` falling back to manual `/approve` text.

**Meeting Notes** enters as a first-class plugin, with Discord voice as the inaugural live capture source. It supports auto-start capture config, manual transcript imports, and a dedicated `openclaw meeting-notes` CLI for read-only access.

**Performance work** is broad: cached plugin metadata, lazy-loaded startup-idle plugin work, reused channel catalogs, rotated CPU profiles, and eliminated repeated filesystem walks. The net effect is measurably faster gateway startup and reduced I/O during hot paths.

**Image handling** gets adaptive, model-aware compression with an `agents.defaults.imageQuality` preference for token-efficient, balanced, or high-detail output.

Contributors on this release include @Solvely-Colin, @NorseGaud, @yudistiraashadi, @huangqian8, @VibhorGautam, @maweibin, @tianxingleo, @IgnacioPro, and @xzcxzcyy-claw.

Full release notes: [github.com/openclaw/openclaw/releases](https://github.com/openclaw/openclaw/releases)