---
title: "OpenClaw Main Adds Bounded Recovery for Critical Embedded-Agent Tool Loops"
description: "When loop detection classifies a tool batch as critical, OpenClaw now blocks it before execution, gives the model one tool-free corrective response, and terminates the run if a second critical loop occurs — closing an availability gap that could otherwise drain model calls without useful work."
pubDate: 2026-08-09
storyOfTheDay: false
---

OpenClaw merged **bounded recovery for critical embedded-agent tool loops** into main on August 6. The change addresses a specific availability gap: unbounded loop detection without a terminal policy could itself become a loop — the runtime blocks, the model proposes the same behavior again, and the system continues consuming model calls indefinitely.

## How It Works

The recovery sequence is deliberately bounded:

1. Loop detection reaches a **critical classification**
2. OpenClaw **rejects the pending tool batch before its tools execute** (blocking before execution is key — a loop warning after tools run is too late for consequential actions)
3. The model receives evidence that a critical loop was blocked
4. **One tool-free recovery response is allowed**
5. A **second critical loop in the same run ends the run visibly**

The key insight: capable models can acknowledge the failure, change approach, or explain the blocker — while persistent repetition does not gain an unlimited retry budget.

## Operator Guidance

This applies to **embedded agents only** — native runtime behavior is not changed. Operators running scheduled or unattended embedded agents should:

- Adopt a containing release and alert on both recovered and terminal loop events
- Verify the blocked critical batch performs no side effects before the recovery response (a mock message tool should show zero sends from the blocked batch)
- Retain independent cost, duration, and tool-call ceilings even after upgrading

Loop detection disabled or heavily customized? Review current documentation and staged behavior before relying on recovery.
