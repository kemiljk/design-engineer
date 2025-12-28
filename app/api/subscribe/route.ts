import {
  EmailWaitlistTemplate,
  CourseWaitlistConfirmationTemplate,
} from "../../components/email-template";
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

    const isNewSubscriber = !emails.includes(email);

    if (isNewSubscriber) {
      await resend.contacts.create({
        audienceId,
        email,
      });

      // Send confirmation email to the subscriber
      await resend.emails.send({
        from: "d×e <hello@designengineer.xyz>",
        to: [email],
        subject: "You're on the list! Design Engineer Course",
        react: CourseWaitlistConfirmationTemplate({
          email,
        }) as React.ReactElement<unknown>,
        text: "Thanks for signing up to be notified about the Design Engineer Course. We'll let you know as soon as there's news.",
      });

      // Notify admin about new subscriber
      await resend.emails.send({
        from: "dxe <hello@designengineer.xyz>",
        to: ["hello@designengineer.xyz"],
        subject: "New course waitlist subscriber",
        react: EmailWaitlistTemplate({
          email,
        }) as React.ReactElement<unknown>,
        text: `${email} just signed up to be notified about the course.`,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

