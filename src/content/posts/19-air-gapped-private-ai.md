---
title: "Air-Gapped Private AI: OpenClaw + Ollama for Sensitive Data"
description: "Process HR documents, financial records, legal files, and anything else that shouldn't touch the internet — using OpenClaw and a local LLM, with the entire machine cut off from the network."
pubDate: 2026-04-02
category: development
difficulty: advanced
tags: [privacy, ollama, local-llm, security, air-gap, self-hosted, sensitive-data]
featured: false
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop"
---

![Air-gapped architecture comparison diagram](/assets/air-gapped-diagram.svg)

*For when "we promise the data isn't stored" isn't good enough.*

## The Problem with Cloud AI for Sensitive Data

Cloud AI is convenient. It's also a permanent, uncontrolled data leak.

When you send employee records to an AI API to summarize, or paste a legal contract into an online model — that data travels to someone else's servers. Theirs. Their subcontractors. Their training pipelines. You have no visibility and no recall. For most business work that's fine. For HR documents, medical records, financial statements, proprietary source code, or anything with PII — it's a compliance nightmare dressed up as productivity.

The answer isn't "be more careful." The answer is architecture: **the data never leaves the machine.**

## What This Setup Does

You run OpenClaw on a machine that has zero network access. Ollama handles LLM inference locally. OpenClaw handles the workflow, tool access, and orchestration. No outbound connections. No API calls. No data leaves.

```
┌─────────────────────────────────────────────────┐
│              AIR-GAPPED MACHINE                 │
│                                                 │
│   ┌──────────────┐      ┌──────────────┐        │
│   │  OpenClaw   │─────▶│   Ollama    │        │
│   │  (agent)    │◀─────│  (local LLM) │        │
│   └──────────────┘      └──────────────┘        │
│                                                 │
│   All processing happens locally.                │
│   Zero network access. Zero data egress.        │
└─────────────────────────────────────────────────┘
```

## How It Works

### 1. Set Up Ollama

Install Ollama on your isolated machine and pull a capable model before severing the network:

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model that fits your hardware (do this before air-gapping)
ollama pull llama3.3        # 4.9GB — great all-rounder, 8GB RAM minimum
ollama pull mistral-small   # 4.1GB — fastest inference, tight RAM budgets
ollama pull qwen2.5:14b     # 9GB — best for coding, 16GB+ RAM
ollama pull deepseek-r1:32b # 23GB — strongest reasoning, 32GB+ RAM server

# Start the local API (looks like OpenAI API — drop-in compatible)
ollama serve
```

Ollama's local API runs at `http://localhost:11434`. Point your OpenClaw config to it with no changes to prompt structure.

### 2. Configure OpenClaw to Use the Local Engine

In your OpenClaw config, route sensitive tasks to your local Ollama endpoint:

```yaml
# openclaw.yaml
providers:
  - name: ollama-local
    provider: ollama
    api_base: http://localhost:11434
    model: llama3.3

tasks:
  sensitive-document-review:
    provider: ollama-local
    prompt: |
      Review this HR document and flag any compliance issues,
      missing fields, or language that could create liability.
      Summarize findings in a table, flag critical issues first.
```

### 3. Sever the Network

**Option A — Hardware air-gap (strongest):** Physically remove or disable the Wi-Fi card and ethernet adapter. For a server, don't connect it to any network at all. Boot from read-only media for maximum integrity.

**Option B — Software firewall (belt and suspenders):**
```bash
# Block all outbound traffic — last line of defense
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT DROP
sudo iptables -A INPUT -i lo -j ACCEPT    # loopback only
sudo iptables -A OUTPUT -o lo -j ACCEPT
```

**Option C — Dedicated VLAN:** Isolate the machine on a private VLAN with no internet egress and no access to sensitive network segments.

For anything touching genuinely sensitive data: Option A + Option B.

### 4. Run Your Workflows

Now OpenClaw processes everything locally. Documents, analysis, reports — all the LLM capability, none of the data exposure.

Example: HR document review every weekday morning
```yaml
tasks:
  hr-document-review:
    provider: ollama-local
    triggers:
      - cron: "0 9 * * 1-5"
    steps:
      - read: "/data/hr/pending/*.pdf"
      - prompt: |
          Review each document for:
          - Compliance gaps vs. current labor law
          - Missing required fields or signatures
          - Language that could create liability
          Summarize findings in a table. Flag critical issues first.
      - write: "/data/hr/reviews/daily-summary.md"
```

## Which Local Model Should You Run?

The open-source landscape has shifted dramatically. As of early 2026, open-weight models match or beat proprietary alternatives on most benchmarks — and run entirely offline.

| Model | Size | RAM Required | Context | Best For |
|-------|------|-------------|---------|----------|
| **Llama 3.3 8B** | 4.9 GB | 8 GB | 128K | General use, daily tasks, consumer hardware |
| **Mistral Small 4** | ~7 GB | 8-12 GB | 256K | Fast inference, best speed/cost ratio |
| **Qwen 2.5 14B** | 9 GB | 16 GB | 128K | Coding, multilingual, technical documents |
| **Qwen 3 32B** | 20 GB | 24 GB | 128K | Complex reasoning, higher accuracy |
| **DeepSeek R1** | 23 GB | 32 GB | 128K | Hard reasoning tasks, math, analysis |
| **Gemma 3 27B** | 18 GB | 24 GB | 128K | Multimodal, Google's best open weights |
| **Llama 4 Scout** | ~17 GB active | 24 GB | 10M tokens | Massive context, Meta's latest |

For a typical workstation: start with **Llama 3.3 8B** or **Mistral Small 4**. Move to **Qwen 2.5 14B** or **DeepSeek R1** when you need more reasoning muscle and have the RAM.

## What You Can Process This Way

- **HR documents** — employment contracts, performance reviews, compensation details, termination letters
- **Legal files** — NDAs, M&A documents, regulatory filings, attorney-client privileged materials
- **Financial records** — audit documents, board financials, acquisition targets, trading data
- **Medical records** — patient data for internal workflow automation
- **Proprietary code** — source code for security review, architecture analysis, without IP leaving your org
- **PII databases** — any dataset that can't be anonymized before processing

## Traditional Setup vs. Air-Gapped

| | Cloud AI (GPT-4o, Claude, Gemini) | Air-Gapped Local |
|---|---|---|
| Data leaves your network | ✅ Always | ❌ Never |
| API costs | ✅ Per-token fees | ❌ Zero |
| Internet required | ✅ | ❌ |
| Compliance (GDPR, HIPAA, etc.) | ⚠️ Complex DPA required | ✅ Guaranteed |
| Model capability | Frontier — best on hard reasoning | ✅ Excellent for most tasks |
| Real-time information | ✅ Web access | ❌ None (by design) |
| Hardware requirements | None | ✅ RAM + disk |

The capability gap has largely closed for document processing, summarization, and classification tasks. The remaining frontier advantage is concentrated on the hardest reasoning problems — and for those, you can run **DeepSeek R1** or **Qwen 3 32B** locally with 32GB+ RAM. The tradeoff is almost gone.

## Limitations to Know

- **Frontier reasoning gap:** On very hard multi-step reasoning (PhD-level math, cutting-edge code), frontier cloud models still lead. For document review, classification, and summarization — local models are at parity.
- **No real-time information:** Your local LLM can't browse. If workflows need current data, run a second OpenClaw instance with internet access for that work only, with proper data separation.
- **Hardware investment:** Ollama needs RAM. Llama 3.3 8B needs ~8GB minimum. DeepSeek R1 at full accuracy needs 32GB+. Budget accordingly.
- **No automatic updates:** The machine is isolated. Model updates require physical media or a one-time controlled transfer.

## What This Doesn't Replace

Air-gapping is a physical security control — not a magic privacy button. It doesn't protect against:

- A malicious local user with terminal access
- Keyloggers or malware on the machine itself
- Physical theft (full-disk encryption mitigates this)
- Insiders with legitimate access who misuse it

Combine air-gapping with standard access controls, audit logging, and need-to-know principles. The air-gap is your last line of defense — not your only one.

## Is This Overkill?

For most people, yes. For data that actually matters — the stuff you'd lose sleep over if it leaked — it's the only architecture that actually guarantees what you need.

Most "private AI" solutions are really just "we promise." Air-gapping is "we couldn't send this data out even if we wanted to."

That's a meaningful difference.
