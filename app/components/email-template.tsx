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

interface StudentDiscountEmailProps {
  email: string;
  discountCode: string;
}

export const StudentDiscountEmailTemplate: React.FC<
  Readonly<StudentDiscountEmailProps>
> = ({ email, discountCode }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#000', fontSize: '24px', marginBottom: '16px' }}>
      Your Student Discount Code 🎓
    </h1>
    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', marginBottom: '16px' }}>
      Hi there,
    </p>
    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', marginBottom: '16px' }}>
      Thanks for verifying your student status with {email}. Here&apos;s your exclusive 30% discount code for the Design Engineer Course:
    </p>
    <div style={{ 
      backgroundColor: '#f5f5f5', 
      padding: '20px', 
      textAlign: 'center',
      border: '2px dashed #d4d4d4',
      marginBottom: '24px'
    }}>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Your Discount Code
      </p>
      <p style={{ 
        fontSize: '28px', 
        fontWeight: 'bold', 
        color: '#000',
        letterSpacing: '2px',
        margin: '0',
        fontFamily: 'monospace'
      }}>
        {discountCode}
      </p>
    </div>
    <div style={{ 
      backgroundColor: '#FEF3C7', 
      padding: '16px', 
      borderLeft: '4px solid #F59E0B',
      marginBottom: '24px'
    }}>
      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#92400E', margin: '0' }}>
        <strong>Important:</strong> This code is unique to you and can only be used once. Please don&apos;t share it with others.
      </p>
    </div>
    <h2 style={{ fontSize: '18px', color: '#000', marginBottom: '12px' }}>
      How to Use Your Code:
    </h2>
    <ol style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', paddingLeft: '20px', marginBottom: '24px' }}>
      <li>Visit the <a href="https://designengineer.xyz/course/pricing" style={{ color: '#DC2626', textDecoration: 'none' }}>pricing page</a></li>
      <li>Choose your course (we recommend Convergence All-Access for the best value!)</li>
      <li>Click &quot;Get Access&quot; to proceed to checkout</li>
      <li>Enter your discount code at checkout</li>
      <li>Your 30% discount will be applied automatically</li>
    </ol>
    <div style={{ 
      backgroundColor: '#ECFDF5', 
      padding: '16px', 
      borderRadius: '8px',
      marginBottom: '24px'
    }}>
      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#065F46', margin: '0' }}>
        💡 <strong>Pro Tip:</strong> With the student discount, Convergence All-Access (all 156 lessons across all tracks and platforms) becomes even more affordable. It&apos;s the best way to master Design Engineering!
      </p>
    </div>
    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', marginBottom: '16px' }}>
      If you have any questions or need help, just reply to this email.
    </p>
    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', marginBottom: '8px' }}>
      Happy learning!
    </p>
    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', margin: '0' }}>
      The d×e Team
    </p>
    <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '32px 0' }} />
    <p style={{ fontSize: '12px', color: '#999', lineHeight: '1.6' }}>
      Design Engineer Course<br />
      <a href="https://designengineer.xyz" style={{ color: '#999', textDecoration: 'none' }}>designengineer.xyz</a>
    </p>
  </div>
);
