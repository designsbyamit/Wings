# Growth Sweet Spot Algorithm

The engine deliberately separates evidence from aspiration.

## Strength score
For each hard or soft skill:
strength = 0.35 frequency + 0.35 impact + 0.20 evidence + 0.10 confidence

All inputs are normalised to 0-100.

## Interest score
interest = 0.25 pull + 0.20 energy + 0.20 depth + 0.20 persistence + 0.15 experimentation

## Market score
market = 0.45 demand + 0.35 trend + 0.20 geographic fit

## Opportunity score
opportunity = 0.30 hard_skill_fit + 0.20 soft_skill_fit + 0.20 interest_fit + 0.20 market_fit + 0.10 evidence_strength

## Guardrails
- Never recommend solely from market demand.
- Distinguish proven strengths from emerging strengths.
- Distinguish genuine interest from social/inspirational curiosity.
- Low evidence reduces confidence, not possibility.
- Return 3-5 growth territories, not one "perfect career".
- Show why each territory scored well and what evidence is missing.
