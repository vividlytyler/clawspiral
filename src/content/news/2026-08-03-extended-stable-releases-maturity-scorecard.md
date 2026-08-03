---
title: "OpenClaw Introduces Extended-Stable Releases and Public Maturity Scorecard"
description: "OpenClaw's July 30 announcement debuts a long-lived release channel akin to Ubuntu's LTS model, alongside a public scorecard tracking feature maturity — a step toward enterprise-ready reliability."
pubDate: 2026-08-03
storyOfTheDay: false
---

OpenClaw is formalizing its path to stability. In an announcement on July 30, 2026, the project introduced **extended-stable releases** — a long-lived release channel with backported security and reliability fixes — alongside a **public maturity scorecard** that scores every feature area in the project.

## Extended-Stable: The Road to LTS

The core problem OpenClaw is solving: agents running critical workloads need predictability, but the project ships fast with frequent breaking changes. Extended-stable releases aim to bridge that gap.

The model mirrors Ubuntu's LTS approach: releases branch off the mainline, receive backported fixes for at least one month, and are identified by a `YYYY.M.33` version scheme. The first extended-stable line, **v2026.6.33**, is based on v2026.6.11 and pulls in security and reliability patches from later releases.

To install:
```bash
npm install -g openclaw@extended-stable
# or update an existing install:
openclaw update --channel extended-stable
```

Extended-stable releases will roll out monthly, moving OpenClaw closer to official LTS support.

## The Maturity Scorecard

Also announced is the **OpenClaw maturity scorecard** — a full inventory of OpenClaw features organized by surface area and category, with calculated maturity scores. The scorecard uses a combination of outstanding GitHub issues, comparisons with similar services, and human judgment.

Key properties of the scorecard:
- Features at "stable" maturity get a dedicated GitHub label and prioritized review from maintainers
- Mature features will have real end-to-end tests exercising them in production
- Target: **>90% end-to-end test coverage** for all stable features

Issues against mature features will receive dedicated labels and be routed to senior reviewers — a signal that OpenClaw is building the processes expected of production-grade infrastructure.

## What This Means

These announcements together show OpenClaw maturing past the "move fast" phase. The project is now over 195,000 GitHub stars, has millions of agents running, and is being evaluated by enterprises. Extended-stable and the scorecard give operators confidence that features work as documented — and that breaking changes won't be sprung on production deployments without warning.
