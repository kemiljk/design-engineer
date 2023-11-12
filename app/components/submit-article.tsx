"use client";

import { Drawer } from "vaul";
import { XIcon } from "lucide-react";
import SubmitForm from "./submit-form";
import { Button } from "@/components/ui/button";

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
        <Drawer.Overlay className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-30 mt-24 flex h-auto flex-col overflow-visible rounded-t-lg bg-white dark:border dark:border-zinc-700 dark:bg-zinc-800 md:mx-auto md:w-2/3 lg:w-1/2">
          <div className="flex flex-col overflow-auto p-4">
            <Drawer.Title
              className={`font-sans text-xl font-medium text-black dark:text-white`}
            >
              Submit an Article
            </Drawer.Title>
            <Drawer.Description
              className={`mb-4 mt-2 font-sans text-sm leading-normal text-zinc-500 dark:text-zinc-300`}
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
