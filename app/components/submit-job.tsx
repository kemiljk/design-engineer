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
        scrollBehavior="inside"
        placement="top-center"
      >
        <ModalContent>
            <ModalHeader
              className={`text-xl font-medium text-black dark:text-white`}
            >
              Submit a Job
            </ModalHeader>
            <p
              className={`mb-4 text-sm leading-normal text-gray-500 dark:text-gray-300`}
            >
              Submit your role for inclusion on our site. It should be for a
              role that is relevant to a software Design Engineer, UI Engineer,
              UX Engineer, Design Technologist or similar.
            </p>
            <ModalBody>
            <SubmitJobForm industries={industries} locations={locations} />
            </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
