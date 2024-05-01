import { SignIn } from "@clerk/nextjs";
import AuthLayout from "../layout";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary text-sm normal-case",
          },
        }}
      />
    </AuthLayout>
  );
}
