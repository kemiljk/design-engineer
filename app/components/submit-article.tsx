"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { StyledButton as Button } from "@/app/components/styled-button";
import SubmitForm from "./submit-form";

export default function SubmitArticle() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        variant="stylised"
        className="w-full md:w-max"
        name="Work with Me Button"
        onPress={onOpen}
      >
        Submit an Article
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="xl"
        radius="none"
        classNames={{
          base: "rounded-none border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black",
          closeButton: "hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-none",
        }}
      >
        <ModalContent>
          <ModalHeader className="text-xl font-bold uppercase tracking-tight text-foreground">
            Submit an Article
          </ModalHeader>
          <ModalBody>
            <p className="mb-4 text-sm leading-normal text-neutral-600 dark:text-neutral-400">
              Submit your article for inclusion on our site.
            </p>
            <SubmitForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
