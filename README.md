# GULLY//OS v2 — Kaka's Tapri ☕

> **AWS Student Builder Challenge** submission — a portfolio website where an AI chai-wala named Kaka answers your questions in Hinglish, drives the UI through agentic tool use, and runs entirely on AWS.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/Lambda-Node.js_24-FF9900?logo=awslambda&logoColor=white)
![Bedrock](https://img.shields.io/badge/Bedrock-Converse_API-232F3E?logo=amazonaws&logoColor=white)
![Amplify](https://img.shields.io/badge/Amplify-Hosting-FF9900?logo=awsamplify&logoColor=white)

## 🎯 What Is This?

**GULLY//OS** is a gully-themed (Indian street-style) interactive portfolio that replaces the traditional "About Me" page with **Kaka** — an AI assistant who sits at a virtual chai stall and knows everything about the portfolio owner's work.

### The Creative Feature: Kaka (AI Chai-Wala)
- **Answers in Hinglish, English, or Marathi** — mirrors the visitor's language
- **Drives the UI with tool use** — opens project shutters, scrolls to sections
- **Knows only what's in `knowledge.json`** — no hallucination, no prompt injection
- **Graceful offline fallback** — works without AWS using keyword-matched chips
- **Kill switch** — one SAM parameter to disable AI without redeploying code

## 🏗️ Architecture

```
┌─────────────┐    ┌──────────────┐    ┌──────────┐    ┌─────────┐
│  Amplify     │    │  API Gateway │    │  Lambda  │    │ Bedrock │
│  (React+Vite)│───▶│  (HTTP API)  │───▶│  (arm64) │───▶│Converse │
│              │    │  CORS+Throttle│   │  Node 24 │    │Tool Use │
└─────────────┘    └──────────────┘    └──────────┘    └─────────┘
       │                                     │
       │           knowledge.json            │
       └─────────── (single source) ─────────┘
```

- **Frontend**: React 19 + Vite, deployed on AWS Amplify Hosting
- **Backend**: Lambda (Node.js 24, arm64) behind API Gateway HTTP API
- **AI**: Amazon Bedrock Converse API with tool use (`open_project`, `scroll_to`)
- **Infra as Code**: SAM template with $5 budget alarm, CloudWatch error alerts, rate limiting
- **Content**: Single `knowledge.json` drives both the UI and the AI's knowledge

## 📁 Repo Structure

```
gully-os/
├── knowledge.json              ← THE file — all content lives here
├── template.yaml               ← SAM: HTTP API, Lambda, IAM, alarms, budget
├── amplify.yml                 ← Amplify build settings
├── scripts/sync-knowledge.mjs  ← Validates & copies knowledge.json
├── backend/kaka/index.mjs      ← Lambda: Bedrock Converse with tool use
└── src/
    ├── components/             ← Nav, Hero, Skills, Projects, Contact, KakaPanel
    ├── lib/                    ← kaka.js (API + fallback), actions.js (tool dispatch)
    ├── styles/                 ← tokens.css (design tokens), global.css
    └── data/knowledge.json     ← Auto-generated copy (do not edit)
```

## 🚀 Run Locally

```bash
npm ci
npm run dev          # Syncs knowledge.json → starts Vite at localhost:5173
```

Kaka works in **offline fallback mode** until you set `VITE_KAKA_API` in `.env.local`.

## ☁️ Deploy Backend

```bash
npm run sam:build    # Syncs knowledge.json → sam build
sam deploy --guided  # Set: ModelId, AllowedOrigin, AlertEmail
```

Then connect it to the frontend:
```bash
echo "VITE_KAKA_API=<KakaApiUrl from output>" > .env.local
npm run dev
```

## 🛡️ Safety & Cost Controls

| Control | How |
|---|---|
| **$5 monthly budget** | AWS Budgets alarm at 80% threshold |
| **Error alerts** | CloudWatch alarm → SNS email after 3 errors/5min |
| **Rate limiting** | API Gateway: 5 req/s sustained, burst 10 |
| **Concurrency cap** | Lambda reserved to 5 concurrent executions |
| **Kill switch** | `sam deploy --parameter-overrides AiDisabled=1` |
| **Input sanitization** | Messages capped at 300 chars, last 6 only |
| **Prompt injection defense** | System prompt instructs to ignore rule-changing instructions |
| **Graceful degradation** | Falls back to keyword-matched chips on any failure |

## 🎨 Design: The Gully Aesthetic

- **Corrugated shutters** — tap to roll up and reveal project details
- **Sticker skills** — colorful rotated badges like street stickers
- **Notice board** — pinned paper card with bio, tilted with a pink shadow
- **Chai-stall chat** — floating "ASK KAKA ☕" button opens the panel
- **Palette**: Asphalt dark (#17161a), Chai orange (#e9923b), Sticker pink (#e6457a), Paper cream (#f3ead3), Shutter teal (#3f6f73)
- **Fonts**: Rubik Mono One (display) + Hind (body)

## 📱 Responsive

- Desktop: sticky top nav, large hero, side chat panel
- Mobile (≤640px): bottom tab bar, Kaka button above it, full-width chat

## 👤 About Me

**Vedant Gaikwad** — AI/ML Developer, UN Millennium Fellow, published researcher from Nashik, India. I build agentic AI systems that solve real problems — from courtrooms to classrooms.

## 📄 License

MIT
