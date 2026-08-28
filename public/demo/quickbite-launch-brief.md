# QuickBite — India-first launch brief

## The outcome

QuickBite helps busy neighbourhoods order from trusted local restaurants with an experience that is quicker, clearer, and more dependable than scrolling through an endless catalogue. The launch experience must make three things feel obvious: what is available nearby, when it will arrive, and what happens if something goes wrong.

## Launch audience

Our initial audience is office-goers and young families in Bengaluru who order dinner two to four times each week. They value speed, predictable delivery windows, transparent prices, and familiar payment methods. They are willing to try a new ordering product only if the first order feels low-risk.

## Product principles

1. Start with useful value. Location and intent should reveal a useful restaurant list before we ask for profile details.
2. Make uncertainty visible. Clearly distinguish restaurant preparation time, courier pickup, and delivery estimate.
3. Design for recovery. A customer should always be able to see a payment, cancellation, or refund state without contacting support.
4. Keep the first launch focused. We are not launching loyalty, subscriptions, scheduled ordering, or a broad restaurant marketplace.

## Core launch flow

Location → cuisine or meal intent → restaurant collection → menu → cart → Razorpay checkout → order tracking → lightweight rating.

## Success signals

- A first-time user can reach a relevant restaurant in under 30 seconds.
- Payment state remains correct even if the checkout redirect or webhook arrives twice.
- Support can explain every refund using the provider reference and our internal state trail.

## Open questions

- What is the minimum acceptable delivery ETA precision for the first city?
- Should an unavailable item be substituted automatically or explicitly confirmed?
- Which support tool should receive refund exceptions during launch week?
