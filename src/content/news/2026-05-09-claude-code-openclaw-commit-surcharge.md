---
title: "Claude Code Charges Extra for 'OpenClaw' Git Commits — Even When You're Not Using It"
description: "Anthropic's Claude Code has been silently routing users to higher-cost pay-as-you-go billing when OpenClaw-related strings appear in git history, regardless of whether OpenClaw is actually in use. A 1,336-point Hacker News thread and confirmed bug reports show subscribers losing hundreds in overcharges."
pubDate: 2026-05-09
storyOfTheDay: true
---

On April 30, 2026, a Hacker News thread titled *"Claude Code refuses requests or charges extra if your commits mention 'OpenClaw'"* hit 1,336 points and 718 comments in hours. The top comment wasn't outrage — it was a reproduction recipe: `mkdir anthropic-test && git init && git commit -m "link to OpenClaw blog post" && claude`. The result: either the request gets refused outright, or a $200/month Max subscription quietly stops counting and switches to pay-as-you-go "extra usage" billing.

## What's Actually Happening

Two overlapping issues:

**The policy.** On April 4, 2026, Anthropic restricted subscription OAuth tokens to first-party apps only. Third-party agent harnesses — including OpenClaw, Cline, and any non-Anthropic runtime — must use a separate pay-as-you-go tier or a standalone API key. The stated reason: flat-rate plans were being arbitraged through cheaper third-party clients.

**The bug.** The detection mechanism scans recent commit messages and file paths for strings matching third-party harness usage. A commit message like *"document: link to OpenClaw blog post"* is enough. The detector does not check whether OpenClaw is actually invoked at runtime — only whether the string appears in your recent git log. Per the Consumer Rights Wiki, even the literal filename `HERMES.md` (the OpenClaw agent configuration manifest) anywhere in git history was enough to silently bypass a $200/month Max subscription. One subscriber lost over $200 in overcharges while 86% of their prepaid credits sat unused.

Anthropic engineer Tariq confirmed the bug in a public statement: *"a bug with the third-party harness detection and how we pull git status into the system prompt."*

## The Broader Context

This story surfaced alongside two other institutional anti-AI stories on the same HN front page — the Zig project's anti-AI contribution policy (#1, 569 pts) and Mozilla's opposition to Chrome's Prompt API (#2, 428 pts). Three independent organizations — a language vendor, a browser vendor, and an AI lab — all formalizing constraints on AI agent behavior in the same 24-hour window.

A workaround exists: [cc-switch](https://github.com/farion1231/cc-switch), a desktop runtime switcher currently at 56,452 GitHub stars, allows routing Claude Code requests around the surcharge from a single CLI.

## Why It Matters

For enterprise users, the implications are straightforward: if your developers discuss or reference OpenClaw in commit messages — even in unrelated contexts — your Anthropic subscription billing becomes unpredictable. For the broader AI agent ecosystem, the incident underscores that as autonomous agents proliferate, the billing and policy infrastructure wasn't designed with multi-harness usage in mind.

The bug has been confirmed. The policy remains in place.