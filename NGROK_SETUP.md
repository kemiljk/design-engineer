# ngrok Setup for Webhook Testing

## Step 1: Get Your ngrok Auth Token

1. Sign up for a free account at [ngrok.com](https://ngrok.com/signup)
2. After signing up, go to [Your Authtoken](https://dashboard.ngrok.com/get-started/your-authtoken)
3. Copy your authtoken

## Step 2: Configure ngrok

Run this command (replace `YOUR_AUTH_TOKEN` with your actual token):

```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

## Step 3: Start ngrok Tunnel

Once authenticated, start the tunnel:

```bash
ngrok http 3000
```

This will display output like:
```
Session Status                online
Account                       Your Name (Plan: Free)
Version                       3.x.x
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok-free.app -> http://localhost:3000
```

## Step 4: Update Lemon Squeezy Webhook

1. Copy the `Forwarding` URL (e.g., `https://abc123.ngrok-free.app`)
2. Go to Lemon Squeezy Dashboard → Settings → Webhooks
3. Update the webhook URL to: `https://abc123.ngrok-free.app/api/webhooks/lemonsqueezy`
4. Save

## Step 5: Test

Use Lemon Squeezy's "Send test" button. You can monitor requests at:
- ngrok web interface: http://localhost:4040
- Your Next.js dev server terminal

## Important Notes

- The ngrok URL changes each time you restart ngrok (unless you have a paid plan)
- Remember to revert the webhook URL back to production after testing
- Your `.env.local` should have `LEMON_SQUEEZY_WEBHOOK_SECRET` set for signature verification

