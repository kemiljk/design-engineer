import { SignUp } from "@clerk/nextjs";

import AuthLayout from "../../layout";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-blue-500 hover:bg-blue-400 text-sm normal-case",
          },
        }}
      />
    </AuthLayout>
  );
}
