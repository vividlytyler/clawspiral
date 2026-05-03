---
title: "Invoice Processing with OpenClaw"
description: "How OpenClaw can handle accounts payable and receivable — receiving invoices via email or file drop, extracting data with OCR, and organizing for accounting software import."
pubDate: 2026-03-26
category: business-finance
difficulty: intermediate
tags: ["invoicing", "accounting", "ocr", "ap", "ar", "automation", "email", "tesseract", "smtp", "reconciliation", "exceptions"]
featured: false
image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop"
---

Invoice processing is repetitive, error-prone, and takes real time. OpenClaw can receive invoices, extract the key data, and prepare it for import into accounting software — or maintain a simple bookkeeping file directly.

## Two Sides: AP and AR

**Accounts Payable (AP)** — invoices you receive and need to pay
**Accounts Receivable (AR)** — invoices you send and need to collect

OpenClaw handles both, with slightly different flows.

### How It Connects: A Concrete Config

The pieces that make this work (as OpenClaw config):

```json
{
  "invoices": {
    "ap": {
      "watchFolder": "~/invoices/ap",
      "archiveFolder": "~/invoices/ap/archive",
      "threshold": 1000,
      "approvalChannel": "telegram",
      "ledger": "~/invoices/ledger.csv"
    },
    "ar": {
      "outboundFolder": "~/invoices/outbound",
      "smtpFrom": "invoices@yourdomain.com",
      "trackingLog": "~/invoices/ar-tracking.json"
    }
  }
}
```

A file lands in `~/invoices/ap/`, OpenClaw:
1. Runs OCR if it's an image, or parses directly if it's a text PDF
2. Extracts structured fields (vendor, amount, date, due, number)
3. Checks duplicate invoice numbers against the ledger
4. If amount > threshold → Telegram approval before anything else
5. Else → writes directly to ledger and archives

The IMAP watcher runs on a cron (every 15 minutes is typical) checking `invoices@yourdomain.com` for new messages with PDF attachments. The file watcher is immediate — drop a file, it processes right away.

## Receiving Invoices: AP Flow

### Via Email

Set up a dedicated email address (e.g., `invoices@yourdomain.com`) or a filter that forwards invoices to a processing address. OpenClaw monitors via IMAP.

**Gmail/Google Workspace filter example** (for auto-forwarding vendor invoices):
- `from:(@acme.com OR @serverco.com)` + `has attachment` → forward to `invoices@yourdomain.com`
- Or label invoices `invoices-to-process` and have OpenClaw watch that label via IMAP

This means vendors don't need to change how they send — you capture everything through routing rules.

```
Subject: Invoice #INV-2024-0892 from Acme Supplies
Attachment: invoice.pdf

OpenClaw extracts:
- Vendor: Acme Supplies
- Invoice #: INV-2024-0892
- Date: 2024-03-15
- Amount: $1,247.50
- Due: 2024-04-14
- Line items: (if OCR is strong enough)
```

### Via File Drop

A watched folder on your server (`~/invoices/ap/`). Drop a PDF or image, and OpenClaw processes it immediately. Useful when vendors email a PDF to you directly but you want a consistent drop point.

### Data Extraction

OpenClaw can:
- Parse PDF attachments directly (text-based PDFs)
- Use OCR via `tesseract` for image-based invoices (scanned documents)
- Extract fields: vendor, amount, date, due date, invoice number, line items

For simple invoices, regex patterns work well. For complex ones with dense tables or unusual layouts, an LLM can analyze the raw text and extract structured data. Run a few samples through and compare regex vs. LLM output to see which is worth the cost.

**Improving OCR output:** Tesseract accuracy drops on angled, low-resolution, or crumpled scans. Before running OCR:
- **Deskew the image** with `ImageMagick`: `convert input.jpg -deskew 40% output.jpg`
- **Increase DPI**: scan at 300 DPI minimum, not 72–150
- **Pre-process for contrast**: `convert input.jpg -normalize -threshold 50% output.jpg`
- **Use language models**: `tesseract input.jpg stdout -l eng+deu` (add languages for multi-language invoices)

If Tesseract still produces garbled output for a recurring vendor, that vendor's invoice format is worth capturing manually once to identify the preprocessing step that fixes it — then script that preprocessing as part of your intake pipeline.

#### Duplicate Detection

Same vendor, same invoice number within 90 days? That's almost certainly a duplicate. OpenClaw checks the ledger before recording anything:

```
Duplicate check: INV-2024-0892 from Acme Supplies
  → Found in ledger: Mar 15, $1,247.50 (status: PAID)
  → SKIPPING. Telegram alert: "Possible duplicate — INV-2024-0892 from Acme Supplies ($1,247.50) already in ledger as PAID."
```

You decide: re-process, archive as paid, or flag for review.

### What Happens Next

Options depending on your workflow:

**Option A: CSV Export**
```
vendor,invoice_number,date,due_date,amount,category,paid
Acme Supplies,INV-2024-0892,2024-03-15,2024-04-14,1247.50,office supplies,FALSE
```
Import into QuickBooks, Xero, Wave, or any accounting software.

**Option B: Direct Entry**
If OpenClaw has access to your accounting software's API (QuickBooks, FreshBooks, etc.), it can create the vendor and bill entry directly — though this requires OAuth setup per platform.

**Option C: Simple Ledger**
A single `invoices.csv` that serves as your books for the year. At tax time, export and hand to your accountant.

### Approval Routing

For larger invoices, OpenClaw routes them for human review before anything gets marked paid:

```
Invoice #INV-2024-0901 from ServerCo
Amount: $3,840.00 — OVER THRESHOLD ($1,000)
Due: Apr 20

→ Telegram to Tyler: "ServerCo invoice for $3,840 — approve?"
  [Approve] → mark scheduled for payment
  [Flag]    → move to hold folder
  [Reject]  → log as disputed
```

Small invoices (under your threshold) go straight to the ledger. You decide what the threshold is and it can be vendor-specific — always approve a known vendor, always flag a new one over $500.

What the inline keyboard actually looks like in Telegram:

```
🧾 Invoice #INV-2024-0901 from ServerCo
💰 $3,840.00 — due Apr 20, 2024
Category: server hosting

[ Approve ]  [ Flag ]  [ Reject ]
```

Once you tap Approve, OpenClaw marks it as `SCHEDULED` in the ledger and archives the file. If you tap Flag, it moves to `~/invoices/ap/hold/` for manual follow-up. If you reject it, the ledger entry is tagged `DISPUTED` and the invoice file goes to `~/invoices/ap/disputed/`.

The state machine is clean: `RECEIVED → PENDING_APPROVAL → (APPROVED | FLAGGED | REJECTED) → PAID / DISPUTED`. You can always query any invoice by number and see exactly where it sits.

#### Vendor-Specific Approval Rules

Rather than a single global threshold, build rules around vendors you trust vs. ones you don't:

```json
{
  "approvalRules": [
    { "vendor": "Acme Supplies",    "threshold": 5000, "autoApprove": true },
    { "vendor": "ServerCo",          "threshold": 1000, "autoApprove": false },
    { "vendor": "New Vendor",        "threshold": 0,    "alwaysFlag": true },
    { "vendor": "CloudHost Pro",     "threshold": 2000, "autoApprove": true, "category": "hosting" }
  ]
}
```

New vendors (not in your vendor list) always get flagged regardless of amount — you confirm the bank details and entity before any money leaves. Known vendors with a good payment history get a higher implicit threshold.

### Recurring Bills

Many expenses are predictable: hosting, software subscriptions, rent. Set these up once:

```
Vendor: Linode
Amount: $120/month
Due: 15th of each month
Category: hosting
Auto-enter: TRUE
Notify: only on deviation from $120
```

OpenClaw creates the ledger entry automatically and only bothers you if the charge looks wrong.

## Sending Invoices: AR Flow

Generate invoices based on tracked time, project milestones, or recurring billing. A concrete example:

```
Project: Website Redesign — Phase 2 (Widget Corp)
Date: March 28, 2026
Hours logged:
  - Strategy & discovery:  6h @ $150 = $900
  - Design mockups:       12h @ $150 = $1,800
  - Dev handoff docs:     4h  @ $125 = $500
  - Subtotal:                       $3,200
  - Expenses (stock photos, fonts): $89.20
  - Total:                          $3,289.20
  - Due: Net 30 (April 27, 2026)
```

OpenClaw generates the invoice, outputs it as a PDF, and:

- **Emails it via SMTP** directly to the client with a professional subject line and body
- **Drops it in `invoices/outbound/`** for manual review before sending
- **Creates a tracking entry** immediately so nothing falls through the cracks

### A Real Follow-Up Sequence

Chasing late payments is uncomfortable. OpenClaw handles it politely and automatically:

```
Day 1 (due date):     Invoice INV-2024-0892 is due today
Day 7 (first nudge):  "Hi, just a reminder — INV-2024-0892 ($1,247.50) was due March 15."
Day 14 (second nudge): "Following up — INV-2024-0892 is now 14 days overdue."
Day 21 (final notice): "This is the final notice for INV-2024-0892. Please arrange payment."
```

Each message is pre-approved by you and sent only if the invoice is genuinely overdue. You can customize the tone, delay intervals, and cutoff point.

**How the timing works:** The AR tracking log records `due_date` for each invoice. A daily cron (e.g., 9 AM weekdays) runs a query against overdue invoices, calculates days elapsed since `due_date`, and sends the appropriate nudge based on the interval. OpenClaw reads the tracking log, not your email — so it knows an invoice is overdue even if the client never replied.

## Tracking Payment Status

OpenClaw maintains a live status log you can query at any time:

```
INV-2024-0892 | Acme Supplies  | $1,247.50 | SENT | DUE: Apr 14 | OVERDUE 7d
INV-2024-0891 | Office Depot   |   $234.00 | SENT | DUE: Apr 10 | PAID ✓
INV-2024-0890 | ServerCo       | $3,840.00 | SENT | DUE: Apr 20 | PENDING ✓
```

Weekly summary (every Monday morning):
> "You have 3 invoices due in the next 7 days totaling $4,891.00. 1 overdue invoice (Acme Supplies, $1,247.50, 7 days late)."

## Recording Payments & Reconciliation

Getting an invoice into the ledger is only half the loop. Recording when it actually gets paid closes it.

### Payment Recording

When you pay a bill — by bank transfer, check, or credit card — tell OpenClaw:

```
/paid INV-2024-0892
/paid INV-2024-0892 --date 2026-04-14 --method "Bank transfer" --ref "TXN-8841"
```

OpenClaw updates the ledger:

```
Acme Supplies,INV-2024-0892,2024-03-15,2024-04-14,1247.50,office supplies,TRUE,2026-04-14,Bank transfer,TXN-8841
```

The `paid_date`, `payment_method`, and `payment_ref` fields go from empty to populated. Now your ledger shows a clean audit trail.

### Bank Reconciliation

A daily cron matches ledger entries against your bank transaction feed (CSV export from your bank). If OpenClaw sees a debit to `Acme Supplies` for $1,247.50 on or around April 14, it can auto-match and close the loop without you doing anything:

```
Bank feed entry: Apr 14 — DR Acme Supplies — $1,247.50
Matched ledger: INV-2024-0892, due Apr 14, $1,247.50
→ Marking PAID. Telegram: "INV-2024-0892 paid and reconciled."
```

What the bank feed actually looks like — most banks let you export transactions as CSV:

```
Date,Description,Amount,Running Balance
2026-04-14,"ACME SUPPLIES EFT",-1247.50,18432.18
2026-04-14,"SERVERCO WIRE TRANSFER",-3840.00,15292.18
2026-04-15,"OFFICE DEPOT SUPPLIES",-234.00,15058.18
```

OpenClaw normalizes the descriptions (strips EFT/wire/ACH suffixes, lowercases) before matching against vendor names in the ledger. Exact amount match on the due date (or within a 3-day window) creates the auto-match. Unmatched debits get flagged: something left your account that isn't in the ledger. Unmatched credits work the same way — a payment that arrived but wasn't recorded.

### Late Payment Escalation

The follow-up sequence covers polite nudges. But some invoices need escalation beyond that — and it helps to think about what escalation actually looks like before you're in the moment.

**Informal escalation (Day 21–30 overdue):**
```
"Hi — just following up again on INV-2024-0892. I know things get busy, 
but wanted to make sure this didn't slip through. Let me know if there's 
anything I can help with on our end."
```

**Formal notice (Day 30–45):** Switch to written communication. Email with read receipt, or a dedicated payment portal link. At this stage the tone shifts to business-like but still not adversarial — you're establishing a paper trail.

**Collections handoff (Day 60+):** Options at this point depend on your situation:
- **Internal collections**: move to a `collections/` folder and stop sending gentle reminders; switch to payment-plan-offer tone
- **External collections agency**: if you're within jurisdiction time limits and the amount justifies the fee (typically 25–40% of recovered amount), hand off with the full invoice history
- **Dispute resolution**: if you believe the invoice is legitimately disputed, log it as `DISPUTED` and stop the follow-up sequence; don't let a genuine dispute sit in a payment-chasing loop

The key is that OpenClaw tracks `last_contact_date` and `escalation_level` on each overdue invoice, so you can inspect any invoice's status at any time and know exactly where it stands in the escalation path.

![Reconciliation and payments](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop)

### Partial Payments & Payment Plans

Some invoices get paid in chunks. Record each payment against the invoice:

```
/partial INV-2024-0892 --amount 500.00 --date 2026-04-10 --method "Bank transfer"
/partial INV-2024-0892 --amount 747.50 --date 2026-04-14 --method "Bank transfer"
```

OpenClaw tracks applied amounts and flags when the balance is paid off:

```
INV-2024-0892 | Acme Supplies | $1,247.50 | PARTIAL: $500.00 paid | Balance: $747.50
INV-2024-0892 | Acme Supplies | $1,247.50 | PAID IN FULL ✓
```

For payment plans (e.g., Net-60 split into two equal payments), OpenClaw can auto-generate the schedule on invoice entry and send reminders at each milestone.

## What You Need to Set This Up

- **Email inbox** monitored via IMAP (for AP intake)
- **Watched folder** (`~/invoices/ap/`) or directory drop point (optional, for file-based AP)
- **`tesseract` OCR** installed: `sudo apt install tesseract-ocr` (for scanned/image invoices)
- **LLM access** for structured extraction from complex invoices (optional but recommended)
- **Output destination** — CSV file, accounting software API, or local ledger
- **SMTP access** for sending invoices (for AR)
- **Telegram or email channel** for approval routing and payment reminders

## Limitations

- Complex multi-page invoices with dense tables are hard to parse reliably — test your specific vendors
- OCR quality depends heavily on scan/image quality; crumpled or angled scans produce garbled output
- No native integration with most accounting software — CSV export is the realistic default; API connections require per-platform OAuth setup
- Tax calculation (VAT, HST, GST) requires jurisdiction-specific logic and isn't built in
- Recurring bill detection is rule-based — unusual charges won't auto-flag without explicit rules
- Multi-currency invoices need manual exchange rate handling or a configured rate source; OpenClaw doesn't fetch live FX rates by default
- Invoice number collisions across different vendors can cause false duplicate alerts if you use invoice number alone as the dedup key — vendor+invoice number together is more reliable

## Exception Handling: When Processing Goes Wrong

Invoice processing has failure points. Here's how to handle the common ones.

### OCR Fails Completely

Sometimes Tesseract returns garbage — a severely skewed scan, low contrast, or non-standard layout. If the extracted text is nonsense (garbled characters, amounts that don't parse, vendor name missing), OpenClaw flags it for manual review instead of feeding bad data into the ledger:

```
Invoice #INV-2024-0903 — OCR output suspicious
  Extracted: "învÓice #∫∫∫∫ from A©me Supp&es"
  Amount extracted: "NOT PARSED"
  Confidence: LOW

→ Telegram: "Could not parse invoice #INV-2024-0903 (scanned?). 
  Manual review needed — check ~/invoices/ap/hold/"
```

The file goes to `hold/` instead of being processed blindly. You fix the scan (deskew, contrast) and re-run.

### Email Routing Misses an Invoice

If a vendor sends an invoice to your personal email instead of the dedicated address, OpenClaw never sees it. Mitigations:
- Set up a sender rule on your end: forward anything from known vendors with an invoice subject pattern to the processing address
- Add a monthly reminder to check your personal/personal-plus inbox for stray invoices
- If a vendor consistently sends to the wrong address, call them and update their records — it's worth the five-minute call

### Wrong Vendor on an Invoice

Some vendors put their client's name (your name) in the sender field but their own vendor name in the invoice body. OpenClaw extracts the vendor name from the body (the actual `From: Acme Supplies` line), not the email envelope. If it's wrong, you see it in the Telegram approval message — that's what the human review step is for.

### The Bank Feed Has No Match

Sometimes a payment leaves your account but OpenClaw can't find a matching ledger entry. Unmatched debits get flagged:

```
Unmatched debit: Apr 16 — DR Amazon Web Services — $847.23
No matching invoice in ledger (AP or AR)
→ Telegram: "Unrecognized payment: AWS $847.23 on Apr 16. 
  Match to existing invoice, add as new entry, or mark as OTHER?"
```

This catches payments that bypassed the invoice intake (e.g., a renewal charge on a card you didn't route through the normal process). You decide what it is, and it gets logged properly.

### SMTP Send Fails for AR

If the invoice email doesn't go out (wrong address, SMTP rejected, quota exceeded), OpenClaw retries once and then alerts you:

```
AR invoice #INV-2026-0004 to client@example.com — SMTP ERROR: mailbox full
Retry 1/3 in 30 min
→ If retry fails: Telegram alert with the error and the invoice file path
```

The invoice isn't marked as SENT in the tracking log until the SMTP call succeeds. You don't have a gap where the invoice looks sent but the client never received it.

## The Real Value

For a freelancer or small business doing $50–200k/year in revenue, this automates the boring paper-pushing of invoicing and bill tracking. You still review everything before it goes out or gets paid — but you stop copying numbers from PDFs into spreadsheets by hand. Late-payment chasing becomes automatic and professional rather than awkward and ad hoc.
