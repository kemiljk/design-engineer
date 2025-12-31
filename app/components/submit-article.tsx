"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
} from "@/app/components/ui";
import SubmitForm from "./submit-form";

export default function SubmitArticle() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="w-full whitespace-nowrap md:w-max"
        onClick={onOpen}
      >
        Submit an Article
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
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
