---
title: "OpenClaw Introduces Extended-Stable Releases and Maturity Scorecard"
description: "OpenClaw's July 30 release debuts a new long-lived release channel and a public feature maturity scorecard, marking another step toward LTS and enterprise reliability."
pubDate: 2026-08-10
storyOfTheDay: false
---

OpenClaw is maturing. What started as a side project with a funny name is becoming core infrastructure relied on by individuals and Fortune 500 companies alike. To match that responsibility, OpenClaw is introducing two new tools for predictability: **extended-stable releases** and a **public maturity scorecard**.

## Extended-Stable Releases

Extended-stable is a new long-lived release channel modeled after LTS (long-term support) lines in traditional infrastructure projects. It rolls out monthly, starting from OpenClaw 2026.6.33 (based on 2026.6.11) with security and reliability fixes backported from later releases.

Each extended-stable line is named `YYYY.M.33` and receives backported patches incrementing the patch version. A release is supported until the next extended-stable cut, with a minimum one-month support window.

To install:
```bash
npm install -g openclaw@extended-stable
# or to persist the channel:
openclaw update --channel extended-stable
```

This moves OpenClaw closer to official LTS releases and gives enterprise users a stable target that won't shift underneath them mid-sprint.

## Maturity Scorecard

Alongside extended-stable, OpenClaw published the [maturity scorecard](https://docs.openclaw.ai/maturity/scorecard) — a full inventory of every OpenClaw feature mapped to a maturity level. Scores are calculated from outstanding issues, comparisons with similar services, and human judgment.

Mature features get a dedicated GitHub label and prioritization from maintainers. They also require real end-to-end tests exercising them in production. The goal: maintain more than 90% end-to-end test coverage for all stable features.

Features are organized by surface area and category, making it easy to know exactly where OpenClaw is ironclad and where it's still experimental.

---

*Together, extended-stable releases and the maturity scorecard represent OpenClaw's deliberate shift from "early adopter project" to "platform that hardened enterprises can bet on."*
