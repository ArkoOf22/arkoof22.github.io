# Arkodeep Koley — Software Developer & Backend Systems Portfolio

A bespoke, studio-grade portfolio website engineered for **Arkodeep Koley**, Software Developer & Backend Developer specializing in high-scale payment infrastructure, distributed systems, and real-money transactional APIs in Go and Java.

Engineered under the [ck:frontend-design](https://github.com/binjuhor/shadcn-lar/blob/main/.claude/skills/frontend-design/SKILL.md) skill: **zero generic AI slop**, distinctive `Geist` typography, asymmetric fractional layouts (`DESIGN_VARIANCE = 8`), high technical visual density (`VISUAL_DENSITY = 7-8`), and mobile-safe inputs (`font-size >= 16px`).

---

## 🏛️ Architectural Highlights & Interactive Features

- **Title & Professional Identity**:
  - Designated as **Software Developer • Backend Systems** across the header brand, hero briefing, and dossiers.
  - Plain, non-cliché copywriting directly rooted in real-money infrastructure.
- **Asymmetric Split Hero (Design Variance = 8)**:
  - Left: Authoritative executive briefing with live production telemetry: ₹200+ Cr quarterly GMV transacted, 18 banking issuers, 92% log cut, 1.5-day onboarding.
  - Right: **Live Distributed Lock & Idempotency Console**:
    Interactive real-world simulator demonstrating concurrent lock leasing (Redis Mutex TTL), sub-30ms P95 latency commits, and **real-world idempotency replay caching** without balance mutation.
- **Asymmetric Systems Bento Grid**:
  - **JobClaw (Span 2)**: Approval-gated ATS discovery and fact-guard pipeline in Go (32K LOC, 243 tests). Includes an **Interactive Fact-Guard Visualizer** comparing raw LLM output vs. fact-guard verification (~87% token cost cut from $0.039 to $0.0049).
  - **Twid Config-Driven Issuer Proxy**: Centralized payment routing across 18 banking issuers (AU Bank, RBL, Kotak, CRED) with zero-drift idempotency.
  - **High-Throughput Log Filter Platform**: Multi-tier telemetry filter cutting daily production log volume by 92% (from 240GB down to 53GB/day).
  - **VisualVM Java Memory Optimization at Maersk (Span 2)**: Interactive memory metric comparison displaying the 50% heap drop (2.4GB down to 1.2GB) and automated 15k records/day ingestion pipeline.
- **Production Dossier (Experience)**:
  - **Twid**: Software Developer (Jan 2025 – Present) — 18 banking issuers, config-driven proxy, ₹200+ Cr quarterly GMV, 92% log reduction, concurrency race-condition mitigations.
  - **A.P. Moller – Maersk**: Software Developer Intern (May 2024 – Nov 2024) — VisualVM Java heap memory profiling cutting consumption by 50%, automated 15k records/day ingestion pipeline, Prometheus metrics.
- **Layered Technical Arsenal**:
  - Structured by operational layer: *Runtimes & Languages*, *Distributed Systems & Concurrency*, *Cloud & Infrastructure*, *Observability & Profiling*, and *AI Tooling & Cost Optimization*.
- **Verified Milestones & Academic Pedigree**:
  - Twid Hackathon Winner (AR Geolocation Rewards), ₹200+ Cr quarterly GMV, 92% log cut, 300+ LeetCode DSA.
  - Ramaiah Institute of Technology, Bangalore — B.E. in Information Science (**CGPA: 9.17 / 10.0** | 2020 – 2024).
- **Direct Reachout & Ingestion Form**:
  - All form fields feature `font-size: 16px` to strictly prevent iOS mobile zooming.
  - Direct copy button for `arkodeepkoley123@gmail.com` and `+91 74781 56546`.

---

## ⚡ Running Locally

```bash
# Using Python 3
python3 -m http.server 3000

# Or using Node.js
npx serve .
```

Visit: [http://localhost:3000](http://localhost:3000)
