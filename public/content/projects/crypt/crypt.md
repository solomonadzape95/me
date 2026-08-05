---
published: true
name: crypt
description: parametric SLA escrow that collateralises API uptime promises and settles sustained downtime on Stellar testnet.
logo: logo.svg
thumbnail: thumb.png
images: [shot-1.png, shot-2.png, shot-3.png, shot-4.png, shot-5.png, shot-6.png, shot-7.png, shot-8.png]
stack: [next.js, soroban, stellar sdk, supabase, recharts]
github: github.com/solomonadzape95/crypt
website: https://crypt.thesolenoid.space
date: 2026-03-01
status: in-progress
---
## stack
next.js 16, react 19, typescript, soroban, stellar sdk, supabase, recharts, tailwind v4

## problem
API service-level agreements are usually promises in a document. When a provider goes down, a small customer often has no practical way to enforce the refund without emails, invoices, and goodwill.

Crypt turns the promise into a testnet prototype: a provider locks a USDC guarantee in a Soroban escrow, a health-check oracle records consecutive failures, and sustained downtime makes the guarantee releasable to the subscriber.

## my role
I designed and built the monitoring dashboard, multi-wallet sign-in, escrow creation flow, live heartbeat states, and transaction feedback. I also implemented the Soroban state machine and connected the interface to testnet contract activity.

## decisions
- The UI treats funding, monitoring, threat, release, and refund as explicit states rather than hiding the contract lifecycle behind a generic wallet screen.
- Consecutive failures are required before settlement so one failed request cannot trigger a payout.
- The live demonstration includes a controlled failure path, making the complete state transition visible without pretending the prototype is a production oracle network.

## evidence
- Deployed Soroban contract and testnet transaction links are documented in the repository.
- Contract tests cover state transitions, token transfers, authorisation, and invalid operations.
- Separate CI workflows validate the frontend and contract code.

## limitations
This is a testnet prototype, not a production insurance product. The monitoring oracle is centralised, the contract is unaudited, and no real funds should be committed to it.
