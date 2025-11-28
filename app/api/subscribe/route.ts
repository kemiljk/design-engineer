import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const audienceId = process.env.NEXT_PUBLIC_RESEND_AUDIENCE_ID;
    if (!audienceId) {
      return NextResponse.json({ error: "Audience not configured" }, { status: 500 });
    }

    const existingContacts = await resend.contacts.list({ audienceId });
    const emails = existingContacts.data?.data?.map((c) => c.email) || [];

    if (!emails.includes(email)) {
      await resend.contacts.create({
        audienceId,
        email,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

