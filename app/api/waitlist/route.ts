import { cosmic } from "@/lib/cosmic";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const waitlist = "8687acca-4a77-4161-855a-c43b8e8fc38d";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    await cosmic.objects.insertOne(res.email);
    const data = await resend.contacts.create({
      email: res.email.title,
      unsubscribed: false,
      audience_id: waitlist,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
