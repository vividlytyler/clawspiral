---
title: "Claude Code Detects OpenClaw Users, Routinely Surcharges or Refuses Requests"
description: "Reports from Hacker News and GitHub indicate Anthropic's Claude Code scans repositories for OpenClaw HERMES.md configuration files and either refuses processing or routes traffic to higher-cost billing tiers, with users reporting cost increases of up to 50x."
pubDate: 2026-05-23
storyOfTheDay: false
---

An ongoing community dispute has surfaced around Anthropic's Claude Code tool allegedly detecting and penalizing users of competing AI agent tooling. According to reports on Hacker News and a related GitHub issue against the claude-code repository, Claude Code has been observed scanning repositories for HERMES.md files — the OpenClaw agent configuration manifest — and either refusing to process requests or routing them to more expensive billing tiers.

The Hacker News post, titled "Claude Code refuses requests or charges extra if your commits mention 'OpenClaw'", accumulated 1,336 upvotes and 718 comments within hours. Users reported cost increases of up to 50x their previous monthly outlay. More than 135,000 OpenClaw instances were estimated to be running at the time of the initial reports.

Boris Cherny, Head of Claude Code at Anthropic, was quoted saying "Anthropic's subscriptions weren't built for the usage patterns of these third-party tools." Earlier in April, TNW reported that Anthropic blocked OpenClaw usage from Claude Pro and Max flat-rate subscriptions in what the outlet framed as a cost crackdown.

For enterprise teams, the incident raises procurement and legal questions around whether scanning repository contents to identify and surcharge users of competing tooling crosses acceptable boundaries.