import {
  Button,
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

export type ReisezielModalProps = Omit<ModalProps, "children">;

export type ReisezielFormValues = {
  name: string;
  beschreibung: string;
  datumvon: string;
  datumbis: string;
  activities: string;
};

const initialValues: ReisezielFormValues = {
  name: "",
  beschreibung: "",
  datumvon: "",
  datumbis: "",
  activities: ""
};

const reiseSchema = object({
  name: string().required("Name ist erforderlich"),
  beschreibung: string().required("Beschreibung ist erforderlich"),
  datumvon: string().required("Datum von ist erforderlich"),
  datumbis: string().required("Datum bis ist erforderlich"),
  activities: string().required("Activities ist erforderlich"),
});

export const ReisezielModal = ({ isOpen, onClose }: ReisezielModalProps) => {
  const apiClient = useApiClient();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik<ReisezielFormValues>
        validationSchema={reiseSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          await apiClient.postReiseziel({
            name: values.name,
            beschreibung: values.beschreibung,
            datumvon: values.datumvon,
            datumbis: values.datumbis,
            activities: values.activities,
          });
          onClose();
        }}
      >
        <Form>
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputControl label="Name" name={"name"} variant="outline" />
              <InputControl label="Beschreibung" name={"beschreibung"} variant="outline" />
              <InputControl label="datum von" name={"datumvon"} inputProps={{ type: 'date', size: 'md' }} variant="outline" />
              <InputControl label="datum bis" name={"datumbis"} inputProps={{ type: 'date', size: 'md' }} variant="outline" />
              <InputControl label="Activities" name={"activities"} variant="outline" />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
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
