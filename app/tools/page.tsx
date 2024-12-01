import React from "react";
import { StyledButton as Button } from "@/app/components/styled-button";
import { Link } from "@nextui-org/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import TaskBuilder from "./task-builder";
import { getTaskBuilderSuggestions } from "@/lib/cosmic";
import { Image } from "@nextui-org/image";
import { Card, CardBody } from "@nextui-org/card";

const Tools = async () => {
  const suggestions = await getTaskBuilderSuggestions();

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-foreground-400">Tools</h1>
      <SignedIn>
        <TaskBuilder suggestions={suggestions} />
      </SignedIn>
      <SignedOut>
        <div className="flex w-full flex-col items-center gap-4">
          <p className="text-foreground-500">
            Unlock the full potential of our tools by signing up. As a member,
            you&apos;ll be able to generate customised tasks tailored to your
            needs.
          </p>
          <Card className="flex max-w-xl justify-center">
            <CardBody>
              <Image
                src="https://imgix.cosmicjs.com/ad7648b0-b005-11ef-8a63-eb57d6c77a36-CleanShot-2024-12-01-at-16-56-34.gif"
                alt="Task Builder"
              />
            </CardBody>
          </Card>
          <p className="text-foreground-400">
            Sign up or sign in to generate a task for a Design Engineer.
          </p>
          <Button as={Link} href="/sign-up" variant="flat" className="w-max">
            Sign Up
          </Button>
        </div>
      </SignedOut>
    </section>
  );
};

export default Tools;
