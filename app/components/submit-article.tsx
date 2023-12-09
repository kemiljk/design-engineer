"use client";

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { Drawer } from "vaul";

import SubmitForm from "./submit-form";

export default function SubmitArticle() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button
          variant="secondary"
          className="w-full md:w-max"
          name="Work with Me Button"
        >
          Submit an Article
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-20 bg-gray-950/40 backdrop-blur-sm transition-all ease-out duration-250" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-30 mt-24 flex h-auto flex-col overflow-visible rounded-t-2xl bg-white dark:border dark:border-gray-800 dark:bg-gray-950 md:mx-auto md:w-2/3 lg:w-1/3 transition-all ease-out duration-250">
          <div className="flex flex-col overflow-auto p-4">
            <Drawer.Title
              className={`font-sans text-xl font-medium text-black dark:text-white`}
            >
              Submit an Article
            </Drawer.Title>
            <Drawer.Description
              className={`mb-4 mt-2 font-sans text-sm leading-normal text-gray-500 dark:text-gray-300`}
            >
              Submit your article for inclusion on our site.
            </Drawer.Description>
            <SubmitForm />
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
