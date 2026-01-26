import { JobSubmissionReceivedTemplate } from "../../components/email-template";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const data = await resend.emails.send({
      from: "d×e <hello@designengineer.xyz>",
      to: ["hello@designengineer.xyz"],
      subject: "New d×e job submission",
      react: JobSubmissionReceivedTemplate({
        email: res.email,
        title: res.title,
        company: res.company,
      }) as React.ReactElement<any>,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
