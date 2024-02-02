"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import SubmitJobForm from "./submit-job-form";

export default function SubmitJob({
  industries,
  locations,
}: {
  industries: any[];
  locations: any[];
}) {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        variant="solid"
        className="w-full md:w-max"
        name="Work with Me Button"
        onPress={onOpen}
      >
        Submit a Job
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      >
        <ModalContent className="duration-250 fixed bottom-0 left-0 right-0 z-30 mt-24 flex h-auto flex-col overflow-visible rounded-t-2xl bg-white transition-all ease-out md:mx-auto md:w-2/3 lg:w-1/3 dark:border dark:border-gray-800 dark:bg-gray-950">
          <div className="flex flex-col overflow-auto">
            <ModalHeader
              className={`text-xl font-medium text-black dark:text-white`}
            >
              Submit a Job
            </ModalHeader>
            <ModalBody
              className={`mb-4 text-sm leading-normal text-gray-500 dark:text-gray-300`}
            >
              Submit your role for inclusion on our site. It should be for a
              role that is relevant to a software Design Engineer, UI Engineer,
              UX Engineer, Design Technologist or similar.
            </ModalBody>
            <SubmitJobForm industries={industries} locations={locations} />
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
