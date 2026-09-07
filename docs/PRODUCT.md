# Product notes — ATOM / Content Autopilot

Internal reference for website decisions. Not public copy.

## What we sell

Custom automation systems. First offer: **Content Autopilot**.

Finished content drops into one location → system detects, prepares, routes for approval → approved posts hand off to the scheduling/publishing layer → status is tracked.

Human approval is a checkpoint inside the automation — not the product itself.

**Value:** Automate repetitive operational work without giving up control.

## What we are not

- AI caption generator
- Social scheduler / Buffer replacement
- n8n template marketplace
- Generic AI agency
- Social media management company
- SaaS dashboard (at this stage)

Infrastructure (n8n, Buffer, OpenAI, Docker, Drive/Dropbox) stays quiet in public messaging.

## Customer (v1)

Mid-sized creators and creator teams who publish often, use multiple platforms, earn from content, and already feel operational drag (captions, approvals, scheduling).

Later: agencies, DTC brands, marketing teams, custom business automation.

## Go-to-market

**Founding Creator Program** (~3–5 creators): build without setup fee, 30-day use, continue as paying customers if valuable. No retroactive setup fee. Collect hours saved, posts processed, approval/failure rates, testimonials, patterns.

## Commercial model (directional)

| Offer | Setup | Monthly |
| --- | --- | --- |
| Content Autopilot | from 4,995 DKK | 995 DKK |
| Autopilot Pro | from 7,995 DKK | 1,995 DKK |
| Custom Automation | from 12,500 DKK | — |

Third-party software costs: generally paid by the customer.

Source of truth in code: `data/pricing.ts`.

## Deployment (product architecture)

Preferred: client-owned VPS → Docker → self-hosted n8n → client integrations.

Alternative: managed (e.g. n8n Cloud) when requested.

Public language stays simple (flexible private / managed infrastructure). Do not dump infrastructure onto the homepage.

## Brand / site tone

Confident, minimal, intelligent, precise, modern, technically sophisticated, premium.

AI = invisible infrastructure, not a gimmick.
