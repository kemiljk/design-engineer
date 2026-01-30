import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || "re_dummy");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return new NextResponse(unsubscribePageHtml("Invalid unsubscribe link."), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  const audienceId = process.env.NEXT_PUBLIC_RESEND_AUDIENCE_ID;
  if (!audienceId) {
    return new NextResponse(unsubscribePageHtml("Unable to process request."), {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }

  try {
    // Find and remove the contact from the audience
    const existingContacts = await resend.contacts.list({ audienceId });
    const contact = existingContacts.data?.data?.find((c) => c.email === email);

    if (contact) {
      await resend.contacts.remove({
        audienceId,
        id: contact.id,
      });
    }

    return new NextResponse(
      unsubscribePageHtml("You've been unsubscribed successfully.", true),
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      }
    );
  } catch {
    return new NextResponse(
      unsubscribePageHtml("Something went wrong. Please try again or contact us."),
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      }
    );
  }
}

// Also support POST for one-click unsubscribe (RFC 8058)
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const audienceId = process.env.NEXT_PUBLIC_RESEND_AUDIENCE_ID;
  if (!audienceId) {
    return NextResponse.json({ error: "Audience not configured" }, { status: 500 });
  }

  try {
    const existingContacts = await resend.contacts.list({ audienceId });
    const contact = existingContacts.data?.data?.find((c) => c.email === email);

    if (contact) {
      await resend.contacts.remove({
        audienceId,
        id: contact.id,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
  }
}

function unsubscribePageHtml(message: string, success = false) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribe | Design Engineer Course</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #fafafa;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .container {
      background: white;
      border-top: 4px solid ${success ? "#16a34a" : "#ff4400"};
      padding: 48px;
      max-width: 480px;
      text-align: center;
    }
    .icon {
      width: 48px;
      height: 48px;
      margin: 0 auto 24px;
      background: ${success ? "#dcfce7" : "#fff4f0"};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      color: #171717;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }
    p {
      font-size: 16px;
      color: #525252;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    a {
      color: #ff4400;
      text-decoration: none;
    }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">${success ? "✓" : "✕"}</div>
    <h1>${success ? "Unsubscribed" : "Oops"}</h1>
    <p>${message}</p>
    <a href="https://designengineer.xyz">← Back to designengineer.xyz</a>
  </div>
</body>
</html>`;
}
