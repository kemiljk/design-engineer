# Webhook Production Readiness Checklist

## ✅ Code Setup (Complete)

- [x] Webhook route exists: `app/api/webhooks/lemonsqueezy/route.ts`
- [x] Route is marked as public in `proxy.ts` (line 20)
- [x] Webhook handler extracts `variant_id` from `attributes.first_order_item.variant_id`
- [x] TypeScript interfaces updated to match Lemon Squeezy payload structure
- [x] Signature verification implemented
- [x] Enrollment creation logic working

## 🔧 Production Environment Variables

Ensure these are set in your production environment (Vercel/hosting):

- `LEMONSQUEEZY_WEBHOOK_SECRET` - Webhook secret from Lemon Squeezy dashboard
- `LEMONSQUEEZY_API_KEY` - API key for Lemon Squeezy API calls
- `LEMONSQUEEZY_STORE_ID` - Your store ID
- `LEMON_PRODUCT_DESIGN_WEB` - Variant ID for Design Track (Web)
- `LEMON_PRODUCT_DESIGN_IOS` - Variant ID for Design Track (iOS)
- `LEMON_PRODUCT_DESIGN_ANDROID` - Variant ID for Design Track (Android)
- `LEMON_PRODUCT_ENGINEERING_WEB` - Variant ID for Engineering Track (Web)
- `LEMON_PRODUCT_ENGINEERING_IOS` - Variant ID for Engineering Track (iOS)
- `LEMON_PRODUCT_ENGINEERING_ANDROID` - Variant ID for Engineering Track (Android)
- `LEMON_PRODUCT_DESIGN_FULL` - Variant ID for Design Full Access
- `LEMON_PRODUCT_ENGINEERING_FULL` - Variant ID for Engineering Full Access
- `LEMON_PRODUCT_FULL` - Variant ID for Convergence (All-Access)

## 🌐 Lemon Squeezy Webhook Configuration

In Lemon Squeezy Dashboard → Settings → Webhooks:

1. **Webhook URL**: `https://designengineer.xyz/api/webhooks/lemonsqueezy`
2. **Events**: Ensure `order_created` is selected
3. **Secret**: Copy the webhook secret and set it as `LEMONSQUEEZY_WEBHOOK_SECRET` in production

## ⚠️ Important Notes

### Middleware Configuration

Your `proxy.ts` file lists the webhook route as public (line 20), which is correct. However, Next.js typically requires middleware to be in a file named `middleware.ts` at the root. 

**If webhooks fail in production:**
- Check if `proxy.ts` is being used as middleware
- If not, you may need to rename `proxy.ts` to `middleware.ts` OR
- Create a `middleware.ts` that imports from `proxy.ts`

### Testing Production

After deployment:
1. Use Lemon Squeezy's "Send test" button to verify the webhook URL
2. Check your production logs for any errors
3. Create a test order to verify full enrollment flow

### What Should Work

Since local testing with ngrok works, production should work IF:
- ✅ All environment variables are set correctly
- ✅ The webhook URL in Lemon Squeezy points to `https://designengineer.xyz/api/webhooks/lemonsqueezy`
- ✅ The route is accessible (not blocked by auth/middleware)
- ✅ The code is deployed to production

## 🐛 Troubleshooting

If webhooks fail in production:

1. **Check Vercel/hosting logs** for errors
2. **Verify environment variables** are set correctly
3. **Test the endpoint** manually: `curl -X POST https://designengineer.xyz/api/webhooks/lemonsqueezy`
4. **Check middleware** - ensure `proxy.ts` is active or create `middleware.ts`
5. **Verify webhook secret** matches between Lemon Squeezy and production env vars

