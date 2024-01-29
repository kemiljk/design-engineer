import { JobSubmissionTemplate } from "../../components/email-template";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const data = await resend.emails.send({
      from: "dxe <hello@designengineer.xyz>",
      to: [res.email],
      subject: "Thanks for submitting a job",
      react: JobSubmissionTemplate({
        email: res.email,
      }) as React.ReactElement,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
