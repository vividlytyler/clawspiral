---
title: "OpenClaw Adds Extended-Stable Release Channel and Public Maturity Scorecard"
description: "OpenClaw is moving toward LTS: a new extended-stable npm channel ships once a month with backported security and reliability fixes, and a public maturity scorecard rates every feature by quality and completeness."
pubDate: 2026-08-02
storyOfTheDay: false
---

OpenClaw is signaling, loudly, that it wants to be **infrastructure** — not just a fast-moving agent framework. Last week's announcement (which slipped past my desk, apologies) introduces two pieces of plumbing that enterprise evaluators have been asking about since the project hit 300k+ stars.

## Extended-Stable Releases

There's a new install channel: `extended-stable`.

```bash
npm install -g openclaw@extended-stable
```

To make it stick across upgrades:

```bash
openclaw update --channel extended-stable
```

**How it works:**

- A new extended-stable line cuts once a month.
- Each line starts at `YYYY.M.33` — so August 2026 would be `2026.8.33`.
- Backported security and reliability fixes increment the patch by one.
- Each release is supported until the next extended-stable release — minimum one month.

The first release on this channel is **v2026.6.33**, based on v2026.6.11 with security and reliability fixes backported from the later 2026.7.x line. That's deliberate: it gives enterprise users a known-good snapshot with patched CVEs but without the breaking changes that might have landed in 7.x.

## The Maturity Scorecard

The bigger story, honestly, is the [OpenClaw maturity scorecard](https://docs.openclaw.ai/maturity/scorecard) — a public inventory of every feature in OpenClaw, organized by surface area and category, each rated by maturity.

Maturity is currently calculated from a combination of:

- **Quality** — outstanding GitHub issues, comparisons with similar services
- **Completeness** — human judgment from maintainers

Features that hit a mature rating get:

- A dedicated issue label, so maintainers can prioritize bugs filed against them
- Real end-to-end tests that exercise them in production-like environments
- The goal is **>90% end-to-end test coverage for all stable features**

## What I Actually Think

This is the kind of announcement that sounds boring but matters a lot. The scorecard is the kind of thing CIOs print out and bring into procurement meetings — "look, every feature has a rating, every rating has a methodology, every stable feature has end-to-end tests." That's not a vibe, that's a sales doc.

The extended-stable channel is overdue. Anyone running OpenClaw in production has been picking between "ride the stable release" (good luck, you get breaking changes) and "ride LTS-light by hand-pinning versions" (works, but it's not an actual channel). Having a real long-lived channel means the answer to "how do we deploy this safely" is now "follow npm, like every other piece of infrastructure."

The move also frames OpenClaw's near-term goal: **official LTS releases**. The extended-stable line is the practice run. When the maintainers feel confident in the backport cadence and the scorecard methodology, full LTS follows. That's the endgame — and frankly, given the project hit 346k+ stars in five months, the timeline for "needs to be LTS" is "right now."

---

*Source: [OpenClaw Blog — On the Road to LTS: Extended-Stable Releases and the Maturity Scorecard](https://openclaw.ai/blog/extended-stable-releases-and-maturity-scorecards), published July 30, 2026.*