---
title: "System Administration with OpenClaw"
description: "Using an AI agent as a always-on system administrator — monitoring server health, managing Docker containers, analyzing logs, and handling maintenance tasks."
pubDate: 2026-03-26
category: lifestyle-wellness
difficulty: intermediate
tags: ["system-admin", "docker", "server", "monitoring", "linux", "ubuntu", "watchtower", "cron", "self-hosted", "ssh", "portainer", "incident-response", "performance-tuning", "status-page", "security-hardening", "self-healing", "restart-policy", "systemd", "healthchecks"]
image: "https://images.unsplash.com/photo-1600267204026-85c3cc8e96cd?w=1200&auto=format&fit=crop"
---

A server that never sleeps deserves an admin that never forgets. OpenClaw running on a home server or VPS can monitor system health, manage containers, analyze logs, and handle routine maintenance — with the judgment to know when to alert you and when to fix it automatically.

## What OpenClaw Can Access

With shell command execution, OpenClaw can:
- **Read system files** — `/proc/cpuinfo`, `free -m`, `df -h`, `uptime`
- **Query Docker** — `docker ps`, `docker logs`, `docker stats`
- **Read logs** — `/var/log/syslog`, systemd journals, application logs
- **Run commands** — updates, restarts, configuration changes

With elevated (sudo) permissions:
- **Package management** — `apt update && apt upgrade`
- **Service control** — `systemctl restart`, `systemctl status`
- **Firewall rules** — `ufw`, `iptables` queries
- **User management** — add/remove users, check sudo access

## Docker Stack Management

For users running Docker containers (Watchtower, Portainer, LinuxServer suite, etc.):

![Server monitoring dashboard showing container health](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop)

### Health Monitoring

OpenClaw can periodically check:
- Container status (running/stopped/exited)
- Resource usage (CPU, memory, network)
- Volume mounts (are persistent volumes accessible?)
- Port conflicts (are expected ports listening?)

### Automated Responses

Configure conditional responses:
- **Container stopped** → restart it, log the event, alert if it crashes repeatedly
- **High memory usage** → identify the culprit, suggest or execute cleanup
- **Disk space low** → find large files, suggest removal targets
- **Update available** → trigger Watchtower update, verify container restarts cleanly

### A Real Incident: Container Crash Workflow

Here's what an actual failure-and-recovery cycle looks like:

1. **4:12 AM — Sonarr stops.** OpenClaw's 30-minute health cron detects `docker ps | grep sonarr` returns empty. It runs `docker logs sonarr --since 6h` and finds: `sqlite3.OperationalError: database is locked`.

2. **4:13 AM — Diagnosis.** OpenClaw cross-references this with `docker ps -a` and finds a stuck Radarr container also holding a SQLite lock. It concludes: "Radarr and Sonarr both tried to write to the same `sonarr.db` at ~4:08 AM. Radarr won."

3. **4:13 AM — Resolution attempt.** OpenClaw stops Radarr first, then starts Sonarr. `docker start radarr` follows. Both containers are up by 4:14 AM.

4. **4:30 AM — Health check passes.** OpenClaw confirms both containers running, no new errors in logs.

5. **5:00 AM — Morning brief includes:** *"Sonarr restarted at 4:14 AM after a SQLite lock conflict with Radarr. No data loss. Consider setting up a lock timeout or migrating both to a dedicated PostgreSQL instance if this repeats."*

This is the full loop — detect, diagnose, fix, verify, report — without you touching anything.

### Self-Healing Configuration

OpenClaw can configure Docker restart policies and systemd units to self-heal without any agent involvement — for the things that should fix themselves before you even see an alert.

**Docker restart policies** are the first line of defense for containers:

```yaml
# docker-compose.yml — restart policy configuration
services:
  jellyfin:
    restart: unless-stopped
    # Options: no, always, on-failure[:n], unless-stopped

  sonarr:
    restart: on-failure:3
    # Restarts up to 3 times on non-zero exit; gives transient failures room to recover

  radarr:
    restart: on-failure:3
    # Same policy — but Radarr+Sonarr SQLite conflict needs more than restart policy
```

The SQLite lock conflict from the Sonarr/Radarr incident above is a case where restart policies alone won't solve it — both containers keep exiting with the same error, so `unless-stopped` just brings them back into the same broken state. That's where OpenClaw's diagnosis and fix (stopping Radarr first, then Sonarr) is necessary. But for simpler crashes — a segfault that doesn't recur, a process OOM-killed under load — restart policies recover silently.

**Systemd watchdog for host-level services** gives you a separate monitoring path:

```bash
# Create a systemd unit for OpenClaw health monitoring
sudo nano /etc/systemd/system/openclaw-health-check.service
```

```
[Unit]
Description=OpenClaw Health Cron Watchdog
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/bin/systemctl is-active openclaw
```

```bash
# Timer to run the check every 5 minutes
sudo nano /etc/systemd/system/openclaw-health-check.timer
```

```
[Unit]
Description=Run OpenClaw health check every 5 minutes
[Timer]
OnBootSec=1min
OnUnitActiveSec=5min
Unit=openclaw-health-check.service

[Install]
WantedBy=timers.target
```

```bash
sudo systemctl enable --now openclaw-health-check.timer
```

The watchdog runs as a separate systemd service — it can't help OpenClaw fix itself, but it can detect when OpenClaw is down and alert you through a channel OpenClaw isn't running through. For truly critical services (database, reverse proxy), the watchdog should be on a separate system or at least a separate process tree from the service it monitors.

**Custom Docker health checks** — OpenClaw can generate and deploy container-level health checks:

```bash
# Example: custom health check for a web service
docker run -d \
  --name myapp \
  --health-cmd "curl -f http://localhost:3000/health || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  --health-start-period=40s \
  myapp:latest
```

OpenClaw generates these based on what the service actually exposes — a `/health` endpoint, a database ping, a meaningful metric. Once configured, `docker ps` shows `healthy`/`unhealthy` status at a glance, and unhealthy containers can trigger automated responses.

**When self-healing is the wrong answer:**
- A crashing container that's losing data (database corruption, mid-write failure) — restart policy just buries the error
- A service that's misconfigured and keeps starting in a broken state — fix the config, don't keep restarting
- Something that requires human judgment to repair — alert and wait

OpenClaw distinguishes these: after the second restart of the same container within an hour, it stops auto-restarting and alerts you instead. That's the `on-failure:3` policy — it gives transient failures room to recover but doesn't mask a persistent problem.

### Log Analysis

Instead of `docker logs container --tail 100` and manually scanning:
- Ask OpenClaw to find errors in the last 24 hours
- Summarize common failure patterns
- Explain what a cryptic error code means
- Suggest fixes based on known issues

**Example:** You ask OpenClaw "why did my Jellyfin container stop?" It runs:
```
docker logs jellyfin --since 24h --tail 200 | grep -i error
```
Finds a segfault in `libavcodec`, cross-references it with the Jellyfin changelog, and tells you: "Jellyfin 10.9.x has a known FFmpeg incompatibility with Ubuntu 24.04. Roll back to 10.8.x or wait for 10.9.1."

## Cron-Based Maintenance

OpenClaw's cron scheduling enables automated maintenance windows:

### Weekly Health Check

Every Sunday at 3 AM:
```
- Check disk space
- Review container status
- Check for available updates
- Summarize the week's logs
- Alert on anything requiring attention
```

### Monthly Cleanup

First of Monday of each month:
- Clear old logs (`journalctl --vacuum-time=30d`)
- Remove unused Docker images
- Check for security updates
- Backup important config files

### A Real Cron Configuration

Here's what an actual OpenClaw cron setup looks like for a home server:

**Health check (every 30 minutes):**
```json
{
  "name": "Server Health Check",
  "schedule": { "kind": "cron", "expr": "*/30 * * * *", "tz": "America/Vancouver" },
  "payload": { "kind": "agentTurn", "message": "Run a quick server health check: docker ps, df -h, free -m, uptime. If anything looks wrong (disk >85%, memory >90%, any stopped containers), send me a Telegram alert with details." },
  "sessionTarget": "isolated"
}
```

**Weekly maintenance (Sunday 3 AM):**
```json
{
  "name": "Weekly Server Maintenance",
  "schedule": { "kind": "cron", "expr": "0 3 * * 0" },
  "payload": { "kind": "agentTurn", "message": "Run weekly maintenance: (1) docker image prune -a --filter "until=168h" to remove unused images, (2) journalctl --vacuum-time=30d, (3) check for apt updates, (4) verify backup ran successfully, (5) report findings." }
}
```

This two-job setup gives you constant visibility without micromanaging.

## Common Maintenance Tasks

Here are specific tasks you can hand off to OpenClaw with the exact commands it runs under the hood:

**Find what's eating disk space:**
```
ncdu -x / --exclude=/proc --exclude=/sys
```
OpenClaw interprets the output, identifies large unused directories (old backups, Docker build cache, unused images), and asks to clean up.

**Check for failed services:**
```
systemctl --failed
```
Hand off to OpenClaw to explain each failure and attempt restart or surface the root cause.

**Review authentication failures:**
```
grep "Failed password" /var/log/auth.log | tail -20
```
OpenClaw can spot patterns — a single IP hammering SSH, a user mistyping their password repeatedly — and update your firewall rules or alert you.

**Docker prune safely:**
```
docker image prune -af --filter "until=168h" && docker container prune -f && docker volume prune -f
```
Removes images older than a week, stopped containers, and unused volumes. Safe because it's time-based — you won't accidentally nuke today's build.

**Check SMART status on a drive:**
```
smartctl -a /dev/sda
```
OpenClaw parses the output and tells you if any attributes (reallocated sectors, pending sectors, UDMA CRC errors) warrant attention.

**Security update check:**
```
apt list --upgradable 2>/dev/null | grep -i security
```
Only shows security patches, avoiding recommended but non-critical package updates.

With a simple file-based output, OpenClaw can maintain a status page:

```
### Server Status (updated 2026-03-26 18:00)
- **Uptime:** 47 days
- **CPU:** 12% avg, 3% idle
- **Memory:** 6.2G / 32G used
- **Disk:** 234G / 512G used (46%)
- **Containers:** 12 running, 0 stopped
- **Last backup:** 2026-03-25 02:00
```

This can be served as a static page via Cloudflare Pages or similar.

### A Real Status Page Setup

For a practical status page that updates on a schedule:

**1. OpenClaw writes a JSON status file every 15 minutes:**
```json
{
  "updated": "2026-03-26T18:00:00-07:00",
  "uptime_seconds": 4078800,
  "cpu_avg": 12,
  "memory_used_gb": 6.2,
  "memory_total_gb": 32,
  "disk_used_gb": 234,
  "disk_total_gb": 512,
  "containers_running": 12,
  "containers_stopped": 0,
  "last_backup": "2026-03-25T02:00:00-07:00",
  "alerts": []
}
```

**2. A lightweight HTTP server (nginx or a tiny Go binary) serves this JSON:**
```nginx
location /status.json {
  add_header Cache-Control "no-store";
  try_files /var/www/status/status.json = 404;
}
```

**3. A simple HTML page fetches and displays it:**
```javascript
fetch('/status.json')
  .then(r => r.json())
  .then(data => {
    document.getElementById('uptime').textContent = Math.floor(data.uptime_seconds / 86400) + ' days';
    document.getElementById('disk').textContent = Math.round(data.disk_used_gb / data.disk_total_gb * 100) + '%';
  });
```

OpenClaw writes the JSON; nginx serves it; a static HTML page displays it. No database, no backend complexity. The whole stack fits in a 50MB Docker container if needed.

## Backup Strategy with OpenClaw

Backups are only valuable if you know they're working. OpenClaw can own the verification loop:

**Daily backup check:**
```
# Verify borgmatic/restic backup completed last night
borg list /path/to/repo | tail -1
restatic snapshots 2>/dev/null | tail -1
# Check backup destination has space
df -h /backup-drive
```

OpenClaw can then message you: *"Backup from 02:00 verified: 847MB snapshot, 14 days retention intact, destination has 180GB free."*

**Monthly offsite sync check:**
If you're syncing backups to B2/Backblaze or rsync.net:
```
restic -r b2:bucket:backups snapshots --json | jq '.[] | .time' | head -1
```
Verifies your offsite copy is actually current. OpenClaw catches cases where local backups work but the sync job silently failed for weeks.

**Config file backup:**
Back up your Docker Compose files, cron configs, and `/etc/` selectively:
```bash
tar czf /backups/configs-$(date +%Y%m%d).tar.gz \
  /home/user/docker-compose \
  /etc/cron.d \
  /etc/nginx \
  ~/.config/openclaw
```
OpenClaw can schedule this weekly and upload to your backup destination.

## What You Need to Set This Up

- **OpenClaw on a Linux host** — bare metal, VPS, or Raspberry Pi; Ubuntu 22.04+ recommended
- **Shell access** — OpenClaw needs to be able to run commands via `exec`; elevated (sudo) access is optional depending on what you want to automate
- **Docker** (optional but recommended) — for the LinuxServer suite, Watchtower, and similar containerized workloads
- **Watchtower** (optional) — automates container updates; pair it with OpenClaw's monitoring for visibility into what Watchtower did
- **Disk space monitoring** — `df -h` is built-in; for more structured alerts, tools like `ncdu` give OpenClaw better data to work with
- **Optional: UPS with USB reporting** — if your server has power backup, tools like `apcupsd` let OpenClaw check power status and alert on outages

Start without elevated permissions. Add sudo access only for specific tasks once you've verified the behavior is correct.

## Network Monitoring

![Server rack with network cables](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop)

OpenClaw can watch your network stack alongside the server itself:

**Monitor listening ports:**
```
ss -tulpn | grep LISTEN
```
OpenClaw compares the output against a known-good baseline and alerts on unexpected listeners — a new service you don't remember installing, or a port that should be firewalled.

**Check firewall status:**
```
ufw status numbered
iptables -L -n --line-numbers
```
Hand off to OpenClaw when you suspect an unauthorized rule was added or an existing rule is too permissive.

**Docker network topology:**
```
docker network ls
docker network inspect bridge
```
OpenClaw can map which containers can reach which others, useful for diagnosing unexpected service-to-service communication.

**A real network alert:**
You wake up to: *"Port 22 has received 847 failed SSH attempts in the last 30 minutes from 14 different IPs, mostly from 103.152.220.x range. fail2ban has already banned 11 of them. Recommend confirming your own IP is not blocked: `fail2ban-client status sshd`. If you need to whitelist your address, let me know."*

OpenClaw didn't stop the brute force — fail2ban did — but it synthesized the event, gave you the context to understand it, and flagged the action you might need to take.

## Alert Routing and Escalation

Not every alert should hit you the same way. OpenClaw can tier its notifications:

**Triage by severity:**

| Event | Action |
|-------|--------|
| Disk >90% | Immediate Telegram alert with cleanup targets |
| Container down (critical service) | Immediate alert with restart command ready to run |
| Container down (non-critical) | Log it, restart it, mention in next brief |
| Failed auth attempts spike | Immediate alert if >50 in 10 min, otherwise mention in daily rollup |
| Backup verification failed | Immediate alert with last known good snapshot time |

**Escalation path:**
```
# Power status check
apcupsd → OpenClaw heartbeat → Telegram alert (immediate)
          ↓ if no response in 5 min
          Email via external SMTP (e.g., ntfy.sh or SendGrid)
```

**UPS monitoring with apcupsd:**
If your server is connected to a UPS via USB or network, `apcupsd` provides runtime, load, and battery status:
```bash
apcaccess status
```
Example output OpenClaw parses:
```
APC      : 001,036,0857
DATE     : 2026-03-26 14:32:00 -07:00
HOSTNAME : home-server
VERSION  : 3.14.14
UPSNAME  : Eaton-5E-1500
MODEL    : USB UPS
STATUS   : ONLINE
LINEV    : 123.4 Volts
LOADPCT  : 35.0 Percent
BCHARGE  : 100.0 Percent
RUNTIME  : 30.0 Minutes
MBATTCHG : -5 Percent
MINTIMEL : 10 Minutes
MAXTIME  : 0 Seconds
```
OpenClaw tracks runtime: at 35% load, you have 30 minutes of battery. That's enough to finish a Jellyfin recording in progress, complete a MariaDB write flush, and do a clean shutdown — but only if there's a plan. OpenClaw messages you:
> *"UPS at 30min runtime (35% load). Battery 100%. If you want a graceful shutdown before power runs out, I can initiate now — or if you're watching something on Jellyfin, I can wait until it finishes recording at 7PM and then shut down gracefully."*

When STATUS changes to `ONBATT` (power loss):
> *"Power lost. UPS running on battery — 22 minutes runtime remaining at current load. Monitoring. Will initiate graceful shutdown at 10% battery or if runtime drops below 5 minutes, whichever comes first. No action needed from you unless you want to override."*

When `STATUS: MISSING` (UPS disconnected):
> *"UPS status not responding — either the USB cable was unplugged or apcupsd lost contact. Last known state: ONLINE at 14:28. Check the USB connection and run `apcupsd restart` if needed."*

**Notification fatigue prevention:**
OpenClaw batches similar events. Rather than sending 20 messages about a flaky container, you get one: *"Plex restarted 4 times today between 14:00–16:00. Each time it self-healed within 2 minutes. Likely a transcoding memory issue — recommend increasing the container memory limit from 4G to 8G."* One message, one actionable recommendation.

![Alert dashboard showing triage flow](https://images.unsplash.com/photo-1553484771-371a605b060b?w=1200&auto=format&fit=crop)

### Severity Response Templates

Here are concrete response templates OpenClaw can use when different severity events fire:

**Critical (immediate Telegram + email backup):**
> *"ALERT: [service] is down on [host]. Auto-restart attempted. Status: [running/down]. Last good response: [timestamp]. Action may be needed — reply 'status' for full diagnostics."*

**Warning (Telegram only, non-blocking):**
> *"Warning: [metric] at [value] on [host]. Top consumers: [list]. Suggest cleaning [target]. Approve with 'clean' or ignore."*

**Info (brief, batch-eligible):**
> *"Log rollup: [week/day]. [N] restarts (self-healed), [N] auth failures (fail2ban blocked), [N] apt pending. Reply 'clean packages' to free space."*

## When OpenClaw Isn't Available

A gap worth planning for: what happens when OpenClaw is down for maintenance, a model outage, or a bug?

**Known gaps:**
- Health cron doesn't fire → no monitoring during that window (detectable by checking `openclaw cron runs` list)
- If OpenClaw crashes mid-command → the command may or may not complete; check `docker ps` to verify
- Network/HTTP actions may fail while OpenClaw is restarting (notifications, web fetches)

**Mitigations:**
- Keep Watchtower on so containers auto-restart even without OpenClaw
- Use `systemctl status openclaw` in a separate monitoring tool (Uptime Kuma, Grafana) to detect OpenClaw itself being down
- Preserve critical automations (fail2ban, UPS apcupsd) outside OpenClaw — those should survive even if OpenClaw is offline
- For critical health monitoring, run a lightweight fallback: `docker events --since 5m` in a separate systemd timer, writing anomalies to a file OpenClaw reads on restart

**Recovery procedure:**
When OpenClaw comes back after an outage, it will read its memory files and notice the gap. It will typically run a catch-up health check and report anything that needs attention. On restart, it reads `memory/YYYY-MM-DD.md` and any pending events from the outage window.

## Security Considerations

![Data center security concept](https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop)

Running an AI with elevated permissions is powerful but risky. Here's how to think about it:

**Threat model basics:**

| Risk | Mitigation |
|------|------------|
| AI executes unintended destructive command | Test commands in dry-run mode first; use `trash` aliases instead of `rm`; require approval for destructive ops |
| OpenClaw compromised (prompt injection, etc.) | Don't expose OpenClaw directly to the internet; run it behind a reverse proxy with auth; limit what it can do without approval |
| API keys stolen via shell history | Use environment variables, not hardcoded secrets; prefer secret managers ( Doppler, 1Password CLI) over plain env files |
| Privilege escalation via misconfigured sudo | Give only the specific commands needed, not full sudo; check `sudo -l` regularly |
| Data exfiltration via OpenClaw's file access | Don't give OpenClaw access to sensitive directories it doesn't need; apply least-privilege to the exec tool |

**Practical hardening:**

1. **Isolation**: Run OpenClaw in a container or as a dedicated user with a limited set of permissions. It doesn't need root by default — most monitoring tasks work fine as a standard user with `docker` group membership.

2. **Approval gates**: Set `ask: on-miss` (or `ask: on` for elevated) in the exec tool config. This means destructive or unusual commands require explicit approval before running — you see the exact command and can allow or deny it.

3. **Network exposure**: OpenClaw should never be directly exposed to the internet. It binds to localhost by default — keep it that way. Use a VPN (Tailscale), SSH tunnel, or Cloudflare Tunnel for remote access instead of opening ports.

4. **Secret management**: Instead of embedding API keys in cron JSON or env files:
   ```bash
   # Use environment variables from a secrets file
   export $(grep -v '^#' /home/user/.secrets.env | xargs)
   ```
   OpenClaw reads these at startup. Rotate them regularly.

5. **Audit trail**: OpenClaw's memory files (`memory/YYYY-MM-DD.md`) are a built-in audit log. Review them periodically to see what commands were run and when. You can also pipe `bash` history to a file and have OpenClaw summarize anomalies.

6. **Rate limiting**: If OpenClaw is exposed via an API (e.g., for external integrations), add rate limiting and IP allowlisting at the reverse proxy level. An unlimited API endpoint is an invitation for abuse.

**The tradeoff is between capability and security.** Full OS access enables full automation; restrict based on your threat model. Start locked down, open up only what each specific workflow requires.

## Remote Access Patterns

When you're traveling and need to reach your home server, a few approaches work well:

**Tailscale (easiest):**
```
# Install on both client and server
curl -fsSL https://tailscale.com/install.sh | sh
tailscale up --accept-routes
```
OpenClaw can manage the Tailscale daemon via `systemctl`. Once connected, you get a private network address (e.g., `100.64.x.x`) that works even behind NAT. No port forwarding needed.

**SSH tunnel (manual but reliable):**
```
ssh -L 8080:localhost:80 user@your-server -N
# Then open localhost:8080 in your browser for the web UI
```
OpenClaw can generate and store SSH key pairs for tunnel access, and manage authorized_keys for passwordless login.

**Cloudflare Tunnel (no public IP needed):**
```
cloudflared service install
cloudflared tunnel create home-server
cloudflared tunnel route dns home-server your-subdomain.your-domain.com
```
OpenClaw can update the tunnel config, check status via `cloudflared tunnel list`, and alert if the tunnel goes down.

For all remote access methods: keep the SSH key on your client machine, not on the server itself. If OpenClaw needs to run commands remotely, use `ssh -i /path/to/key user@host 'command'` from the server.

## Performance Tuning

Beyond monitoring, OpenClaw can actively tune your system based on observed behavior:

![System performance monitoring terminal showing resource graphs](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop)

**Container resource tuning:**
After a week of `docker stats` data, OpenClaw can recommend memory limits. Here's what that looks like in practice:

```
CONTAINER ID   NAME      CPU %   MEM USAGE / LIMIT     MEM %   NET I/O           BLOCK I/O
a1b2c3d4e5f6   plex      124%    7.21GiB / 3.98GiB     181%    1.24GB / 823MB    89.4MB / 12.4GB
b2c3d4e5f6a1   sonarr    0.32%   186MiB / 256MiB       72.6%   45.2MB / 12.1MB    8.32MB / 0B
c3d4e5f6a1b2   radarr    0.28%   142MiB / 256MiB       55.4%   34.7MB / 8.9MB     6.11MB / 0B
d4e5f6a1b2c3   swag      0.09%   88.4MiB / 128MiB      69.0%   412MB / 156MB      1.23MB / 0B
```

OpenClaw reads this output and identifies the critical issue immediately: Plex is using 7.21GB against a 3.98GB limit — it's swapping. MEM % shows 181%, meaning it's over the limit by nearly 2x. The 124% CPU reflects thrashing during concurrent transcodes.

Concrete recommendation:
> *"Plex is at 181% of its memory limit (7.2G used / 4G cap) — it's been swapping heavily, which explains the transcoding stutters you mentioned. Recommended fix in docker-compose.yml:
> `mem_limit: 8G`
> `memswap_limit: 8G`
> (setting both equal disables swap entirely — more predictable performance)
> After applying, monitor for 24h to confirm RAM usage stabilizes around 6-7G with no OOM kills in `docker logs plex`."*

OpenClaw can also flag containers using suspiciously little memory relative to their workload — a database at 40MB might have a query causing it to cache everything inefficiently, versus one properly sized at 800MB with good buffer management.

**Kernel parameter adjustment:**
```
sysctl -a | grep -E 'net.ipv4.tcp|vm.swappiness|fs.file-max'
```
OpenClaw can parse your current sysctl values, cross-reference with workload (e.g., a file server vs. a reverse proxy), and suggest changes — applying them for you if you approve.

**IO scheduler selection:**
For SSDs:
```
cat /sys/block/sda/queue/scheduler
# If set to [mq-deadline] or cfq, switch to none for lower latency
echo none > /sys/block/sda/queue/scheduler
```
For HDDs, the BFQ or Kyber schedulers reduce lag during concurrent access. OpenClaw can detect your disk type and recommend the appropriate scheduler.

**Network buffer tuning:**
If you're running a high-traffic service (VPN, proxy, game server), OpenClaw can adjust net.core.rmem_max, net.core.wmem_max, and related parameters:
```
sysctl -w net.core.rmem_max=16777216
sysctl -w net.core.wmem_max=16777216
```
It'll validate the change, monitor for improvement, and persist it to `/etc/sysctl.d/99-openclaw-tuning.conf`.

**Thermal throttling detection:**
```
vcgencmd measure_temp
throttled=$(vcgencmd get_throttled)
echo $throttled
```
On Raspberry Pi or systems with `vcgencmd`, OpenClaw can detect if the CPU has been throttled due to heat and suggest cooling improvements.

## ZFS Health Monitoring

If you're running ZFS (increasingly common on home servers for its snapshot and redundancy features), OpenClaw can monitor pool health beyond what `df -h` shows:

**Pool status:**
```bash
zpool status -v
```
OpenClaw checks for: degraded vdevs, failed disks, resilver in progress, and checksum errors. A non-zero checksum error count is often the first sign of a failing drive before SMART picks it up.

**Pool capacity:**
```bash
zpool list -o name,size,alloc,free,cap,health
```
OpenClaw alerts when capacity crosses 80% — ZFS performance degrades significantly above 80% and hits hard limits near 95%. Unlike ext4, you can't just resize a ZFS pool; you need to add vdevs or replace drives proactively.

**Scrub health and timing:**
```bash
zpool status | grep scrub
# Last scrub: 2026-03-15 02:00, 1.2T scanned, 0 errors
```
OpenClaw tracks scrub frequency (aim for monthly) and error counts. A scrub that hasn't run in 60+ days should be triggered:
```bash
zpool scrub tank
# Run during low-usage hours — scrubs are I/O intensive
```

**Snapshot lifecycle:**
```bash
zfs list -t snapshot -o name,used,referenced,creation | grep tank
```
OpenClaw can manage snapshot retention — roll up old snapshots, identify large snapshots consuming space, and automate `zfs destroy tank/manual@weekly-2026-03-01`-style cleanup.

**A real ZFS alert:**
> *"ZFS pool 'tank' is at 78% capacity — crossed your 80% threshold. Top consumers: tank/docker/volumes at 412GB, tank/media at 1.8TB. Next largest snapshot: tank/docker/volumes@2026-01-15 at 89GB (created 5 months ago). Recommend running `zfs destroy tank/docker/volumes@2026-01-15` to reclaim space, then add a new vdev or drive to the pool before you hit 85%."*

![Network-attached storage array — ZFS pool concept](https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=1200&auto=format&fit=crop)

## Disk I/O Monitoring

Beyond disk space (which `df -h` covers), I/O bottlenecks can slow down your entire system without showing up as high CPU or memory usage:

**Check disk I/O stats:**
```bash
iostat -x 1 5
```
OpenClaw parses the output and identifies:
- High `%util` (disk saturation — if consistently >80%, you have an I/O bottleneck)
- High `await` (average time in milliseconds for I/O requests — SSDs should be <1ms, HDDs <20ms)
- Large `avgqu-sz` (queue depth — how many requests are waiting)

**Find what's causing I/O:**
```bash
iotop -b -n 3
```
OpenClaw can run this during a slow period and show you which process is thrashing the disk — useful for tracking down a runaway log writer or a container with a disk leak.

**Identify heavy write loads:**
```bash
find /var/lib/docker/containers -name "*-json.log" -exec ls -lh {} \; | sort -k5 -h
```
Large Docker log files can sometimes be the culprit. OpenClaw can rotate or truncate them with `truncate --size 0`.

**SSD health monitoring (SMART):**
```bash
smartctl -H /dev/sda
smartctl -A /dev/sda | grep -E "Reallocated_Sector|Current_Pending_Sector|Offline_Uncorrectable"
```
For systems where `smartctl` is available, OpenClaw checks attribute 5 (reallocated sectors), 197 (current pending sector count), and 198 (offline uncorrectable). A rising count on any of these is an early warning sign before failure.

## Capacity Forecasting

OpenClaw can project resource trends before they become crises — you fix the problem before it becomes a midnight pager event:

**Disk growth projection:**
OpenClaw tracks disk usage over time (a weekly cron storing `df -h` output to a log file), then extrapolates:
> *"Your media drive is growing at ~15GB/week. At this rate, the 1.8TB drive will be full in approximately 11 weeks (early September). Current cleanup candidates: old Plex-optimized versions (42GB), completed downloads in /downloads/complete that are already seeded (18GB), Jellyfin transcoding cache (9GB). Want me to clean any of these up, or set a reminder to add a drive in September?"*

**Memory trend analysis:**
Over weeks of `free -m` snapshots:
> *"Your average memory usage has crept from 52% to 61% over the past 30 days, almost entirely from Jellyfin's transcoding cache growing. By end of summer you'd be at 78% average with spikes into swap territory. Recommend pre-emptively adding 8GB RAM or adding a cron to clear the Jellyfin cache directory every Sunday night."*

**Container count growth:**
If you're like most LinuxServer users, the Docker compose folder grows over time:
> *"You've added 3 new containers in the past 60 days (Uptime Kuma, Grafana, Vaultwarden). Average CPU per container: 0.4%, average RAM: 230MB. Your current headroom (3.2G / 32G) can accommodate about 14 more containers before memory becomes a concern. CPU headroom is fine. You're not at risk — just tracking."*

**Proactive reminder:**
OpenClaw can schedule a reminder cron for when capacity projections cross thresholds:
```json
{
  "name": "Storage Planning Reminder",
  "schedule": { "kind": "cron", "expr": "0 10 1 * *", "tz": "America/Vancouver" },
  "payload": { "kind": "agentTurn", "message": "Check disk growth rate on your media drive. If projected time-to-full is under 8 weeks, message Tyler: 'Storage reminder: [drive] at [X]% with [N] weeks of headroom. Top consumers: [list]. Suggest: [action].'" }
}
```

## Limitations

- **OpenClaw is a reasoning layer, not a real-time monitor** — it checks state on demand or on a schedule; it won't catch a spike that lasts 30 seconds between polls
- **No hardware resolution** — disk failures, RAM errors, power supply issues require physical intervention
- **Can compound mistakes** — if a command does something unexpected (e.g., `rm -rf` with a bad path), OpenClaw will execute it; always verify destructive operations before running them
- **Context window limits** — very large log files get truncated; for multi-GB logs, use `grep`/`awk` pre-filtering to pass only relevant lines
- **Not a replacement for production-grade monitoring** — Grafana + Prometheus, Datadog, or similar tools offer much richer metrics and alerting; OpenClaw complements them, not replaces them
- **Single point of failure** — if OpenClaw itself goes down, the automated ops layer goes with it; layer redundant monitoring for critical workloads

OpenClaw is a reasoning layer on top of standard Linux tools. It:
- **Can** monitor, analyze, and respond to conditions
- **Can't** fix hardware failures
- **Can** restart crashed services automatically
- **Can't** replace a proper monitoring system (Datadog, Grafana) for production
- **Can** handle routine maintenance and alerting
- **Should** be configured conservatively until you trust the automation

It's infrastructure for building your own automated ops stack — not a magic wand.

## A Day in the Life

Here's how a typical day with OpenClaw managing your server plays out:

**6:00 AM — Morning health check.** OpenClaw runs through docker ps, df -h, free -m, and uptime. Everything looks fine — 3% CPU idle, 58% disk used, all 14 containers running. You get a brief Telegram message: *"Morning — all clear. Disk at 58%, memory at 6.1G/32G, uptime 90 days."*

**9:47 AM — Anomaly detected.** The 30-minute cron catches that your SWAG (reverse proxy) container has restarted 3 times in the last hour. OpenClaw digs into `docker logs swag --since 2h`, finds SSL certificate renewal failures due to a misconfigured DNS challenge. It messages you: *"SWAG restarted 3x in 60 min — Let's Encrypt renewal failing due to Cloudflare DNS plugin error. Fix available: update the docker-compose env var for CF_DNS_API_TOKEN. Want me to apply it?"*

**10:15 AM — You approve.** OpenClaw updates the env file, recreates the container, verifies the SSL cert renewed successfully, and confirms all 6 proxied services are responding on HTTPS.

**2:00 PM — Log rollup.** Weekly cron runs a digest: "This week: 2 container restarts (both self-healed), 0 auth failures from external IPs (fail2ban working), 847MB apt packages pending, Jellyfin transcoding 12 hours total." You reply "clean up the packages" — it runs `apt-get autoremove -y && apt-get autoclean` and confirms 1.2GB freed.

**10:00 PM — Nightly backup verification.** borgmatic ran at 2 AM. OpenClaw checks `borg list /backup/borg | tail -1`, verifies the snapshot timestamp and size, and writes the result to a status file that your dashboard reads.

No alerts for most of the day — OpenClaw handled the routine. The two things that needed human judgment (SSL fix, package cleanup) came to you with context and a clear recommendation.
