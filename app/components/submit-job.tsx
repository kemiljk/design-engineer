"use client";

import { Drawer } from "vaul";
import { XIcon } from "lucide-react";
import SubmitJobForm from "./submit-job-form";
import { Button } from "@/components/ui/button";

export default function SubmitJob({
  industries,
  locations,
}: {
  industries: any[];
  locations: any[];
}) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button
          variant="secondary"
          className="w-full md:w-max"
          name="Submit Job Button"
        >
          Submit a Job
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="duration-250 fixed inset-0 z-20 bg-gray-950/40 backdrop-blur-sm transition-all ease-out" />
        <Drawer.Content className="duration-250 fixed bottom-0 left-0 right-0 z-30 mt-24 flex h-auto flex-col overflow-visible rounded-t-2xl bg-white transition-all ease-out dark:border dark:border-gray-800 dark:bg-gray-950 md:mx-auto md:w-2/3 lg:w-1/2">
          <div className="flex flex-col overflow-auto p-4">
            <Drawer.Title
              className={`font-sans text-xl font-medium text-black dark:text-white`}
            >
              Submit a Job
            </Drawer.Title>
            <Drawer.Description
              className={`mb-4 mt-2 font-sans text-sm leading-normal text-gray-500 dark:text-gray-300`}
            >
              Submit your role for inclusion on our site. It should be for a
              role that is relevant to a software Design Engineer, UI Engineer,
              UX Engineer, Design Technologist or similar.
            </Drawer.Description>
            <SubmitJobForm industries={industries} locations={locations} />
            <Drawer.Close asChild>
              <Button
                variant="ghost"
                className="absolute right-2 top-2"
                size="icon"
                name="Close Drawer"
                aria-label="Close"
              >
                <XIcon height={16} width={16} />
              </Button>
            </Drawer.Close>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
