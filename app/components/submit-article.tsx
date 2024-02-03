"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import SubmitForm from "./submit-form";

export default function SubmitArticle() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        variant="solid"
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
        placement="top-center"
        >
        <ModalContent>
            <ModalHeader
              className={`text-xl font-medium text-black dark:text-white`}
            >
              Submit an Article
            </ModalHeader>
            <p
              className={`mb-4 text-sm leading-normal text-gray-500 dark:text-gray-300`}
            >
              Submit your article for inclusion on our site.
            </p>
            <ModalBody>
            <SubmitForm />
            </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
