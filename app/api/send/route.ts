import { EmailTemplate } from "../../components/email-template";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const data = await resend.emails.send({
      from: "d×e <hello@designengineer.xyz>",
      to: [res.email],
      subject: "Thanks for joining the d×e waitlist",
      react: EmailTemplate({ email: res.email }) as React.ReactElement<any>,
      text: "Thanks for subscribing to our waitlist! We'll be in touch when we're ready to let you in.",
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
