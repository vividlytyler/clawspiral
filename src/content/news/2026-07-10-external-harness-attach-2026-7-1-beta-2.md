---
title: "openclaw attach Lands in 2026.7.1-beta.2: External Harnesses Meet Existing Gateway Sessions"
description: "OpenClaw's latest beta introduces openclaw attach, a command that hooks an external harness — like Codex — directly into a live Gateway session, making interactive agent workflows far easier to resume and inspect."
pubDate: 2026-07-10
storyOfTheDay: true
---

OpenClaw's most recent beta release, **openclaw 2026.7.1-beta.2**, landed July 5 with two headline features: OpenAI GPT-5.6 model support and a new CLI command called `openclaw attach` that makes it significantly easier to work with external harnesses against live sessions.

## What is openclaw attach?

`openclaw attach` launches an external harness against an existing Gateway session. Before this, attaching a secondary harness — such as OpenAI's Codex — to a running OpenClaw instance required manual configuration or workarounds. Now a single command bridges the two, enabling interactive Codex-style workflows to resume and be inspected mid-session.

The feature is especially relevant as OpenAI's Codex becomes a primary agent harness for OpenClaw deployments, following the integration work that landed earlier this year. The ability to attach and detach external harnesses on demand is a quality-of-life improvement for developers building and debugging agentic pipelines.

## GPT-5.6 Support

The other half of the beta adds first-class recognition of OpenAI's GPT-5.6 model family across catalog, capability, and runtime selection paths. The work was contributed by `@steipete-oai` — Peter Steinberger's OpenAI-affiliated handle — signaling continued deep integration between OpenClaw and OpenAI's model ecosystem.

## Full Release Notes

- [Full release notes on docs.openclaw.ai](https://docs.openclaw.ai/releases/2026.7.1-beta.2)
- [Release discussion on GitHub](https://github.com/openclaw/openclaw/releases)
