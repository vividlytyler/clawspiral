---
title: "CNCERT Warns: OpenClaw's Weak Defaults Enable Prompt Injection and Data Leaks"
description: "China's national computer emergency response team (CNCERT) has issued a security notice calling OpenClaw's default configurations dangerously weak, enabling attackers to seize control of endpoints via prompt injection — and China has restricted use on government systems."
pubDate: 2026-04-05
storyOfTheDay: true
---

China's national computer emergency response team, **CNCERT**, issued a public security warning on April 5th about OpenClaw, calling out the platform's default security configurations as "inherently weak" and capable of enabling attackers to seize control of user endpoints.

## What CNCERT Found

The warning, shared via an official WeChat post, focuses on two core risk categories:

**Prompt Injection (Indirect):** OpenClaw's design lets it autonomously browse the web, summarize pages, and act on behalf of users — the same capabilities that make it powerful also let malicious web content inject instructions that trick the agent into leaking sensitive data. CNCERT specifically cited *indirect prompt injection* (IDPI), where an adversary plants instructions in web pages, emails, or messages that OpenClaw processes and acts on without the user ever clicking anything.

**Privileged System Access:** OpenClaw needs broad system access to do its job — controlling messaging apps, reading files, executing commands. By default, those privileges are configured permissively. If an attacker gains a foothold through prompt injection or a related pathway, they can leverage OpenClaw's own access stack to move laterally.

## Government Systems Restricted

CNCERT's notice appears to have already fed into policy action: China has begun restricting OpenClaw deployment on government and state-linked systems, according to sources familiar with the directive. This follows a pattern seen with other foreign-developed open-source tools that gained rapid traction in China before attracting regulatory scrutiny.

## Link Preview Exploitation Already Demonstrated

The warning comes after researchers at **PromptArmor** demonstrated last month that the link preview feature in messaging apps like Telegram and Discord can be weaponized against OpenClaw deployments. The attack works by tricking the agent into generating an attacker-controlled URL that, when rendered by the messaging app as a preview, automatically transmits session data — including tokens and context — to a malicious domain. No click required.

## OpenAI Also Weighed In

Earlier this week, OpenAI published its own analysis of prompt injection-style attacks evolving against AI agents, noting that "AI agents are increasingly able to browse the web, retrieve information, and take actions on a user's behalf" — creating new manipulation vectors. OpenAI's post is relevant context for the broader risk landscape that CNCERT's warning sits within.

## The Broader Pattern

CNCERT's warning is the third major security disclosure in two weeks, alongside CVE-2026-25253 (critical RCE, mid-March) and CVE-2026-33579 (privilege escalation, late March). Together they paint a picture of a platform whose rapid, viral adoption has outpaced the security hardening that enterprise-scale deployments require.

**Story of the Day** — CNCERT's warning is significant not just for its content but for its source: a government body with regulatory authority, directly advising restriction of a tool that has spread faster than any AI agent framework in history.
