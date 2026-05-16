---
title: "Claude Code Scans for HERMES.md, Charges Up to 50x More for OpenClaw Users"
description: "Community reports confirm Claude Code detects OpenClaw agent configuration files and routing commit messages, either refusing requests or uprating usage to Anthropic's extra-usage billing tier — with reported cost increases of up to 50x."
pubDate: 2026-05-16
storyOfTheDay: false
---

A significant friction point between Anthropic's Claude Code and the OpenClaw community has escalated. Users report that Claude Code detects the presence of `HERMES.md` — OpenClaw's agent configuration manifest — in repositories and flag-related commit messages, then either refuses to process the request or routes it to Anthropic's more expensive "extra usage" billing tier.

**What happened:** The story broke on Hacker News as "Claude Code refuses requests or charges extra if your commits mention 'OpenClaw'" and accumulated 1,336 upvotes and 718 comments within hours. Community reports estimated over 135,000 OpenClaw instances running at the time. Affected users described cost increases of up to 50x their previous monthly outlay.

Boris Cherny, Head of Claude Code at Anthropic, was quoted by TNW: *"Anthropic's subscriptions weren't built for the usage patterns of these third-party tools."* Earlier, Anthropic had already blocked OpenClaw usage from Claude Pro and Max flat-rate subscriptions in what was framed as a cost crackdown.

**The enterprise angle:** For teams running OpenClaw with their own Claude API keys rather than subscriptions, the behavior doesn't apply — but the incident has reignited debate about single-vendor dependency on the model billing layer. Organizations evaluating AI agent platforms are increasingly asking about decoupling the agent surface from any single provider's billing controls.

A [GitHub issue against claude-code](https://github.com/anthropics/claude-code/issues/53262) remains open on the topic.