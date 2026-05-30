---
title: "OpenClaw Blog: 2.9x Faster Cold Turns, 59% Smaller Package"
description: "OpenClaw's May 28 blog post details a performance sweep across February–May 2026: cold agent turns are now 2.9x faster, the published tarball is 59% smaller, and installed dependencies dropped from 645 to 371."
pubDate: 2026-05-30
storyOfTheDay: false
---

OpenClaw published a technical blog post on May 28 detailing a performance sweep across the past several months — and the numbers are striking.

## Key metrics

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Cold agent turn | 9.8s | 3.4s | **2.9x faster** |
| Warm agent turn | 7.5s | 3.0s | **2.5x faster** |
| Published tarball | 43.3 MB | 17.8 MB | **59% smaller** |
| Installed dependencies | 645 | 371 | **42% reduction** |
| Peak RSS | 886 MB | 635 MB | **7% lower** |

Fresh install footprint peaked at 1,020 MB in v5.22 (due to a bad package shape that duplicated the dependency tree) and is now at 786 MB — with the fix already on main, dropping to 314 dependencies for the next release.

## What happened

The package grew significantly between February and March as new channels, providers, media, memory, and plugin SDK surface were added. Then the team started moving heavier plugin dependency cones out of core — Bedrock, Slack, OpenShell, Anthropic Vertex, Matrix, and WhatsApp moved out of the core dependency path in v5.12.

A bad package shape in v5.22 exposed a duplicate dependency tree via npm shrinkwrap, causing the install footprint spike. That was identified and the fix landed on main — the next release will be cleaner.

## The direction

Keep core small, move optional capabilities into plugins, make dependency ownership explicit. "Growth, here, looks more like molting than adding," the post notes.

The full technical report with per-release rows, methodology, and caveats is in the [OpenClaw documentation](https://docs.openclaw.ai/reference/release-performance-sweep).

📝 [Read the full blog post](https://openclaw.ai/blog/lighter-core-sharper-claws)
