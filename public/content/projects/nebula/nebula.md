---
published: true
name: nebula
description: an unaudited Stellar testnet vault that supplies XLM to Blend and issues liquid, value-accruing nXLM shares.
logo: logo.svg
thumbnail: thumb.webp
images: [shot-1.webp, shot-2.webp, shot-3.webp, shot-4.webp, shot-5.webp, shot-6.webp]
stack: [soroban, rust, next.js, typescript, postgresql, stellar]
github: github.com/solomonadzape95/nebula
website: https://nebula.thesolenoid.space
date: 2026-07-28
status: in-progress
---
## problem
Yield on Stellar exists across lending and liquidity venues, but using it requires several manual steps and usually leaves the resulting position illiquid. Nebula explores a vault abstraction: deposit XLM, receive nXLM, and keep a transferable claim whose redemption value changes with the vault.

## my role
I built the responsive wallet interface, signed deposit and redemption flows, protocol dashboard, Soroban contracts, event indexer, and hosted PostgreSQL reporting layer.

## decisions
- The share price is derived from tracked assets and supply, with conversions rounded against the caller so repeated dust operations cannot drain value.
- Direct token donations do not alter tracked assets, preventing the classic first-depositor inflation path.
- Redemptions remain available even when other operations are paused, and venue losses are marked before exits are priced.
- The interface identifies testnet state and separates protocol explanation from wallet actions.

## evidence
- 64 contract tests cover accounting, lifecycle, access control, rounding, liquidity, drawdowns, and attack cases.
- An earlier testnet deployment exercised the real allowance, transfer, Blend supply, harvest, and redemption paths.
- The event indexer records contract activity into PostgreSQL through an idempotent scheduled sync.

## limitations
Nebula is unaudited and available on testnet only. The currently deployed contracts predate the latest security changes in the repository, so the live interface is demonstration evidence—not a current secure release. It uses one Blend strategy, has no production multisig or timelock, and should not hold real funds.
