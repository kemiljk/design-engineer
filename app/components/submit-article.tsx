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
        <ModalContent className="duration-250 fixed bottom-0 left-0 right-0 z-30 mt-24 flex h-auto flex-col overflow-visible rounded-t-2xl bg-white transition-all ease-out md:mx-auto md:w-2/3 lg:w-1/3 dark:border dark:border-gray-800 dark:bg-gray-950">
          <div className="flex flex-col overflow-auto">
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
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
