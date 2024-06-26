"use client";

import { FormEvent, useState } from "react";
import { StyledButton as Button } from "./styled-button";
import { Input } from "@nextui-org/input";
import { Toaster, toast } from "sonner";

export const WaitlistForm = ({ width }: { width: string }) => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const newWaitlist = {
      type: "waitlists",
      title: email,
    };
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: newWaitlist }),
      });
      await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({ email: email }),
      });
      await fetch("/api/waitlisted", {
        method: "POST",
        body: JSON.stringify({ email: email }),
      });
    } catch (err) {
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setSubmitted(true);
    toast.success("You have been added to the waitlist!");
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 5000);
  };

  const getWidthClass = (width: string) => {
    return {
      sm: "w-40",
      md: "w-80",
      lg: "w-96",
      xl: "w-120",
      full: "w-full",
    }[width];
  };

  const widthClass = getWidthClass(width);

  return (
    <div
      className={`z-2 relative flex w-full ${widthClass} flex-col gap-2 text-center`}
    >
      <form
        className={`flex w-full ${widthClass} flex-col items-center justify-center gap-2 md:flex-row`}
        onSubmit={submit}
      >
        <Input
          size="lg"
          type="email"
          variant="flat"
          radius="lg"
          isRequired
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full focus:bg-background/40 md:w-80"
          classNames={{
            inputWrapper: [
              "bg-background/30",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "text-foreground-900",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              "border border-primary-200",
            ],
          }}
        />

        <Toaster richColors position="top-center" />
        <Button
          type="submit"
          size="lg"
          color="primary"
          variant="stylised"
          isDisabled={submitting}
          isLoading={submitting}
          className="w-full md:w-max"
        >
          {submitting ? (
            <>
              <span>Registering interest...</span>
            </>
          ) : (
            <span>Register interest</span>
          )}
        </Button>
      </form>
      <span className="text-xs text-gray-500">
        We respect your privacy and will never share your email.
      </span>
    </div>
  );
};
