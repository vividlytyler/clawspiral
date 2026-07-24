---
title: "OpenClaw v2026.7.2 Brings Remote Coding Sessions and Full Mobile Automation Parity"
description: "OpenClaw's latest beta series unlocks remote coding workflows — running Control UI on cloud workers and resuming Codex sessions on their host machines — while closing the automation gap between desktop and mobile."
pubDate: 2026-07-24
storyOfTheDay: true
---

OpenClaw v2026.7.2 is here, and it marks a meaningful step toward making agents truly portable across devices and infrastructure. The beta series — now at beta.3 — centers on two major themes: **remote coding sessions** and **native automation parity for mobile**.

## Remote Coding Sessions: Control UI in the Cloud, Codex on the Host

The headline feature is remote coding session support. Previously, OpenClaw's Control UI and coding agent sessions (Codex, Claude Code, OpenCode, Pi) were tethered to the machine they started on. v2026.7.2 breaks that tether in two ways:

- **Cloud-hosted Control UI**: You can now run Control UI sessions on cloud workers, which means you can supervise and interact with an agent session without being on the machine that hosts it.
- **Terminal-based session resumption**: Codex and Claude Code catalog sessions can be opened in terminals on their owning hosts, and OpenCode and Pi sessions can be resumed directly from a terminal — even remotely. This effectively gives developers a way to attach a local terminal to a cloud-bound agent session without VPN or SSH gymnastics.

This is a practical unlock for headless server deployments and teams running OpenClaw on machines that don't have a permanent desktop session.

## Native Automation Comes to Mobile

The second pillar brings Automations parity to mobile. The changelog notes:

> Bring Automations parity to mobile, add foreground Voice Wake on Android, and expose camera, location, and notification controls to mobile nodes.

What this means in practice: automations that work on desktop OpenClaw now work on iOS and Android. Voice Wake in the foreground on Android means the mobile app can stay alert without the battery penalties of a background service. Camera, location, and notifications become first-class tool inputs available to agents running on mobile.

For developers building skills that rely on sensor data or real-time notifications, this closes a significant gap that made mobile agents second-class citizens compared to their desktop counterparts.

## What's in the Box

The v2026.7.2-beta.3 (July 18) changelog in full:

- **Remote coding sessions**: Control UI on cloud workers, Codex/Claude Code catalog sessions opened in terminals on their owning hosts, OpenCode and Pi sessions resumed directly in a terminal. (#107670, #107086, #107200)
- **Native automation and nodes**: Bring Automations parity to mobile, add foreground Voice Wake on Android, expose camera, location, and notification controls to mobile nodes.
- **Safer channel operation**: Additional hardening for channel plugin stability.

## Broader Context

This release lands as OpenClaw settles into its new non-profit structure under the OpenClaw Foundation, which formally launched earlier this month with full-time staff and a mission to keep OpenClaw MIT-licensed and independent. The foundation has prioritized developer experience and infrastructure as core workstreams — v2026.7.2's remote session work aligns with that roadmap.

With 4.5 million new claws born every week and the recent mobile app launch bringing iOS/Android parity to the main apps, the platform is pushing hard on the "agent anywhere" story. Remote coding sessions take that narrative to infrastructure.

## Get It

```bash
npm install -g openclaw@latest
openclaw update --channel beta
```

Or grab the GitHub release directly at [github.com/openclaw/openclaw/releases](https://github.com/openclaw/openclaw/releases).
