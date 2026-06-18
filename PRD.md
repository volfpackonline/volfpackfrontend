# VolfPack — Product Requirements Document

> **Status:** Draft v1 · **Last updated:** 2026-06-18 · **Owner:** @sausi-7
> **Repo:** https://github.com/volfpackonline/volfpackfrontend
> **One-liner:** Open-source, self-hostable text-to-video studio that runs on *your* keys — bring any LLM provider for scripting and any video-model provider for rendering.

---

## 0. How to read this doc

This PRD covers VolfPack v1 ("Studio"). It is opinionated and deliberately
detailed. Sections are ordered so a new contributor can read top-to-bottom and
understand *what* we're building, *why*, *for whom*, and *how it's structured*.

- §1–3: Vision, users, scope.
- §4: **The central architectural decision** — read this before anything else.
- §5–6: Functional & non-functional requirements (the contract).
- §7–9: Architecture, data model, API contracts.
- §10: Competitive benchmarking.
- §11: Open-source, distribution & GTM strategy.
- §12: Monetization.
- §13: Metrics & KPIs.
- §14: Risks & mitigations.
- §15: Roadmap & milestones.
- §16: Open questions.

---

## 1. Vision & problem

### 1.1 Problem
Text-to-video is exploding, but the tooling is **closed, expensive, and
lock-in heavy**. Runway, Pika, Luma, Sora, and Kling are all proprietary SaaS:
your prompts, your assets, and your spend all live on someone else's platform,
metered at their margin. Developers and technical creators who want to:
- use their **own** provider keys (and pay provider cost, not a markup),
- **self-host** for privacy / compliance / cost control,
- **swap models** as the frontier moves weekly,
- and **build on top** of a clean, hackable codebase,

…have no good open-source home. VolfPack is that home.

### 1.2 Vision
> **The open-source control plane for text-to-video.** Describe a scene, pick a
> model, generate — on infrastructure and keys you control. One studio UI, every
> video model behind one contract.

### 1.3 Why now
- Frontier video models now expose stable HTTP APIs (Runway Gen-3/4, Luma Dream
  Machine, Pika, Google Veo, Kling, Sora).
- Open-weight video models are viable to self-host (Mochi-1, LTX-Video,
  HunyuanVideo, Wan 2.x) on a single high-VRAM GPU or via Replicate/Fal.
- "BYO-key" + "open-core" is a proven OSS business pattern (see §10–12).

---

## 2. Target users & personas

Per the decision for v1: **primary audience is developers who self-host and
bring their own keys.** Monetization (managed hosting) comes later.

| Persona | Description | Core need | v1 priority |
|---|---|---|---|
| **Hacker Dev (primary)** | Indie/startup dev who wants to self-host a text-to-video tool and wire their own provider keys | Clean codebase, one-command deploy, BYO-key, model swappability | **P0** |
| **Builder/Integrator** | Wants VolfPack as a component inside their own product (API/SDK) | Stable API contract, headless mode, webhooks | **P1** |
| **Technical Creator** | Comfortable with `.env` and Docker; wants a private studio for content | Good UX, history, multiple styles/ratios | **P1** |
| **Self-host Ops** | Runs it for a team behind their firewall | Auth, multi-user, key management, observability | **P2** |
| **Managed-tier Customer** | (Future) Doesn't want to run infra; pays for hosted | Zero-setup, billing, SLA | **P3 (post-v1)** |

**Non-users (explicitly out of scope for v1):** non-technical consumers who want
a polished zero-config mobile app. We are a developer-first OSS project first.

---

## 3. Goals, scope & non-goals

### 3.1 v1 Goals
1. A self-hostable studio: marketing site + Studio UI + Python backend.
2. **Provider-agnostic generation** across ≥3 video providers + ≥3 LLM providers.
3. **BYO-key** as the default; **optional managed keys** path designed-in (not necessarily shipped).
4. Async job lifecycle with progress, history, and asset storage.
5. One-command local run (`docker compose up`) and a documented deploy path.

### 3.2 Out of scope for v1
- Video editing / timeline / multi-clip stitching (post-v1).
- Audio / music / voiceover generation.
- Mobile native apps.
- Fine-tuning / training custom models.
- Real-time collaboration.
- Billing & payments (designed-for, not built).

### 3.3 Non-goals (philosophy)
- We are **not** a model lab — we don't train video models.
- We are **not** a key-reseller — BYO-key is first-class; managed is opt-in.
- We will **not** add a loud second brand color (see `design.md`). 🙂

---

## 4. THE CENTRAL ARCHITECTURAL DECISION — keys & providers

> **This is the most important section. Everything downstream depends on it.**

The headline "works on any LLM key" is *technically incomplete* and must be
modeled precisely, or the product is incoherent. **LLM provider keys (OpenAI,
Anthropic, Gemini, Mistral, …) do not generate video.** Video pixels come from
**video-model providers**. VolfPack therefore has **distinct provider classes**
(LLM, cloud video, and **local on-device** — see §4.4), all behind **one
abstraction layer**:

### 4.1 Two provider classes

| Class | Purpose | Example providers | Key env |
|---|---|---|---|
| **LLM providers** | Prompt enhancement, scene scripting, storyboard text, safety/moderation, caption/SEO | OpenAI, Anthropic, Google Gemini, Mistral, Groq, Ollama (local) | `*_API_KEY` per provider |
| **Video providers** | The actual text/image-to-video render | Runway, Luma, Pika, Google Veo, Kling, Replicate/Fal-hosted open models (Mochi, LTX-Video, Hunyuan, Wan) | `*_API_KEY` per provider |

A single generation may use **both**: LLM expands the user's prompt → video
provider renders it.

### 4.2 Provider abstraction
- A **`VideoProvider` interface** (Python) every video backend implements:
  `submit(request) -> provider_job_id`, `poll(provider_job_id) -> status/progress/url`,
  `cancel(provider_job_id)`, `capabilities() -> {durations, ratios, styles, max_resolution, cost_hint}`.
- An **`LLMProvider` interface** for text — we standardize on **LiteLLM** as the
  unification layer for LLM calls (covers ~100 providers, one API, BYO-key).
- **Registry/router:** maps a requested model id (e.g. `runway:gen3a_turbo`,
  `replicate:ltx-video`) to its provider adapter, validates capabilities against
  the request, and routes. Supports per-request override and fallback chains.

### 4.3 Key handling modes (both designed-in)
1. **BYO-key (default, self-host):** keys live in the user's environment
   (server `.env`) or, for hosted multi-user, **encrypted per-user/org** in the
   DB (envelope encryption, never logged, never returned to client). Calls are
   made server-side; keys never touch the browser.
2. **Managed (optional, hosted tier):** VolfPack-owned keys, usage metered per
   user/org for billing. Requires the metering + rate-limit + cost-attribution
   pieces (§5.7). Off by default; flag-gated.

> **PRD principle:** the request/response contract is identical regardless of
> key mode. Key mode is a deployment/config concern, not a product surface.

### 4.4 Local / on-device generation (no keys, no cloud)

A **third provider category** sits alongside the cloud video providers: **local
open-weight models running on the user's own GPU.** No API key, no per-call cost,
fully private. This is a first-class path — many self-hosters specifically want
*never* to call an external API. Local is just another `VideoProvider`
implementation; the request/response contract is unchanged.

**Two ways to run local (both behind `VideoProvider`):**

1. **`ComfyUIProvider` (recommended default).** The user runs
   [ComfyUI](https://github.com/comfyanonymous/ComfyUI) — the de-facto OSS engine
   for local video models — and VolfPack talks to its HTTP API (`/prompt`,
   `/history`) + websocket for progress. ComfyUI owns the GPU, model downloads,
   and VRAM management; VolfPack stays light. Supports LTX-Video, Mochi-1,
   HunyuanVideo, Wan 2.x, AnimateDiff via loadable workflows.
2. **`DiffusersProvider` (self-contained).** A Python worker loads models via 🤗
   `diffusers` directly — CUDA on NVIDIA, **MPS on Apple Silicon**, CPU fallback.
   More integrated but VolfPack then owns model/VRAM/quantization concerns.
   Heavier to maintain; ship after the ComfyUI path.

**VRAM-aware capability gating (critical for UX).** Each local model declares its
memory requirement in the capability registry (§4.2). VolfPack detects the host's
available VRAM/unified memory and **enables, warns, or disables** each model
accordingly — so a low-memory machine doesn't OOM mid-render and a powerful box
unlocks everything.

#### Local hardware → what's runnable

| Available VRAM / unified memory | Realistically runnable locally |
|---|---|
| **~8 GB** (e.g. M1 Air, GTX 1070) | AnimateDiff only (short, low-res). **Recommend a cloud/API provider instead.** |
| **12–16 GB** (RTX 3060/4060Ti, M2/M3 16 GB) | **LTX-Video** (fast), AnimateDiff — the realistic local sweet spot |
| **24 GB** (RTX 3090/4090, M-series 32 GB+) | + Mochi-1, quantized HunyuanVideo / Wan |
| **40 GB+** (A100/H100, multi-GPU) | Everything, full quality |

> **Honest constraint:** local generation is **VRAM-bound and slower** than the
> cloud APIs — open models are CUDA-tuned; Apple MPS works but lags NVIDIA. Local
> is a *privacy/cost* win, not a *speed/quality* win. The UI must set this
> expectation (ETA, "this runs on your machine" badge).
>
> **Project stance:** VolfPack *ships the capability*; whether a given model runs
> depends on the user's hardware. The dev machine (8 GB M1) can't run the heavy
> models, but the product fully supports users who can — exactly the pattern
> Open WebUI / ComfyUI ecosystems use.

---

## 4.5 What we provide — and why this is NOT an LLM/API wrapper

> A fair challenge for any AI product: *"Isn't this just a thin UI over someone
> else's API?"* This section answers it head-on. If VolfPack were deleted, what
> would users lose that they couldn't trivially rebuild with `fetch()`?

### What VolfPack actually provides

| # | We provide | Why it's real work, not a wrapper |
|---|---|---|
| 1 | **A provider-agnostic abstraction** (`VideoProvider`) over cloud APIs *and* local models | Every provider has a different request shape, polling model, capability set, error format. We normalize all of them to one contract. A wrapper hits one API; we unify ~8+ that disagree with each other. |
| 2 | **Capability registry + validation** | We know each model's supported durations/ratios/resolutions/i2v/VRAM and reject impossible requests *before* spending money or time. A wrapper just forwards and lets the provider 400. |
| 3 | **Durable async job orchestration** | Queue, workers, at-least-once + idempotent submit, progress tracking, jobs that survive restarts. This is a real distributed-systems problem, not an API call. |
| 4 | **Local/on-device generation** (§4.4) | ComfyUI/Diffusers integration with VRAM-aware gating. There is *no API to wrap here at all* — it's running models on the user's own GPU. |
| 5 | **Self-hostable, privacy-preserving deployment** | `docker compose up`, your infra, your keys, your data. The entire value prop of a wrapper (convenience) is the opposite of this. |
| 6 | **Secure multi-tenant key custody** | Envelope-encrypted per-user keys, never logged/returned/browser-exposed. A wrapper has no key-management problem to solve. |
| 7 | **Fallback chains + routing** | Primary provider down → automatic retry on a fallback. Cross-provider routing by cost/speed/quality. |
| 8 | **Cost attribution & metering** | Per-job cost across heterogeneous providers (seconds vs. tokens vs. credits), budget caps, transparency. |
| 9 | **An open, hackable adapter SDK** | The ~100-line pattern to add *any* new video model. The community extends VolfPack; you can't "extend" a closed wrapper. |
| 10 | **Persistent studio**: history, re-open, variations, storyboard, asset lifecycle | State and workflow the providers don't give you — they're stateless render endpoints. |
| 11 | **A real product UX + design system** | The studio, marketing site, accessibility, the soft-pastel brand. Genuine product surface, not a Postman collection. |

### The anti-wrapper test (our north star)

A thin wrapper has **all** of these properties; VolfPack has **none**:

- ❌ Wraps exactly one provider · ✅ We abstract many (cloud + local).
- ❌ Stateless pass-through · ✅ We own jobs, history, assets, retries.
- ❌ Adds no logic between user and model · ✅ We validate, enhance, moderate, route, attribute cost.
- ❌ Breaks the moment the provider changes · ✅ Isolated adapters + contract tests absorb churn.
- ❌ You must use *their* infra/keys · ✅ Self-host, BYO-key, **or fully local**.
- ❌ Closed; you adapt to it · ✅ MIT, adapter SDK; it adapts to you.

### The defensible moat (read §4.6 — be honest about this)

> **Blunt truth:** most of the table above is *features*, not *moats*. Provider
> abstraction, job queues, the UI, capability registries — all are good
> engineering, but a competent team **copies them in weeks**, and our MIT license
> means the code is copyable by definition. We must not pretend code is a moat.

The one durable, *technical* moat is the **orchestration intelligence layer**
(§4.6): the smart routing, per-model prompt translation, cross-shot consistency,
and quality scoring that **compound with usage data we accumulate and a
late-arriving competitor cannot**. Everything else is a feature; this is the moat.

> **One-line framing:** A wrapper makes *one* model easier to call. VolfPack
> makes *every* model work the same way — and over time, makes them work
> *better* than calling them directly, because it learns which model, with which
> prompt, produces the best result for your goal.

---

## 4.6 The actual tech moat — orchestration intelligence

> This is the honest answer to *"what's the defensible technology?"* It is **not**
> the abstraction layer (copyable) — it's the intelligence that sits on top of it
> and **compounds with data**.

### Why this is defensible when abstraction isn't

| | Provider abstraction (NOT a moat) | Orchestration intelligence (the moat) |
|---|---|---|
| Nature | One-time engineering cost | Compounding data + R&D asset |
| Copyable? | Yes — read the code, reimplement in weeks | No — copying code ≠ copying accumulated routing data |
| Improves with usage? | No, static | **Yes** — every generation makes routing/prompts smarter |
| Late competitor | Catches up fast | **Permanently behind** on data |

### The four intelligence layers (in build order)

1. **Per-model prompt translation.** Runway, Luma, Pika, LTX-Video each respond to
   very different prompt phrasings. We learn (LLM-assisted + empirical) how to
   rewrite *one* user intent into the optimal prompt for *each* model. This
   knowledge is earned over thousands of generations — not in the code, in the data.
2. **Cost / quality / speed routing.** Given a prompt + budget + deadline, pick
   the best provider/model — and learn from outcomes which model wins for which
   kind of request. An optimization problem that sharpens with our data.
3. **Quality scoring + auto-retry.** Score outputs (heuristics → learned models →
   optional LLM-as-judge on frames), auto-retry failures or low scores on a
   different model/seed. Builds the labeled dataset that powers (1) and (2).
4. **Cross-shot consistency.** Keep character/style stable across multiple clips
   (seed locking, reference-image conditioning, latent reuse, LLM-anchored prompt
   continuity). A genuinely *unsolved* hard problem — solving it well is real
   differentiation, not a wrapper.

### The compounding-data flywheel

```
more users → more generations → more (prompt, model, result, score) data
   → smarter routing + prompt translation + consistency
   → better results than calling the provider directly
   → more users  ↺
```
> The moat is the **flywheel**, not any single algorithm. A competitor who forks
> our MIT code on day 1 still starts with *zero* outcome data; we start with all
> of ours. That gap widens with every generation.

### Honest caveat (do not overclaim)

This moat **does not exist at launch.** v1 ships the *architecture* (routing
hooks, score capture, prompt-translation interface) but the intelligence is thin
until usage accumulates. That is fine — and is in fact *why* it's defensible: a
moat you can build on day one is a moat anyone can copy on day one. We design for
it now (data capture from the first generation), and it sharpens over time.

### ⚠ The fatal contradiction in this moat (must resolve)

The data flywheel **conflicts directly with our own privacy/self-host pitch.**
Self-hosted users' generation data stays on *their* server — **we never see it** —
which is the entire point of §4.4 and §11. So the flywheel only spins on the
*hosted* tier (post-v1, optional, competing with the free self-host version we
tell everyone to use). **We have designed a moat structurally incompatible with
our distribution strategy.** This is unresolved. Honest options:
1. **Opt-in anonymized telemetry** — beg self-hosters to share outcome data
   (most won't; privacy crowd especially).
2. **Moat lives only on the hosted tier** — accept self-host is a loss-leader
   funnel and the real product/moat is the cloud version.
3. **Drop the data-flywheel claim** — admit there is *no* compounding tech moat
   and compete on execution + ecosystem instead (see §14.5).

> Until this is resolved, treat §4.6 as **aspirational, not proven.** See §14.5.

---

## 5. Functional requirements

IDs are stable references (`FR-x.y`). Priority: **P0** = v1 must-have, **P1** =
v1 should-have, **P2** = nice-to-have / fast-follow.

### 5.1 Generation (core)
- **FR-1.1 (P0)** Submit a generation from a prompt + options: `aspectRatio`
  (`16:9` / `9:16` / `1:1`), `style` (cinematic/realistic/anime/3d/claymation),
  `duration` (4/8/16s). *(Contract already exists in `src/lib/types.ts`.)*
- **FR-1.2 (P0)** Select a **model/provider** per generation (dropdown), with a
  sensible default. Show provider + estimated cost/time.
- **FR-1.3 (P0)** Async job lifecycle: `queued → processing → succeeded|failed`
  with `progress` 0–100. *(Already modeled as `VideoJob`.)*
- **FR-1.4 (P0)** Live progress updates in the UI (poll or stream).
- **FR-1.5 (P0)** Cancel an in-flight job.
- **FR-1.6 (P0)** Display result: inline video player, poster frame, download.
- **FR-1.7 (P1)** **Prompt enhancement** via the LLM layer ("improve my prompt"
  / auto-expand a short prompt into a richly described scene). Toggleable.
- **FR-1.8 (P1)** Image-to-video: upload a start frame / reference image.
- **FR-1.9 (P1)** Negative prompt + seed (reproducibility) for providers that support it.
- **FR-1.10 (P2)** Storyboard mode: LLM splits a script into N shots → batch render.
- **FR-1.11 (P2)** Regenerate / variations from a prior job.

### 5.2 Provider & model management
- **FR-2.1 (P0)** Configure provider keys via env / settings; validate a key
  (lightweight ping) before first use.
- **FR-2.2 (P0)** List available models with capabilities (durations, ratios,
  max resolution, supports image-to-video, cost hint).
- **FR-2.3 (P0)** Disable a request that exceeds a model's capabilities, with a
  clear error (e.g. "16s not supported by this model").
- **FR-2.4 (P1)** Fallback chain: if primary provider errors/timeouts, retry on
  a configured fallback.
- **FR-2.5 (P1)** Local/open-weight model support via Replicate/Fal adapter (and
  a self-hosted GPU adapter interface).
- **FR-2.6 (P1)** **Local generation provider** (`ComfyUIProvider`): connect to a
  user-run ComfyUI instance (URL + workflow), submit, stream progress, fetch
  result. No API key required.
- **FR-2.7 (P1)** **VRAM-aware gating:** detect host memory; enable/warn/disable
  local models per their declared requirement; never silently OOM. (§4.4)
- **FR-2.8 (P2)** `DiffusersProvider`: in-process local generation via 🤗
  `diffusers` (CUDA / Apple MPS / CPU fallback), with model download management.

### 5.2b Orchestration intelligence (the moat — §4.6)
- **FR-2.9 (P1)** **Outcome data capture:** record `(prompt, model, settings,
  result, latency, cost, quality_score?, user_action)` for every generation —
  the dataset the moat compounds on. Privacy-respecting + opt-in for telemetry.
- **FR-2.10 (P1)** **Per-model prompt translation:** rewrite one user intent into
  the model-optimal prompt (LLM-assisted, improves with data).
- **FR-2.11 (P1)** **Cost/quality/speed routing:** "auto" model selection given a
  prompt + budget + deadline; explainable ("chose X because…").
- **FR-2.12 (P2)** **Quality scoring + auto-retry:** score outputs; retry low
  scores on a different model/seed; feed scores back into routing.
- **FR-2.13 (P2)** **Cross-shot consistency:** stable character/style across
  multi-clip generations (seed lock, reference conditioning, prompt anchoring).

### 5.3 History & assets
- **FR-3.1 (P0)** Per-user generation history (list, filter by status).
- **FR-3.2 (P0)** Persist job metadata + generated asset (object storage).
- **FR-3.3 (P1)** Asset lifecycle: TTL / delete, storage quota awareness.
- **FR-3.4 (P1)** Re-open a past job (prompt + settings prefilled).
- **FR-3.5 (P2)** Share link / public preview for a generation.

### 5.4 Accounts, auth & multi-tenancy
- **FR-4.1 (P1)** Single-user mode (default self-host) — no auth required.
- **FR-4.2 (P1)** Multi-user mode (flag): email/OAuth login, per-user history & keys.
- **FR-4.3 (P2)** Orgs/teams with shared keys + role (admin/member).
- **FR-4.4 (P2)** API tokens for programmatic access.

### 5.5 API / SDK (headless)
- **FR-5.1 (P0)** Documented REST API mirroring the UI contract (submit, poll,
  cancel, list).
- **FR-5.2 (P1)** Webhooks on job completion/failure.
- **FR-5.3 (P1)** OpenAPI spec + generated TS client.
- **FR-5.4 (P2)** Python SDK (`pip install volfpack`).

### 5.6 Safety & moderation
- **FR-6.1 (P0)** Input prompt moderation (LLM/provider moderation endpoint),
  configurable strictness; block + explain.
- **FR-6.2 (P1)** Output flagging path (report a generation).
- **FR-6.3 (P1)** Rate limiting per user/IP.

### 5.7 Metering & cost (for managed tier; designed-in)
- **FR-7.1 (P1)** Per-job cost attribution (provider + tokens/seconds).
- **FR-7.2 (P2)** Usage dashboard (spend over time, by provider/model).
- **FR-7.3 (P2)** Quotas / budget caps with alerts.

### 5.8 Admin & observability
- **FR-8.1 (P1)** Health endpoint + provider status panel.
- **FR-8.2 (P1)** Structured logs (no secrets), job audit trail.
- **FR-8.3 (P2)** Admin view of all jobs/users (multi-user mode).

---

## 6. Non-functional requirements

| ID | Category | Requirement |
|---|---|---|
| **NFR-1** | Performance | UI interactions < 100ms; submit→`queued` ack < 1s; progress updates ≤ 2s latency. End-to-end render time is provider-bound (surface ETA, don't block). |
| **NFR-2** | Scalability | Backend horizontally scalable; job workers independent of web tier; queue-backed so a burst doesn't drop jobs. Target: 100 concurrent jobs on a single modest deployment. |
| **NFR-3** | Reliability | Jobs survive a worker restart (durable queue + persisted state). At-least-once processing with idempotent provider submit. Graceful provider-failure → fallback or clear failure. |
| **NFR-4** | Security | Keys encrypted at rest (envelope encryption), never logged, never sent to the client. Secrets only via env/secret store. TLS everywhere. Input validation on every endpoint. Dependency scanning in CI. |
| **NFR-5** | Privacy | Self-host = data never leaves user infra (except calls to the providers *they* chose). No telemetry without opt-in. Clear data-flow docs. |
| **NFR-6** | Portability | Runs via `docker compose up` locally; deployable to any container host. No hard dependency on a single cloud. Postgres + S3-compatible storage (works with MinIO locally). |
| **NFR-7** | Maintainability | Typed end-to-end (TS frontend, typed Python). Provider adapters isolated & independently testable. >70% test coverage on core orchestration. |
| **NFR-8** | Accessibility | WCAG 2.1 AA: keyboard nav, focus states, reduced-motion respected (per `design.md`), color contrast on pastel palette verified. |
| **NFR-9** | Observability | Structured logging, request tracing, per-job metrics, provider latency/error dashboards. |
| **NFR-10** | Cost transparency | Surface provider cost estimates pre-render and actuals post-render. Never hide spend. |
| **NFR-11** | i18n-ready | UI strings externalized; English v1, structure ready for localization. |
| **NFR-12** | Licensing hygiene | All deps OSS-compatible with chosen license; SAMPLE assets royalty-free; SBOM generated. |

---

## 7. System architecture

### 7.1 High-level
```
┌──────────────────────────────────────────────────────────────────┐
│  Browser (Next.js 16 / React 19 — App Router)                      │
│  Marketing site · Studio UI · history · player                     │
└───────────────┬───────────────────────────────────────────────────┘
                │  HTTPS (REST/JSON, optional SSE for progress)
                ▼
┌──────────────────────────────────────────────────────────────────┐
│  Next.js BFF (route handlers)                                       │
│  Auth/session · request validation · proxies to Python API         │
│  (keeps provider keys server-side; never exposes to browser)        │
└───────────────┬───────────────────────────────────────────────────┘
                │  internal HTTP / RPC
                ▼
┌──────────────────────────────────────────────────────────────────┐
│  Python API (FastAPI)                                               │
│  Job intake · provider registry/router · capability validation     │
│  moderation · cost attribution · webhooks                           │
└───────┬───────────────────────────┬───────────────────────────────┘
        │ enqueue                    │ read/write
        ▼                            ▼
┌───────────────┐          ┌──────────────────┐
│ Queue/Broker  │          │ Postgres         │  jobs, users, keys (enc),
│ (Redis/RQ or  │          │                  │  history, usage
│  Celery)      │          └──────────────────┘
└──────┬────────┘
       │ dequeue
       ▼
┌──────────────────────────────────────────────────────────────────┐
│  Worker(s)                                                          │
│  LLMProvider (LiteLLM) → prompt enhance/script/moderate             │
│  VideoProvider adapters → submit/poll/cancel                        │
│  Adapters: Runway · Luma · Pika · Veo · Kling · Replicate · Fal ·   │
│            self-hosted GPU                                           │
└───────┬───────────────────────────────────────────────────────────┘
        │ store asset
        ▼
┌──────────────────┐
│ Object storage   │  S3 / R2 / MinIO (local) — generated videos + posters
└──────────────────┘
```

### 7.2 Why Next.js + Python (as specified)
- **Next.js 16 / React 19** (already in repo): best-in-class UI, App Router, the
  studio UX, marketing site, and a thin BFF that keeps keys server-side.
- **Python (FastAPI)**: the AI/ML ecosystem lives in Python. Provider SDKs,
  LiteLLM, moderation, and any future self-hosted-model inference are all
  Python-native. Workers and provider adapters belong here.
- **Boundary:** Next.js owns presentation + session + key custody at the edge;
  Python owns orchestration, providers, and long-running jobs.

### 7.3 Async job model
- Submit returns immediately with a `queued` job (NFR-1).
- A worker picks it up: (optional) LLM prompt-enhance → moderation → video
  provider `submit` → poll loop updates `progress`/`status` → on success store
  asset + URLs → fire webhook.
- Frontend reflects progress via polling (v1) → SSE/WebSocket (P1).
- Durable queue + persisted state = jobs survive restarts (NFR-3).

### 7.4 Key custody flow
- Self-host single-user: keys in server env; workers read directly.
- Multi-user: keys entered in UI → POSTed over TLS to Python → **encrypted with
  a KMS/data key (envelope encryption)** → stored. Decrypted in-memory only at
  call time. Never logged, never returned, never in the browser.

---

## 8. Data model (v1, simplified)

```
User            (id, email, created_at, role)          # multi-user mode only
ProviderKey     (id, user_id?, org_id?, provider, ciphertext, created_at)
Model           (id, provider, name, capabilities_json, cost_hint, enabled)
Job             (id, user_id?, prompt, enhanced_prompt?, model_id, aspect_ratio,
                 style, duration, status, progress, video_url?, poster_url?,
                 seed?, negative_prompt?, error?, provider_job_id?,
                 cost_actual?, created_at, updated_at)
Asset           (id, job_id, kind[video|poster], storage_key, bytes, ttl?)
UsageEvent      (id, user_id?, job_id, provider, units, unit_type, cost,
                 created_at)                            # metering / managed tier
Webhook         (id, user_id?, url, secret, events[])
```
`Job` is a superset of the existing `VideoJob` TS interface — the API
contract stays compatible with `src/lib/types.ts`.

---

## 9. API contracts (v1)

Mirrors the existing `GenerateRequest`/`VideoJob` shapes so the frontend client
(`src/lib/api.ts`) evolves rather than gets rewritten.

```
POST   /api/v1/generate          # body: GenerateRequest + {model?, options?}
                                 # -> 202 VideoJob (status: queued)
GET    /api/v1/jobs/:id          # -> VideoJob (poll)
GET    /api/v1/jobs/:id/stream   # -> SSE progress events (P1)
POST   /api/v1/jobs/:id/cancel   # -> VideoJob (cancelled/failed)
GET    /api/v1/jobs              # -> VideoJob[] (history, paginated)
GET    /api/v1/models            # -> Model[] with capabilities
POST   /api/v1/keys              # multi-user: add/validate a provider key
POST   /api/v1/prompt/enhance    # -> {enhancedPrompt}  (LLM layer)
GET    /healthz                  # health + provider status
```
- All write endpoints validate against capabilities (FR-2.3) and moderation (FR-6.1).
- Errors: consistent `{error: string, code: string}` envelope (already the
  frontend's expectation).

---

## 10. Competitive benchmarking

### 10.1 Proprietary video-gen SaaS (the incumbents we route *to*, not compete head-on)
| Product | Model strength | Open? | BYO-key? | Self-host? | Our relationship |
|---|---|---|---|---|---|
| **Runway** (Gen-3/4) | Top-tier quality | ✗ | ✗ | ✗ | Adapter / route to it |
| **Pika** | Fast, stylized | ✗ | ✗ | ✗ | Adapter |
| **Luma** (Dream Machine) | Strong realism | ✗ | ✗ | ✗ | Adapter |
| **OpenAI Sora** | High fidelity | ✗ | ✗ | ✗ | Adapter (when API GA) |
| **Google Veo** | High fidelity | ✗ | ✗ | ✗ | Adapter (Vertex) |
| **Kling** | Long clips | ✗ | ✗ | ✗ | Adapter |

> We don't beat these on raw model quality — we **aggregate** them under one
> open, self-hostable control plane with no markup.

### 10.2 The real competitive set (OSS / control-plane / aggregators)
| Project | What it is | Gap VolfPack fills |
|---|---|---|
| **ComfyUI** | Node-based local gen (img/video) for power users | We're a *product UX* + multi-provider API, not a node graph; far lower barrier |
| **Replicate / Fal** | Hosted model marketplaces (API) | They're a backend we *use*; we add UI, history, BYO-key custody, self-host |
| **LiteLLM** | LLM provider unification (text) | We use it; we extend the same idea to **video providers** + a studio |
| **Invoke / Fooocus / SD WebUIs** | OSS *image* gen UIs | Video-first, multi-provider (incl. closed APIs), not just local diffusion |
| **LibreChat / Open WebUI** | OSS BYO-key chat UIs | The "Open WebUI for text-to-video" — that analogy is our north star |

### 10.3 Positioning statement
> **VolfPack is the "Open WebUI for text-to-video."** A clean, self-hostable,
> BYO-key studio that puts every video model — closed APIs *and* open weights —
> behind one contract, with your data and spend under your control.

### 10.4 Differentiators (our wedge)
1. **Video-first multi-provider** — most OSS BYO-key tools are chat/image only.
2. **Closed + open under one roof** — route to Runway *and* run LTX-Video locally.
3. **Self-host + privacy + no markup** — provider cost only.
4. **Open-core, hackable, typed** — built to be forked and extended.

---

## 11. Open-source & distribution strategy

### 11.1 Licensing
- **Core: MIT** (already declared) — maximizes adoption and contribution; the
  OSS-friendly default that fits a developer self-host audience.
- Keep **managed-only** features (billing, advanced quotas, SSO) in a clearly
  separated module if/when we go open-core, so the MIT core stays fully usable
  standalone. (Decision deferred — see §16.)
- CLA or DCO for contributions (DCO recommended — lighter weight).

### 11.2 Distribution channels
| Channel | Artifact | Purpose |
|---|---|---|
| **GitHub** | Source, releases, issues, discussions | Home base, contribution funnel |
| **Docker Hub / GHCR** | `volfpack/volfpack` image + `docker-compose.yml` | One-command self-host |
| **Deploy buttons** | Railway/Render/Fly templates | Friction-free trial deploy |
| **npm** | `@volfpack/client` (TS SDK) | Integrators |
| **PyPI** | `volfpack` (Python SDK) | Integrators |
| **Docs site** | Guides, API ref, adapter cookbook | Onboarding + SEO |

### 11.3 Community & growth (developer OSS niche)
- **Launch surfaces:** Product Hunt, Hacker News ("Show HN"), r/selfhosted,
  r/StableDiffusion, r/LocalLLaMA, Lobsters.
- **The "Open WebUI for video" narrative** — lean into the analogy hard; it's
  instantly legible to the self-host crowd.
- **Content engine:** "Self-host text-to-video with your own keys" tutorials,
  provider-comparison posts, adapter-writing guides (each new adapter = a
  shareable artifact + SEO page).
- **Contribution magnet:** make **writing a new provider adapter** a
  well-documented, ~100-line, well-tested pattern — adapters are the natural
  community contribution and the project's moat.
- **Star→deploy→contribute funnel:** great README + GIF demo + one-command run.

### 11.4 OSS niche targeting (where we plant the flag)
- Primary niche: **self-hosters & privacy-conscious devs** (the LocalLLaMA /
  selfhosted overlap) who already BYO-key for LLMs and want the same for video.
- Secondary: **builders** embedding video-gen into their own apps via our API.

---

## 12. Monetization (designed-in, not v1-shipped)

Open-core, consistent with "BYO-key + optional managed":
1. **Self-host (free, MIT):** the whole product, BYO-key. Drives adoption.
2. **Managed cloud (paid, future):** we run it, optional managed keys with
   metering/markup *or* BYO-key with a hosting fee; teams, SSO, quotas, SLA.
3. **Pro/enterprise modules (future):** advanced observability, audit, RBAC,
   priority support.
> Revenue follows adoption — v1's job is to be the best free self-host option.

---

## 13. Success metrics & KPIs

### 13.1 North-star
- **Weekly successful generations across self-hosted instances** (opt-in
  telemetry) — proves the product does its core job in the wild.

### 13.2 Adoption (OSS health)
- GitHub stars, forks, unique cloners; Docker pulls; deploy-button installs.
- # of community-contributed provider adapters (moat signal).
- Contributors, PR merge rate, issue close time.

### 13.3 Activation / product
- Time-to-first-successful-generation after install (target < 10 min).
- Generation success rate (succeeded / submitted) — target > 90% excluding
  provider outages.
- Submit→queued ack latency (NFR-1), p50/p95 end-to-end render time per provider.

### 13.4 Quality / reliability
- Job failure rate by provider; fallback trigger rate.
- Crash-free worker rate; jobs-lost rate (target ~0 via durable queue).

### 13.5 (Future) Managed-tier
- Conversion self-host→hosted, MRR, gross margin after provider cost.

---

## 14. Risks & mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | **"Any LLM key" ≠ video** confusion sets wrong expectations | High | High | This PRD's §4; explicit two-class messaging in UI/docs; LLM = scripting, video provider = render |
| R2 | Video-gen is **expensive**; users get surprise bills | High | High | Pre-render cost estimates (NFR-10), budget caps (FR-7.3), default to cheap/fast models |
| R3 | **Provider API churn** (frequent breaking changes) | High | Med | Thin, isolated adapters (NFR-7); capability registry; contract tests per adapter; fallback chains |
| R4 | **Key security** breach in multi-user mode | Med | Critical | Envelope encryption, never log/return keys, secret store, security review in CI (NFR-4) |
| R5 | **Closed providers forbid** aggregation/BYO-key in ToS | Med | High | Verify each provider's ToS before shipping its adapter; BYO-key (user's own account) is the safe path |
| R6 | **Self-hosting GPU models** is heavy/finicky | Med | Med | Lead with hosted APIs + Replicate/Fal; self-host-GPU as advanced/optional |
| R7 | **Content safety / misuse** (deepfakes, NSFW) | Med | High | Moderation (FR-6.1), report path, rely on provider safety, clear AUP |
| R8 | **Scope creep** (editor, audio, mobile) dilutes v1 | High | Med | §3.2 non-goals enforced; ruthless v1 cut |
| R9 | **Solo/early maintainer bandwidth** | High | Med | Adapter contribution pattern (§11.3); good docs; DCO; automate CI/release |
| R10 | Crowded space; **hard to get noticed** | Med | Med | Sharp "Open WebUI for video" positioning; demo GIF; HN/PH launch |
| R11 | License/asset **compliance** (sample clips, deps) | Low | Med | Royalty-free samples (already), SBOM, license scan (NFR-12) |

---

## 14.5 Why this project might fail (devil's advocate)

> A PRD that can't argue against itself isn't trustworthy. This is the
> adversarial read — the case a skeptical investor or a hostile HN thread makes.
> Each point is real; some may be fatal. Read this *before* believing §4.6.

### W1 — The moat contradicts the strategy (most serious)
The data-flywheel moat (§4.6) needs usage data; the privacy/self-host pitch
(§4.4, §11) guarantees we **never see self-hosted usage data.** The moat and the
distribution strategy are mutually exclusive. As designed, **there is likely no
compounding tech moat for the product people actually adopt (self-host).**

### W2 — "Orchestration intelligence" may solve a non-problem
- **Prompt translation** bets on models *staying* diverse — but they're
  converging on good natural-language understanding. The skill may obsolete itself.
- **Multi-provider routing** assumes users want to optimize across many models.
  Most pick one they trust and stop. Auto-routing may be a solution without a problem.
- **Cross-shot consistency** is being solved *inside the models* by labs with
  billions in funding. Out-innovating Runway/Google here, solo, is not credible.

### W3 — The economics punish the exact target user
Video gen is expensive and slow. The price-sensitive dev who wants BYO-key is the
*least* likely to keep spending on generations. The audience most drawn to
self-host is the audience least likely to generate (and pay) at volume.

### W4 — Local generation (our best anti-wrapper point) needs a $1,500+ GPU
The strongest "not a wrapper" claim — local gen — is usable only on high-VRAM
hardware a tiny minority owns. The dev machine here (8 GB M1) literally can't run
the good models. The differentiator reaches a sliver of the market.

### W5 — The incumbents are also the studios
Runway, Pika, Luma all ship polished web apps. Our aggregation value evaporates
the moment a user decides one model is "good enough" — the common case. We're a
thin layer between users and labs who are building the same UX themselves.

### W6 — Provider dependency & ToS risk (underweighted in R5)
Closed providers can forbid third-party UIs or kill BYO-key access overnight.
The "aggregate the closed APIs" pitch sits entirely at their mercy.

### W7 — The community moat assumes a community
The adapter-ecosystem story needs contributors. Most OSS projects never get a
second one. Planning a moat around contributions we don't yet have is wishful;
meanwhile a solo maintainer must chase ~8 churning video APIs — a treadmill.

### W8 — Honest verdict
This is a **strong learning/portfolio project** and a **plausible small, beloved
OSS tool** ("the Open WebUI for video"). It is a **weak startup** and a **very
weak defensible business.** Best realistic outcome: a respected MIT community
tool that's hard to monetize — not a venture-scale company with a tech moat.

### What would actually make it *not* bad (the pivots worth considering)
- **Niche down hard:** own one wedge competitors ignore — e.g. *local/offline
  video gen for privacy-bound users* ("Ollama for video"), and be the best at
  only that. A small defensible niche beats a broad indefensible platform.
- **Pick a vertical:** stop being horizontal infra; become "text-to-video for
  [e-commerce product videos / D&D scenes / educational explainers]" where
  workflow + templates + domain data are the moat, not the model.
- **Be a library, not a platform:** if the honest moat is "good abstraction
  code," ship it as the *de-facto open SDK* (the LiteLLM-for-video) and let the
  ecosystem standardize on you — distribution as moat, not tech.
- **Accept no-moat and optimize for speed/reputation:** treat it as a portfolio
  flagship and developer-reputation play, not a business. Legitimate and honest.

---

## 15. Roadmap & milestones

| Milestone | Scope | Exit criteria |
|---|---|---|
| **M0 — Foundation (now)** | Frontend exists, mocked route, design system | ✅ Done (current repo) |
| **M1 — Real backend, 1 provider** | FastAPI + queue + worker; 1 video provider (Replicate/Fal — easiest); job lifecycle persisted; asset storage | Submit a real prompt → real generated video appears in UI |
| **M2 — Multi-provider + LLM layer** | ≥3 video providers; LiteLLM prompt-enhance; model selection + capability validation; history | Pick model in UI; prompt enhancement works; history persists |
| **M3 — Self-host polish** | `docker compose up`; docs; key validation; moderation; health/status | A stranger self-hosts in <10 min from README |
| **M4 — API/SDK + webhooks** | OpenAPI, TS/Python SDK, webhooks, fallback chains | Integrator drives a generation headless |
| **M5 — Multi-user (flag)** | Auth, encrypted per-user keys, rate limits | Team self-host with isolated histories/keys |
| **M6 — Managed beta (optional)** | Metering, budgets, hosted deploy | First hosted user generates with metered billing |

---

## 16. Open questions

1. **Open-core boundary:** stay pure MIT, or carve managed-only features later?
   (Affects module structure now.)
2. **Default cheapest video provider** for the "it just works on install" path —
   Replicate-hosted open model vs. a free-tier API? (cost/quality/setup tradeoff)
3. **Progress UX:** polling vs SSE for v1 — start with polling (simpler), upgrade?
4. **Queue choice:** Redis+RQ (simpler) vs Celery (heavier, more features)?
5. **Telemetry:** opt-in anonymous usage stats for the north-star metric — how to
   do it privacy-respectfully and earn trust with the self-host crowd?
6. **Branding:** keep "VolfPack / text-to-video," given `site.ts` points at
   `volfpack.ai` but the repo lives under `volfpackonline` — reconcile domains/handles.
7. **Self-hosted GPU adapter:** ship in v1 or defer entirely to community?

---

### Appendix A — existing contract (source of truth, already in repo)
- `GenerateRequest`: `{prompt, aspectRatio(16:9|9:16|1:1), style(cinematic|realistic|anime|3d|claymation), duration(4|8|16)}`
- `VideoJob`: `{id, prompt, status(queued|processing|succeeded|failed), progress 0–100, videoUrl?, posterUrl?, createdAt, error?}`
- Frontend client: `src/lib/api.ts` (`generateVideo`) · mocked route: `src/app/api/generate/route.ts`
- Design system: `design.md` (soft pastel; honor it in all UI).
