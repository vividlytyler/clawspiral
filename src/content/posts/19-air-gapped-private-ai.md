---
title: "Air-Gapped Private AI: OpenClaw + Ollama for Sensitive Data"
description: "Process HR documents, financial records, legal files, and anything else that shouldn't touch the internet — using OpenClaw and a local LLM, with the entire machine cut off from the network."
pubDate: 2026-04-02
category: development
difficulty: advanced
tags: [privacy, ollama, local-llm, security, air-gap, self-hosted, sensitive-data]
featured: false
---

![Air-gapped architecture diagram](/assets/air-gapped-diagram.svg)

*For when "we promise the data isn't stored" isn't good enough.*

## The Problem with Cloud AI for Sensitive Data

Cloud AI is convenient. It's also a permanent, uncontrolled data leak.

When you send your employee records to OpenAI to summarize, or paste a legal contract into Claude, that data travels to someone else's servers. Theirs. Their subcontractors. Their training pipelines. You have no visibility and no recall. For most business work, that's fine. For HR documents, medical records, financial statements, proprietary source code, or anything with PII — it's a compliance nightmare dressed up as productivity.

The answer isn't "be more careful." The answer is architecture: **the data never leaves the machine.**

## What This Setup Does

You run OpenClaw on a machine that has no network access whatsoever. Ollama handles the LLM inference locally. OpenClaw handles the workflow, tool access, and orchestration. No outbound connections. No API calls. No data leaves.

```
┌─────────────────────────────────────────────┐
│              AIR-GAPPED MACHINE              │
│                                             │
│   ┌──────────────┐    ┌──────────────┐     │
│   │  OpenClaw    │───▶│   Ollama     │     │
│   │  (agent)     │    │  (local LLM) │     │
│   └──────────────┘    └──────────────┘     │
│                                             │
│   All processing happens locally.           │
│   Zero network access.                      │
└─────────────────────────────────────────────┘
```

## How It Works

### 1. Set Up Ollama

Install Ollama on your isolated machine. Pull a capable model — Llama 3.3, Mistral, Qwen2.5, whatever fits your hardware:

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model (do this before cutting network access)
ollama pull llama3.3

# Start the local API server
ollama serve
```

Ollama runs a local API at `http://localhost:11434` that looks like the OpenAI API. Your tools can point to it without changing code.

### 2. Configure OpenClaw to Use the Local Engine

In your OpenClaw config, point the LLM provider to your local Ollama endpoint:

```yaml
# openclaw.yaml
providers:
  - name: ollama-local
    provider: ollama
    api_base: http://localhost:11434
    model: llama3.3
```

Then assign your air-gapped tasks to use `ollama-local`:

```yaml
tasks:
  sensitive-document-review:
    provider: ollama-local
    prompt: "Review this HR document and flag any compliance issues..."
```

### 3. Sever the Network

This is the critical step. Remove all network access from the machine:

**Option A — Hardware air-gap:** Physically remove or disable the Wi-Fi card and ethernet adapter. For a server, don't connect it to any network at all. Boot from a read-only USB if you want to be thorough.

**Option B — Software firewall (belt and suspenders):**
```bash
# Block all outbound traffic — this is your last line of defense
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT DROP
sudo iptables -A INPUT -i lo -j ACCEPT   # local loopback only
sudo iptables -A OUTPUT -o lo -j ACCEPT
```

**Option C — Dedicated VLAN:** If you can't fully air-gap, isolate the machine on a private VLAN with no internet egress and no access to other sensitive network segments.

For anything touching real sensitive data: use Option A or add Option B on top of whatever network segmentation you already have.

### 4. Run Your Workflows

Now OpenClaw processes everything locally. Feed it documents, run analysis, generate reports — all the LLM capability, none of the data exposure.

Example task: HR document review
```yaml
tasks:
  hr-document-review:
    provider: ollama-local
    triggers:
      - cron: "0 9 * * 1-5"  # weekday mornings
    steps:
      - read: "/data/hr/pending/*.pdf"
      - prompt: |
          Review each document for:
          - Compliance gaps vs. current labor law
          - Missing required fields or signatures
          - Language that could create liability
          Summarize findings in a table, flag critical issues.
      - write: "/data/hr/reviews/daily-summary.md"
```

## What You Can Process This Way

This setup is purpose-built for data that has no business leaving your control:

- **HR documents** — employment contracts, performance reviews, compensation details, termination letters
- **Legal files** — NDAs, M&A documents, regulatory filings, attorney-client privileged materials
- **Financial records** — audit documents, board financials, acquisition targets, trading data
- **Medical records** — patient data for internal流程 automation, HIPAA-adjacent workflows
- **Proprietary code** — source code for security review, architecture analysis, without IP leaving your org
- **PII databases** — any dataset that can't be anonymized before processing

## Traditional Setup vs. Air-Gapped

| | Traditional Cloud | Air-Gapped Local |
|---|---|---|
| Data leaves your network | ✅ Always | ❌ Never |
| API costs | ✅ Per-token fees | ❌ Zero |
| Latency | Depends on connection | ✅ Local, consistently fast |
| Compliance (GDPR, HIPAA, etc.) | ⚠️ Complex DPA required | ✅ Data residency guaranteed |
| Internet required | ✅ | ❌ |
| Model capability | Slightly higher (frontier models) | ✅ Excellent (Llama 3.3, Mistral, Qwen) |

## Limitations to Know

- **Model capability gap:** Frontier models (GPT-4o, Sonnet 4, Gemini 2.5) are slightly ahead of open weights models on hard reasoning tasks. For document processing, summarization, and classification — local models are close enough that the tradeoff is worth it.
- **No real-time information:** Your local LLM can't browse the web. If you need current data as part of a workflow, you'll need a second (less sensitive) OpenClaw instance for that, with proper data separation.
- **Hardware requirements:** Ollama needs RAM and VRAM like any LLM. Llama 3.3 at 70B needs ~64GB RAM minimum. A mid-range setup (Mistral 7B, Qwen2.5 14B) runs on consumer hardware.
- **No automatic updates:** The machine is isolated. Model updates require physical media or a one-time controlled transfer. Build that into your operational procedure.

## What This Doesn't Replace

Air-gapping is a physical security control, not a magic privacy button. It doesn't protect against:

- A malicious local user with terminal access
- Keyloggers or other malware on the machine itself
- Physical theft of the machine (full-disk encryption helps here)
- Insiders with legitimate access who misuse it

Combine air-gapping with standard access controls, audit logging, and need-to-know principles. The air-gap is your last line of defense — not your only one.

## Is This Overkill?

For most people, yes. For the data that actually matters — the stuff you'd lose sleep over if it leaked — it's the only architecture that actually guarantees what you need.

Most "private AI" solutions are really just "we promise." Air-gapping is "we couldn't send this data out even if we wanted to."

That's a meaningful difference.
