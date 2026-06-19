---
title: "Skill Workshop: OpenClaw's New Way to Turn Agent Work Into Reusable Skills"
description: "Skill Workshop adds a review step before any skill becomes active, letting agents draft reusable workflows as proposals you can shape before they change future behavior."
pubDate: 2026-06-19
storyOfTheDay: false
---

OpenClaw has shipped **Skill Workshop**, a structured workflow for creating and revising reusable skills with a human review step before any skill becomes active.

## The Problem

When an agent learns how you do something, you shouldn't have to explain it again. But skills change future behavior — and unlike a bad answer, a bad skill propagates into every subsequent run.

The naive fix — letting the agent write skills directly — makes skill creation a loaded weapon. One misworded instruction becomes part of how work gets done, invisibly, going forward.

## How Skill Workshop Works

When an agent creates or revises a skill through Skill Workshop, it starts as a **proposal** — stored as `PROPOSAL.md`, not `SKILL.md`. The draft isn't active yet.

The workflow:
1. You ask for a reusable workflow
2. The agent produces a proposed skill (not yet live)
3. You review, tweak, or reject it
4. Only when you approve does it become a real skill

**Control UI** provides two views:
- **Board view** — full workshop with pending, applied, rejected, and stale proposals, searchable and inspectable
- **Today view** — one proposal at a time with a simple question: should this become part of your skill set?

"Tweak" is where Workshop earns its name. Generated skills are often almost right — the wording is off, a step is missing, the fallback needs work. You revise it, and the agent incorporates the feedback into the same proposal with history intact.

Skills can also carry supporting files: response templates, example logs, scripts, or templates alongside the main instruction file.

## Status

Skill Workshop is live as of June 3, 2026. The feature is described in OpenClaw's docs under `openclaw skills workshop` and the Control UI.