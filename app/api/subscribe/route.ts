import {
  EmailWaitlistTemplate,
  CourseWaitlistConfirmationTemplate,
  CourseNewsletterWelcomeTemplate,
} from "../../components/email-template";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getCourseAvailability } from "@/lib/cosmic";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || "re_dummy");

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const audienceId = process.env.NEXT_PUBLIC_RESEND_AUDIENCE_ID;
    if (!audienceId) {
      return NextResponse.json(
        { error: "Audience not configured" },
        { status: 500 },
      );
    }

    const existingContacts = await resend.contacts.list({ audienceId });
    const emails = existingContacts.data?.data?.map((c) => c.email) || [];

    const isNewSubscriber = !emails.includes(email);

    if (isNewSubscriber) {
      await resend.contacts.create({
        audienceId,
        email,
      });

      const { is_available } = await getCourseAvailability();
      const unsubscribeUrl = `https://designengineer.xyz/api/unsubscribe?email=${encodeURIComponent(email)}`;

      if (is_available) {
        // Send course welcome email
        await resend.emails.send({
          from: "d×e <hello@designengineer.xyz>",
          to: [email],
          subject: "Welcome to Design Engineer Updates",
          react: CourseNewsletterWelcomeTemplate({
            email,
          }) as React.ReactElement<unknown>,
          text: "Thanks for signing up to receive updates from Design Engineer. We'll keep you posted on new content.",
          headers: {
            "List-Unsubscribe": `<${unsubscribeUrl}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
        });
      } else {
        // Send waitlist confirmation email
        await resend.emails.send({
          from: "d×e <hello@designengineer.xyz>",
          to: [email],
          subject: "You're on the list! Design Engineer Course",
          react: CourseWaitlistConfirmationTemplate({
            email,
          }) as React.ReactElement<unknown>,
          text: "Thanks for signing up to be notified about the Design Engineer Course. We'll let you know as soon as there's news.",
          headers: {
            "List-Unsubscribe": `<${unsubscribeUrl}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
        });
      }

      // Notify admin about new subscriber
      await resend.emails.send({
        from: "d×e <hello@designengineer.xyz>",
        to: ["hello@designengineer.xyz"],
        subject: is_available
          ? "New newsletter subscriber"
          : "New course waitlist subscriber",
        react: EmailWaitlistTemplate({
          email,
        }) as React.ReactElement<unknown>,
        text: `${email} just signed up.`,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
