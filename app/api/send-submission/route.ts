import { EmailSubmissionTemplate } from "../../components/email-template";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || "re_dummy");

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const data = await resend.emails.send({
      from: "d×e <hello@designengineer.xyz>",
      to: [res.email],
      subject: "Thanks for submitting an article",
      react: EmailSubmissionTemplate({
        email: res.email,
      }) as React.ReactElement<any>,
      text: "Thanks for submitting an article! We'll be in touch when it's been approved.",
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
