import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      fallbackRedirectUrl="/course"
      appearance={{
        elements: {
          formButtonPrimary: "bg-primary text-sm normal-case",
        },
      }}
    />
  );
}
