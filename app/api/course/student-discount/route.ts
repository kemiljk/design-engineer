import { NextRequest, NextResponse } from "next/server";
import { cosmic } from "@/lib/cosmic";
import { createStudentDiscount } from "@/lib/lemonsqueezy";
import { StudentDiscountEmailTemplate } from "@/app/components/email-template";
import { Resend } from "resend";
import { nanoid } from "nanoid";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const STUDENT_DOMAINS = [
  ".edu",
  ".ac.uk",
  ".edu.au",
  ".ac.nz",
  ".edu.sg",
  ".ac.in",
  ".edu.my",
  ".edu.ph",
  ".ac.za",
  ".edu.hk",
  ".ac.jp",
  ".edu.cn",
  ".ac.kr",
  ".edu.tw",
  ".ac.th",
  ".edu.vn",
  ".ac.id",
  ".edu.br",
  ".edu.mx",
  ".edu.ar",
  ".edu.co",
  ".edu.pe",
  ".edu.cl",
];

function isValidStudentEmail(email: string): boolean {
  const lowerEmail = email.toLowerCase();
  return STUDENT_DOMAINS.some((domain) => lowerEmail.endsWith(domain));
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!isValidStudentEmail(trimmedEmail)) {
      return NextResponse.json(
        {
          error:
            "Please use a valid student email address (e.g., .edu, .ac.uk). If you have a student email but it's not being recognised, please email us directly.",
        },
        { status: 400 }
      );
    }

    try {
      const { objects } = await cosmic.objects
        .find({
          type: "student-discounts",
          "metadata.email": trimmedEmail,
        })
        .props("id,metadata")
        .depth(1)
        .limit(1);

      if (objects && objects.length > 0) {
        return NextResponse.json(
          {
            error:
              "This email has already been used to request a student discount. If you need help, please contact us at hello@designengineer.xyz.",
          },
          { status: 409 }
        );
      }
    } catch (error: unknown) {
      if (error && typeof error === "object" && "status" in error && error.status !== 404) {
        console.error("Error checking existing discounts:", error);
      }
    }

    const discountCode = await createStudentDiscount(trimmedEmail);

    if (!discountCode) {
      return NextResponse.json(
        {
          error:
            "Failed to create discount code. Please try again or contact us at hello@designengineer.xyz.",
        },
        { status: 500 }
      );
    }

    const slug = `student-discount-${nanoid(8)}`;
    await cosmic.objects.insertOne({
      type: "student-discounts",
      title: `Student Discount: ${trimmedEmail}`,
      slug,
      metadata: {
        email: trimmedEmail,
        discount_code: discountCode,
        requested_at: new Date().toISOString(),
        status: "sent",
      },
    });

    try {
      await resend.emails.send({
        from: "d×e Course <hello@designengineer.xyz>",
        to: [trimmedEmail],
        subject: "Your Student Discount Code - Design Engineer Course 🎓",
        react: StudentDiscountEmailTemplate({
          email: trimmedEmail,
          discountCode,
        }) as React.ReactElement,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        {
          success: true,
          message:
            "Discount code created but email failed to send. Please contact us at hello@designengineer.xyz with your student email to receive your code.",
          code: discountCode,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Check your email! Your discount code has been sent.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Student discount error:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred. Please try again or contact us at hello@designengineer.xyz.",
      },
      { status: 500 }
    );
  }
}
