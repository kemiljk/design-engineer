import { SignUp } from "@clerk/nextjs";
import AuthLayout from "../../layout";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary text-sm normal-case",
          },
        }}
      />
    </AuthLayout>
  );
}
