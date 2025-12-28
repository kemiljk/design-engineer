# Design Engineer Course — Pricing Strategy

> Guide for setting up LemonSqueezy products and pricing tiers.

---

## Product Tiers Overview

### Tier Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CONVERGENCE: ALL-ACCESS                          │
│                         (Everything)                                │
│    Design + Engineering + Convergence | Web + iOS + Android         │
│                         £599                                        │
└─────────────────────────────────────────────────────────────────────┘

┌────────────────────────────┐  ┌────────────────────────────┐
│   DESIGN: FULL ACCESS      │  │  ENGINEERING: FULL ACCESS  │
│   (All Design Platforms)   │  │  (All Eng Platforms)       │
│   Web + iOS + Android      │  │  Web + iOS + Android       │
│         £299               │  │         £349               │
└────────────────────────────┘  └────────────────────────────┘

┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Design   │ │ Design   │ │ Design   │ │ Eng.     │ │ Eng.     │ │ Eng.     │
│ Web      │ │ iOS      │ │ Android  │ │ Web      │ │ iOS      │ │ Android  │
│ £129     │ │ £99      │ │ £99      │ │ £149     │ │ £129     │ │ £129     │
└──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
```

---

## Recommended Pricing

### Individual Platform Tracks

| Product Key | Name | Price (GBP) | Lessons | Notes |
|-------------|------|-------------|---------|-------|
| `design_web` | Design Track (Web) | £129 | 24 | Most popular design track |
| `design_ios` | Design Track (iOS) | £99 | 12 | Smaller, specialised |
| `design_android` | Design Track (Android) | £99 | 12 | Smaller, specialised |
| `engineering_web` | Engineering Track (Web) | £149 | 33 | Most comprehensive eng track |
| `engineering_ios` | Engineering Track (iOS) | £129 | 17 | Swift/SwiftUI |
| `engineering_android` | Engineering Track (Android) | £129 | 17 | Kotlin/Compose |

**Individual total if bought separately: £732**

### Full Track Bundles

| Product Key | Name | Price (GBP) | Includes | Savings |
|-------------|------|-------------|----------|---------|
| `design_full` | Design: Full Access | £299 | All 3 design platforms | Save £28 (8%) |
| `engineering_full` | Engineering: Full Access | £349 | All 3 engineering platforms | Save £58 (14%) |

**Rationale:**
- Design Full is slightly cheaper because engineering has more lessons
- Bundle savings are modest (8-14%) to encourage Convergence

### Convergence (Everything)

| Product Key | Name | Price (GBP) | Includes | Savings vs Individual |
|-------------|------|-------------|----------|----------------------|
| `full` | Convergence: All-Access | £599 | Everything + exclusive content | Save £133 (18%) |

**Rationale:**
- £599 is the anchor price for "everything"
- Still under the psychological £600 barrier
- Significant savings vs buying tracks separately
- Includes exclusive Convergence content (motion, accessibility, workflow, career)

---

## Pricing Psychology

### Why This Structure Works

1. **Decoy Effect**: Individual tracks look expensive per-lesson compared to bundles
2. **Anchor Pricing**: £732 individual total makes £599 feel like a bargain
3. **Clear Value Ladder**: Each tier has obvious additional value
4. **Platform Flexibility**: Mobile-only learners can buy just iOS/Android

### Price Anchoring Strategy

Show on pricing page:
```
Individual Tracks Total: £732 (strikethrough)
Convergence All-Access:  £599
YOU SAVE: £133 (18%)
```

---

## LemonSqueezy Setup

### Environment Variables Needed

Add these to your `.env.local` and production environment:

```bash
# Individual platform tracks
LEMON_PRODUCT_DESIGN_WEB=variant_id_here
LEMON_PRODUCT_DESIGN_IOS=variant_id_here
LEMON_PRODUCT_DESIGN_ANDROID=variant_id_here
LEMON_PRODUCT_ENGINEERING_WEB=variant_id_here
LEMON_PRODUCT_ENGINEERING_IOS=variant_id_here
LEMON_PRODUCT_ENGINEERING_ANDROID=variant_id_here

# Full track bundles
LEMON_PRODUCT_DESIGN_FULL=variant_id_here
LEMON_PRODUCT_ENGINEERING_FULL=variant_id_here

# Everything bundle
LEMON_PRODUCT_FULL=variant_id_here
```

### Creating Products in LemonSqueezy

For each product, create in LemonSqueezy Dashboard:

1. **Go to**: Store → Products → Add Product
2. **Product Type**: Digital Product (one-time payment)
3. **Pricing**: Set as per table above (in pence for GBP)
4. **Copy Variant ID**: From the product URL or API response

#### Product Details Template

**Convergence: All-Access**
```
Name: Convergence: All-Access
Description: Complete access to all Design Engineer Course content — Design Track, Engineering Track, and exclusive Convergence content across Web, iOS, and Android platforms.
Price: £599.00
```

**Design: Full Access**
```
Name: Design: Full Access
Description: Complete Design Track access across all platforms — Web, iOS, and Android. Master visual design principles, design tools, and platform-specific patterns.
Price: £299.00
```

**Engineering: Full Access**
```
Name: Engineering: Full Access  
Description: Complete Engineering Track access across all platforms — Web, iOS, and Android. Learn to build beautiful interfaces with HTML/CSS/JS, SwiftUI, and Jetpack Compose.
Price: £349.00
```

---

## Student Discount

Current implementation creates a **30% off** single-use discount code.

### Pricing with Student Discount

| Tier | Original | With 30% Off |
|------|----------|--------------|
| Design Web | £129 | £90 |
| Engineering Web | £149 | £104 |
| Design Full | £299 | £209 |
| Engineering Full | £349 | £244 |
| Convergence | £599 | £419 |

---

## Launch Pricing Strategy

### Option A: Early Bird Discount (Recommended)

For launch, offer **25% off** for first 48-72 hours:

| Tier | Regular | Early Bird (25% off) |
|------|---------|---------------------|
| Design Web | £129 | £97 |
| Engineering Web | £149 | £112 |
| Design Full | £299 | £224 |
| Engineering Full | £349 | £262 |
| Convergence | £599 | £449 |

Create time-limited discount codes in LemonSqueezy:
- Code: `LAUNCH25`
- Type: Percentage (25%)
- Expiry: 48-72 hours after launch
- Applies to: All products

### Option B: Founding Member Pricing

Instead of discount codes, create separate "Founding Member" variants with lower prices, then discontinue after launch window.

---

## Future Pricing Considerations

### Price Increases

Consider raising prices after:
- First 500 students
- Adding significant new content
- Reaching specific milestones

### Team/Enterprise Pricing

Future consideration:
- 5+ seats: 20% discount
- 10+ seats: 30% discount
- Enterprise: Custom pricing + invoicing

### Regional Pricing

The currency converter shows approximate prices, but you could offer:
- PPP (Purchasing Power Parity) discounts for certain regions
- Region-specific pricing in LemonSqueezy

---

## Competitive Analysis

| Course | Price | Content |
|--------|-------|---------|
| Frontend Masters (Annual) | £299/year | Subscription, all courses |
| Designlab UX Academy | £4,000+ | Bootcamp with mentorship |
| Codecademy Pro | £15/month | Subscription, generic content |
| **d×e Convergence** | **£599 (lifetime)** | Design + Engineering + Career |

**Our positioning**: Premium one-time payment, lifetime access, specific to Design Engineering role.

---

## Conversion Optimisation

### Trust Signals

Include on pricing page:
- 14-day money-back guarantee
- Student companies/logos
- Testimonials
- Lesson count (156+ lessons)
- "Lifetime access" messaging

### Urgency (Use Sparingly)

- Launch discount countdown
- "X students enrolled" counter
- Limited founding member spots

### Reduce Friction

- Guest checkout available
- Multiple payment methods
- Clear refund policy
- FAQ section

---

## Metrics to Track

1. **Conversion Rate**: Pricing page → Purchase
2. **Tier Distribution**: Which products sell most
3. **Average Order Value**: Track bundle vs individual
4. **Discount Code Usage**: Track which codes work
5. **Refund Rate**: Should be <5%

---

*Last updated: December 2024*
