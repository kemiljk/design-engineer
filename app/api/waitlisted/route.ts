import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { EmailWaitlistTemplate } from "../../components/email-template";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const data = await resend.emails.send({
      from: "dxe <hello@designengineer.xyz>",
      to: ["hello@designengineer.xyz"],
      subject: "New d×e waitlist subscriber",
      react: EmailWaitlistTemplate({
        email: res.email,
      }) as React.ReactElement,
      text: "You got a new waitlist subscriber!",
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
