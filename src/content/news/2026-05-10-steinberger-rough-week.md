---
title: "OpenClaw Had a Rough Week: Steinberger Admits to Growing Pains"
description: "OpenClaw creator Peter Steinberger published a candid blog post acknowledging a difficult stretch of gateway slowdowns, plugin dependency loops, and channel issues — and outlined plans for a smaller core and LTS release."
pubDate: 2026-05-10
storyOfTheDay: true
---

OpenClaw creator Peter Steinberger published a candid blog post on openclaw.ai admitting the project went through a rough stretch that came to a head around April 29, 2026.

The problems were not a single bug but a cluster: plugin dependency repair running in startup and update paths, half-split bundled vs. external plugins, settling ClawHub artifact metadata, and gateway cold paths doing too much work. The result was slower gateways, installs stuck in plugin dependency repair loops, and degraded Discord, Telegram, and WhatsApp performance. Some users downgraded; others lost time.

Steinberger attributed the issues partly to the ongoing effort to shrink OpenClaw's core and move optional components to ClawHub — work that was motivated in part by npm ecosystem supply-chain concerns (OpenClaw did not directly depend on the compromised Axios package, but the shape of its dependency graph raised alerts). The problem was that the transition left OpenClaw in what Steinberger called "the worst middle state: too much moved toward plugins, while too many plugins were still bundled, repaired, staged, checked, or dependency-loaded in places users feel immediately."

The blog post also flagged an operating weakness: OpenClaw remained too founder-driven, with too much release, review, packaging, and support work sitting with Steinberger personally. The OpenClaw Foundation — with help from OpenAI — is building a real team around the project.

Looking forward, the plan is to keep making OpenClaw smaller and more secure while restoring reliability. An LTS release will be announced separately later in May, alongside changes to how releases are structured.