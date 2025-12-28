# Design Engineer Course — Final Setup Checklist

> Complete this checklist to finalize the course pricing, LemonSqueezy products, and Cosmic schema.

---

## 1. Update Cosmic Schema

The course-enrollments object type needs the new `design_full` and `engineering_full` access levels.

### Option A: Via API (Recommended)

In development, call the update endpoint:

```bash
# Check current schema
curl http://localhost:3000/api/course/admin/update-enrollment-schema

# Update schema (requires authentication)
curl -X POST http://localhost:3000/api/course/admin/update-enrollment-schema
```

In production with admin key:

```bash
curl -X POST https://yoursite.com/api/course/admin/update-enrollment-schema \
  -H "x-admin-api-key: YOUR_ADMIN_API_KEY"
```

### Option B: Via Cosmic Dashboard

1. Go to [Cosmic Dashboard](https://app.cosmicjs.com)
2. Navigate to **Object Types** → **course-enrollments**
3. Edit the **Access Level** select field
4. Add these options:
   - `design_full` — Design (Full Access)
   - `engineering_full` — Engineering (Full Access)
5. Save changes

### Access Levels Reference

| Value | Display Name | Access |
|-------|-------------|--------|
| `free` | Free | Intro + first lessons only |
| `design_web` | Design (Web) | Design Track - Web platform |
| `design_ios` | Design (iOS) | Design Track - iOS platform |
| `design_android` | Design (Android) | Design Track - Android platform |
| `design_full` | Design (Full Access) | All Design Track platforms |
| `engineering_web` | Engineering (Web) | Engineering Track - Web platform |
| `engineering_ios` | Engineering (iOS) | Engineering Track - iOS platform |
| `engineering_android` | Engineering (Android) | Engineering Track - Android platform |
| `engineering_full` | Engineering (Full Access) | All Engineering Track platforms |
| `full` | Convergence (All Access) | Everything |

---

## 2. Create LemonSqueezy Products

### Step 1: Log into LemonSqueezy

Go to [LemonSqueezy Dashboard](https://app.lemonsqueezy.com) → Store → Products

### Step 2: Create Each Product

For each product below, click **Add Product** and configure:

#### Individual Platform Tracks

| Product Name | Price | Description |
|-------------|-------|-------------|
| Design Track (Web) | £129 | Master visual design principles for the web. 24 comprehensive lessons covering typography, colour theory, design tools, and UX principles. |
| Design Track (iOS) | £99 | Master visual design for iOS. 12 lessons on Human Interface Guidelines, SF Symbols, and iOS design patterns. |
| Design Track (Android) | £99 | Master Material Design for Android. 12 lessons on Material 3, Android components, and design patterns. |
| Engineering Track (Web) | £149 | Learn to build beautiful web interfaces. 33 lessons covering HTML, CSS, JavaScript, and component architecture. |
| Engineering Track (iOS) | £129 | Learn Swift and SwiftUI. 17 lessons on iOS development, components, and design systems in code. |
| Engineering Track (Android) | £129 | Learn Kotlin and Jetpack Compose. 17 lessons on Android development and design implementation. |

#### Bundle Products (NEW)

| Product Name | Price | Description |
|-------------|-------|-------------|
| Design: Full Access | £299 | Complete Design Track across all platforms — Web, iOS, and Android. 48+ lessons covering visual design fundamentals and platform-specific patterns. |
| Engineering: Full Access | £349 | Complete Engineering Track across all platforms — Web, iOS, and Android. 67+ lessons on web and mobile development. |
| Convergence: All-Access | £599 | Everything included — all Design and Engineering tracks, plus exclusive Convergence content on motion, accessibility, workflow, and career guidance. 156+ lessons total. |

### Step 3: Product Settings for Each

For each product:

1. **Product Type**: Digital Product
2. **Payment Type**: One-time payment
3. **Price**: As specified above (in GBP)
4. **Tax Category**: Digital services
5. **Redirect URL**: `https://yoursite.com/course?purchase=success`

### Step 4: Get Variant IDs

After creating each product:

1. Click on the product
2. Look at the URL or product details for the **Variant ID**
3. Record each variant ID

---

## 3. Set Environment Variables

Add these to your `.env.local` (development) and production environment:

```bash
# Individual platform tracks
LEMON_PRODUCT_DESIGN_WEB=123456          # Replace with actual variant ID
LEMON_PRODUCT_DESIGN_IOS=123457
LEMON_PRODUCT_DESIGN_ANDROID=123458
LEMON_PRODUCT_ENGINEERING_WEB=123459
LEMON_PRODUCT_ENGINEERING_IOS=123460
LEMON_PRODUCT_ENGINEERING_ANDROID=123461

# Bundle products (NEW)
LEMON_PRODUCT_DESIGN_FULL=123462         # NEW
LEMON_PRODUCT_ENGINEERING_FULL=123463    # NEW

# Full access (Convergence)
LEMON_PRODUCT_FULL=123464

# LemonSqueezy config (existing)
LEMONSQUEEZY_API_KEY=your_api_key
LEMONSQUEEZY_STORE_ID=your_store_id
LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_secret

# Optional: Admin API key for production schema updates
ADMIN_API_KEY=a_secure_random_string
```

### Finding Your Variant IDs

1. In LemonSqueezy, go to **Products**
2. Click on a product
3. The variant ID is in:
   - The URL: `app.lemonsqueezy.com/products/123/variants/456` → variant ID is `456`
   - Or click **Variants** tab → copy the ID

---

## 4. Configure Webhook

### Step 1: Add Webhook in LemonSqueezy

1. Go to **Settings** → **Webhooks**
2. Click **Add Webhook**
3. Configure:
   - **URL**: `https://yoursite.com/api/webhooks/lemonsqueezy`
   - **Events**: Select these events:
     - `order_created`
     - `order_refunded`
     - `subscription_created` (if adding subscriptions later)
   - **Secret**: Generate a secret and save it

### Step 2: Set Webhook Secret

Add the secret to your environment:

```bash
LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_secret_here
```

---

## 5. Update Webhook Handler

The webhook handler needs to map new product variant IDs to access levels.

Current file: `app/api/webhooks/lemonsqueezy/route.ts`

Ensure the `getProductKeyFromVariantId` function in `lib/lemonsqueezy.ts` can map your variant IDs correctly. This should work automatically if environment variables are set correctly.

---

## 6. Create Student Discount

### Automatic Student Discounts

The existing student discount system creates 30% off codes automatically. No changes needed.

### Manual Launch Discount

For launch, create a time-limited discount:

1. Go to LemonSqueezy → **Discounts**
2. Click **Add Discount**
3. Configure:
   - **Name**: Early Bird Launch
   - **Code**: `LAUNCH25`
   - **Amount**: 25%
   - **Type**: Percentage
   - **Applies to**: All products
   - **Starts**: Your launch date
   - **Expires**: 48-72 hours after launch
   - **Usage limit**: Unlimited (or set a cap)

---

## 7. Testing Checklist

### Test in Development

- [ ] All products appear on pricing page
- [ ] Currency selector works
- [ ] Prices convert correctly
- [ ] Checkout redirects to LemonSqueezy
- [ ] Webhook creates enrollment in Cosmic
- [ ] Access levels grant correct content access

### Test Each Access Level

- [ ] `design_web` → Can access design-track/web only
- [ ] `design_full` → Can access all design-track platforms
- [ ] `engineering_web` → Can access engineering-track/web only
- [ ] `engineering_full` → Can access all engineering-track platforms
- [ ] `full` → Can access everything including convergence

### LemonSqueezy Test Mode

1. Enable **Test Mode** in LemonSqueezy dashboard
2. Use test card: `4242 4242 4242 4242`
3. Complete a test purchase
4. Verify webhook fires and enrollment is created

---

## 8. Launch Checklist

### Before Launch

- [ ] All products created in LemonSqueezy
- [ ] All variant IDs set in environment variables
- [ ] Cosmic schema updated with new access levels
- [ ] Webhook configured and tested
- [ ] Student discount system working
- [ ] Launch discount code created (optional)
- [ ] Pricing page displays correctly
- [ ] Course landing page shows pricing preview
- [ ] Test purchases work end-to-end

### Launch Day

- [ ] Disable LemonSqueezy test mode
- [ ] Announce on social media (see LAUNCH-MARKETING.md)
- [ ] Send waitlist email (see LAUNCH-MARKETING.md)
- [ ] Monitor for first purchases
- [ ] Watch for webhook errors in logs

### Post-Launch

- [ ] Monitor conversion rates
- [ ] Track which tiers sell best
- [ ] Watch for refund requests
- [ ] Gather early feedback

---

## Quick Reference: File Locations

| Purpose | File |
|---------|------|
| Product configuration | `lib/lemonsqueezy.ts` |
| Access level mapping | `lib/course.ts` |
| Type definitions | `lib/types.ts` |
| Webhook handler | `app/api/webhooks/lemonsqueezy/route.ts` |
| Pricing page | `app/course/pricing/page.tsx` |
| Pricing cards | `app/course/pricing/pricing-card.tsx` |
| Currency conversion | `lib/currency.ts` |
| Schema update API | `app/api/course/admin/update-enrollment-schema/route.ts` |

---

## Troubleshooting

### Products Not Showing on Pricing Page

1. Check environment variables are set
2. Verify variant IDs are correct
3. Check LemonSqueezy API key has read access
4. Look for errors in browser console

### Webhook Not Working

1. Check webhook URL is correct (use ngrok for local testing)
2. Verify webhook secret matches
3. Check LemonSqueezy webhook logs for errors
4. Check server logs for webhook endpoint errors

### Access Level Not Granted

1. Check enrollment was created in Cosmic
2. Verify `access_level` field is set correctly
3. Check `product_id` matches expected value
4. Ensure user ID matches between Clerk and enrollment

### Currency Not Converting

1. Check `/api/currency` endpoint returns rates
2. Frankfurter API may be temporarily down
3. Falls back to GBP if conversion fails

---

*Last updated: December 2024*
