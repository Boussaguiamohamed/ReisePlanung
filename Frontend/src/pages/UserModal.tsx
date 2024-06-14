import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { object, string } from "yup";
import { useApiClient } from "../hooks/useApiClient";

export type ReiseModalProps = Omit<ModalProps, "children">;

export type ReiseModalFormValues = {
  name: string;
  teilnehmer: string;
  beschreibung: string;
};

const initialValues: ReiseModalFormValues = {
  name: "",
  teilnehmer: "",
  beschreibung: "",
};

const reiseSchema = object({
  name: string().required("Name ist erforderlich"),
  beschreibung: string().required("Beschreibung ist erforderlich"),
  teilnehmer: string().required("Teilnehmer ist erforderlich"),
});

export const ReiseModal = ({ isOpen, onClose }: ReiseModalProps) => {
  const apiClient = useApiClient();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <Formik<ReiseModalFormValues>
        validationSchema={reiseSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          await apiClient.postReise({
            name: values.name,
            teilnehmer: values.teilnehmer,
            beschreibung: values.beschreibung,
          });
          onClose();
        }}
      >
        <Form>
          <ModalContent>
            <ModalHeader>Reise hinzufügen</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputControl label="Name" name={"name"} variant="outline" />
              <InputControl label="Beschreibung" name={"beschreibung"} variant="outline" />
              <InputControl label="Teilnehmer" name={"teilnehmer"} variant="outline" />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <SubmitButton>Submit</SubmitButton>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Formik>
    </Modal>
  );
};
