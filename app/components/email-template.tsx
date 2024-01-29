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
