import * as React from "react";

interface EmailTemplateProps {
  email: string;
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
