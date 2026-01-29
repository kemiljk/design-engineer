import * as React from "react";

interface EmailTemplateProps {
  email: string;
  url?: string;
  title?: string;
  company?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
}) => (
  <div>
    <h1>Thanks for subscribing to our waitlist!</h1>
    <p>
      We&apos;ll be in touch at {email} when we&apos;re ready to let you in.
    </p>
  </div>
);

export const EmailWaitlistTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
}) => (
  <div>
    <h1>New d×e waitlist subscriber!</h1>
    <p>{email} just signed up.</p>
  </div>
);

export const CourseNewsletterWelcomeTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ email }) => (
  <div
    style={{
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
    }}
  >
    {/* Header with brand accent */}
    <div
      style={{
        borderTop: "4px solid #ff4400",
        padding: "32px 24px 24px",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#ff4400",
          margin: "0 0 16px 0",
        }}
      >
        Design Engineer
      </p>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#171717",
          margin: "0 0 16px 0",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        Welcome to the community
      </h1>
      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.6,
          color: "#525252",
          margin: "0",
        }}
      >
        Thanks for signing up to receive updates from Design Engineer.
        We&apos;ll keep you posted on new content, features, and announcements
        at <strong style={{ color: "#171717" }}>{email}</strong>.
      </p>
    </div>

    {/* What to expect */}
    <div
      style={{
        padding: "24px",
        backgroundColor: "#fafafa",
        borderTop: "1px solid #e5e5e5",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <h2
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#171717",
          margin: "0 0 16px 0",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        What&apos;s Next?
      </h2>
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.6,
          color: "#525252",
          margin: "0 0 16px 0",
        }}
      >
        We send occasional updates about:
      </p>
      <ul
        style={{
          margin: "0",
          padding: "0",
          listStyle: "none",
        }}
      >
        <li
          style={{
            fontSize: "15px",
            lineHeight: 1.5,
            color: "#525252",
            padding: "8px 0",
            paddingLeft: "24px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "0",
              color: "#ff4400",
              fontWeight: 700,
            }}
          >
            →
          </span>
          New course modules and lessons
        </li>
        <li
          style={{
            fontSize: "15px",
            lineHeight: 1.5,
            color: "#525252",
            padding: "8px 0",
            paddingLeft: "24px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "0",
              color: "#ff4400",
              fontWeight: 700,
            }}
          >
            →
          </span>
          Design Engineering tips and tutorials
        </li>
        <li
          style={{
            fontSize: "15px",
            lineHeight: 1.5,
            color: "#525252",
            padding: "8px 0",
            paddingLeft: "24px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "0",
              color: "#ff4400",
              fontWeight: 700,
            }}
          >
            →
          </span>
          Project showcases and community news
        </li>
      </ul>
    </div>

    {/* CTA Section */}
    <div style={{ padding: "24px", textAlign: "center" }}>
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.6,
          color: "#525252",
          margin: "0 0 20px 0",
        }}
      >
        Ready to start learning?
      </p>
      <a
        href="https://designengineer.xyz/course"
        style={{
          display: "inline-block",
          backgroundColor: "#ff4400",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 600,
          textDecoration: "none",
          padding: "12px 24px",
          letterSpacing: "0.02em",
        }}
      >
        Explore the Course →
      </a>
    </div>

    {/* Footer */}
    <div
      style={{
        padding: "24px",
        borderTop: "1px solid #e5e5e5",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "13px",
          color: "#a3a3a3",
          margin: "0 0 8px 0",
          lineHeight: 1.5,
        }}
      >
        d×e · Design Engineer
      </p>
      <a
        href="https://designengineer.xyz"
        style={{
          fontSize: "13px",
          color: "#a3a3a3",
          textDecoration: "none",
        }}
      >
        designengineer.xyz
      </a>
      <p
        style={{
          fontSize: "12px",
          color: "#a3a3a3",
          margin: "20px 0 0 0",
          lineHeight: 1.6,
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        You&apos;re receiving this email because you signed up for updates at
        designengineer.xyz. No longer interested?{" "}
        <a
          href={`https://designengineer.xyz/api/unsubscribe?email=${encodeURIComponent(email)}`}
          style={{
            color: "#a3a3a3",
            textDecoration: "underline",
          }}
        >
          Unsubscribe here
        </a>
        .
      </p>
    </div>
  </div>
);

export const CourseWaitlistConfirmationTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ email }) => (
  <div
    style={{
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
    }}
  >
    {/* Header with brand accent */}
    <div
      style={{
        borderTop: "4px solid #ff4400",
        padding: "32px 24px 24px",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#ff4400",
          margin: "0 0 16px 0",
        }}
      >
        Design Engineer Course
      </p>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#171717",
          margin: "0 0 16px 0",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        You&apos;re on the list!
      </h1>
      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.6,
          color: "#525252",
          margin: "0",
        }}
      >
        Thanks for signing up to be notified about the Design Engineer Course.
        We&apos;ll let you know at{" "}
        <strong style={{ color: "#171717" }}>{email}</strong> as soon as
        there&apos;s news.
      </p>
    </div>

    {/* What to expect */}
    <div
      style={{
        padding: "24px",
        backgroundColor: "#fafafa",
        borderTop: "1px solid #e5e5e5",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <h2
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#171717",
          margin: "0 0 16px 0",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        What to Expect
      </h2>
      <ul
        style={{
          margin: "0",
          padding: "0",
          listStyle: "none",
        }}
      >
        <li
          style={{
            fontSize: "15px",
            lineHeight: 1.5,
            color: "#525252",
            padding: "8px 0",
            paddingLeft: "24px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "0",
              color: "#ff4400",
              fontWeight: 700,
            }}
          >
            →
          </span>
          Early access announcements and launch updates
        </li>
        <li
          style={{
            fontSize: "15px",
            lineHeight: 1.5,
            color: "#525252",
            padding: "8px 0",
            paddingLeft: "24px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "0",
              color: "#ff4400",
              fontWeight: 700,
            }}
          >
            →
          </span>
          Exclusive subscriber-only discounts
        </li>
        <li
          style={{
            fontSize: "15px",
            lineHeight: 1.5,
            color: "#525252",
            padding: "8px 0",
            paddingLeft: "24px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "0",
              color: "#ff4400",
              fontWeight: 700,
            }}
          >
            →
          </span>
          Behind-the-scenes course development insights
        </li>
      </ul>
    </div>

    {/* CTA Section */}
    <div style={{ padding: "24px", textAlign: "center" }}>
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.6,
          color: "#525252",
          margin: "0 0 20px 0",
        }}
      >
        In the meantime, explore what we&apos;re building:
      </p>
      <a
        href="https://designengineer.xyz/course"
        style={{
          display: "inline-block",
          backgroundColor: "#ff4400",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 600,
          textDecoration: "none",
          padding: "12px 24px",
          letterSpacing: "0.02em",
        }}
      >
        Explore the Course →
      </a>
    </div>

    {/* Footer */}
    <div
      style={{
        padding: "24px",
        borderTop: "1px solid #e5e5e5",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "13px",
          color: "#a3a3a3",
          margin: "0 0 8px 0",
          lineHeight: 1.5,
        }}
      >
        d×e · Design Engineer Course
      </p>
      <a
        href="https://designengineer.xyz"
        style={{
          fontSize: "13px",
          color: "#a3a3a3",
          textDecoration: "none",
        }}
      >
        designengineer.xyz
      </a>
      <p
        style={{
          fontSize: "12px",
          color: "#a3a3a3",
          margin: "20px 0 0 0",
          lineHeight: 1.6,
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        You&apos;re receiving this email because you signed up to be notified
        about the Design Engineer Course at designengineer.xyz. Didn&apos;t sign
        up?{" "}
        <a
          href={`https://designengineer.xyz/api/unsubscribe?email=${encodeURIComponent(email)}`}
          style={{
            color: "#a3a3a3",
            textDecoration: "underline",
          }}
        >
          Unsubscribe here
        </a>
        .
      </p>
    </div>
  </div>
);

export const EmailSubmissionTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ email }) => (
  <div>
    <h1>Thanks for your submission!</h1>
    <p>
      We&apos;ll be in touch on {email} when your article has been approved.
    </p>
  </div>
);

export const EmailSubmissionReceivedTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ email, url }) => (
  <div>
    <h1>New d×e article submission!</h1>
    <p>
      {email} just submitted {url}.
    </p>
  </div>
);

export const JobSubmissionTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
}) => (
  <div>
    <h1>Thanks for your submission!</h1>
    <p>We&apos;ll be in touch on {email} when your job has been approved.</p>
  </div>
);

export const JobSubmissionReceivedTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ email, title, company }) => (
  <div>
    <h1>New d×e job submission!</h1>
    <p>
      {email} just submitted {title} at {company}.
    </p>
  </div>
);

interface StudentDiscountEmailProps {
  email: string;
  discountCode: string;
  totalLessons?: number;
}

export const CourseWelcomeEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
}) => (
  <div
    style={{
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
    }}
  >
    {/* Header with brand accent */}
    <div
      style={{
        borderTop: "4px solid #ff4400",
        padding: "32px 24px 24px",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#ff4400",
          margin: "0 0 16px 0",
        }}
      >
        Design Engineer Course
      </p>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#171717",
          margin: "0 0 16px 0",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        Welcome to the course!
      </h1>
      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.6,
          color: "#525252",
          margin: "0 0 16px 0",
        }}
      >
        I genuinely want to say a huge thank you for investing your money in me
        and this course. It means the world to have you here.
      </p>
      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.6,
          color: "#525252",
          margin: "0",
        }}
      >
        I&apos;ve poured everything I know into this curriculum, and I
        can&apos;t wait to see what you build with these new skills.
      </p>
    </div>

    {/* CTA Section */}
    <div style={{ padding: "0 24px 24px" }}>
      <a
        href="https://designengineer.xyz/course/dashboard"
        style={{
          display: "inline-block",
          backgroundColor: "#ff4400",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 600,
          textDecoration: "none",
          padding: "12px 24px",
          letterSpacing: "0.02em",
          borderRadius: "4px",
        }}
      >
        Go to Dashboard →
      </a>
    </div>

    {/* Footer */}
    <div
      style={{
        padding: "24px",
        borderTop: "1px solid #e5e5e5",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.6,
          color: "#525252",
          margin: "0 0 8px 0",
        }}
      >
        If you need anything at all, just reply to this email.
      </p>
      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.6,
          color: "#525252",
          margin: "0 0 24px 0",
        }}
      >
        Happy learning!
      </p>
      <p
        style={{
          fontSize: "13px",
          color: "#a3a3a3",
          margin: "0 0 8px 0",
          lineHeight: 1.5,
        }}
      >
        d×e · Design Engineer Course
      </p>
      <a
        href="https://designengineer.xyz"
        style={{
          fontSize: "13px",
          color: "#a3a3a3",
          textDecoration: "none",
        }}
      >
        designengineer.xyz
      </a>
    </div>
  </div>
);

export const StudentDiscountEmailTemplate: React.FC<
  Readonly<StudentDiscountEmailProps>
> = ({ email, discountCode, totalLessons = 156 }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
    }}
  >
    <h1 style={{ color: "#000", fontSize: "24px", marginBottom: "16px" }}>
      Your Student Discount Code 🎓
    </h1>
    <p
      style={{
        fontSize: "16px",
        lineHeight: "1.6",
        color: "#333",
        marginBottom: "16px",
      }}
    >
      Hi there,
    </p>
    <p
      style={{
        fontSize: "16px",
        lineHeight: "1.6",
        color: "#333",
        marginBottom: "16px",
      }}
    >
      Thanks for verifying your student status with {email}. Here&apos;s your
      exclusive 30% discount code for the Design Engineer Course:
    </p>
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        textAlign: "center",
        border: "2px dashed #d4d4d4",
        marginBottom: "24px",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "8px",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Your Discount Code
      </p>
      <p
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#000",
          letterSpacing: "2px",
          margin: "0",
          fontFamily: "monospace",
        }}
      >
        {discountCode}
      </p>
    </div>
    <div
      style={{
        backgroundColor: "#FEF3C7",
        padding: "16px",
        borderLeft: "4px solid #F59E0B",
        marginBottom: "24px",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          lineHeight: "1.6",
          color: "#92400E",
          margin: "0",
        }}
      >
        <strong>Important:</strong> This code is unique to you and can only be
        used once. Please don&apos;t share it with others.
      </p>
    </div>
    <h2 style={{ fontSize: "18px", color: "#000", marginBottom: "12px" }}>
      How to Use Your Code:
    </h2>
    <ol
      style={{
        fontSize: "16px",
        lineHeight: "1.8",
        color: "#333",
        paddingLeft: "20px",
        marginBottom: "24px",
      }}
    >
      <li>
        Visit the{" "}
        <a
          href="https://designengineer.xyz/course/pricing"
          style={{ color: "#DC2626", textDecoration: "none" }}
        >
          pricing page
        </a>
      </li>
      <li>
        Choose your course (we recommend Convergence All-Access for the best
        value!)
      </li>
      <li>Click &quot;Get Access&quot; to proceed to checkout</li>
      <li>Enter your discount code at checkout</li>
      <li>Your 30% discount will be applied automatically</li>
    </ol>
    <div
      style={{
        backgroundColor: "#ECFDF5",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "24px",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          lineHeight: "1.6",
          color: "#065F46",
          margin: "0",
        }}
      >
        💡 <strong>Pro Tip:</strong> With the student discount, Convergence
        All-Access (all {totalLessons} lessons across all tracks and platforms)
        becomes even more affordable. It&apos;s the best way to master Design
        Engineering!
      </p>
    </div>
    <p
      style={{
        fontSize: "16px",
        lineHeight: "1.6",
        color: "#333",
        marginBottom: "16px",
      }}
    >
      If you have any questions or need help, just reply to this email.
    </p>
    <p
      style={{
        fontSize: "16px",
        lineHeight: "1.6",
        color: "#333",
        marginBottom: "8px",
      }}
    >
      Happy learning!
    </p>
    <p
      style={{
        fontSize: "16px",
        lineHeight: "1.6",
        color: "#333",
        margin: "0",
      }}
    >
      The d×e Team
    </p>
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #e5e5e5",
        margin: "32px 0",
      }}
    />
    <p style={{ fontSize: "12px", color: "#999", lineHeight: "1.6" }}>
      Design Engineer Course
      <br />
      <a
        href="https://designengineer.xyz"
        style={{ color: "#999", textDecoration: "none" }}
      >
        designengineer.xyz
      </a>
    </p>
  </div>
);
