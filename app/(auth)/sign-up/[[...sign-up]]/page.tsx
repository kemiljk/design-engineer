import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      fallbackRedirectUrl="/course"
      appearance={{
        elements: {
          formButtonPrimary: "bg-primary text-sm normal-case",
        },
      }}
    />
  );
}
