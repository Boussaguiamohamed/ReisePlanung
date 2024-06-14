import { useCallback, useEffect, useState } from "react";
import { Reise } from "../api/babel__generated/api";
import { BaseLayout } from "../layout/Baselayout";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ReiseModal, ReiseModalFormValues, ReiseModalProps } from "./UserModal";
import { useApiClient } from "../hooks/useApiClient";
import { ReiseTemplate } from "../components/reisetemplate";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { object, string } from "yup";

export let Editid: string = "";

export const Detailspage = () => {
  const client = useApiClient();

  const disclosure = useDisclosure();
  const disclosureEdit = useDisclosure();
  const [reise, setreise] = useState<Reise[]>([]);
  
  const loadreise = useCallback(async () => {
    const res = await client.getReise();
    setreise(res.data);
  }, [client]);
  
  useEffect(() => {
    loadreise();
  }, [loadreise]);
  
  const onDelete = async (id: string) => {
    await client.deleteReiseId(id);
    loadreise();
  };

  return (
    <BaseLayout>
      <ReiseTemplate>
        <Button
          onClick={() => {
            disclosure.onOpen();
          }}
        >
          Hinzufügen
        </Button>
        <ReiseModal isOpen={disclosure.isOpen} onClose={disclosure.onClose} />
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Teilnehmer</Th>
                <Th>beschreibung</Th>
                <Th>Aktionen</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reise.map((entry) => (
                <Tr key={entry.id}>
                  <Td>{entry.name}</Td>
                  <Td>{entry.teilnehmer}</Td>
                  <Td>{entry.beschreibung}</Td>
                  <Td>
                    <IconButton
                      aria-label={"delete"}
                      onClick={() => {
                        onDelete(entry.id);
                      }}
                      icon={<DeleteIcon />}
                    />
                    <span> </span>
                    <IconButton
                      aria-label={"edit"}
                      onClick={() => {
                        Editid = entry.id;
                        disclosureEdit.onOpen();
                      }}
                      icon={<EditIcon />}
                    />
                    <ReiseModalEdit
                      isOpen={disclosureEdit.isOpen}
                      onClose={disclosureEdit.onClose}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </ReiseTemplate>
    </BaseLayout>
  );
};

const ReiseModalEdit = ({ isOpen, onClose }: ReiseModalProps) => {
  const apiClient = useApiClient();

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik<ReiseModalFormValues>
        validationSchema={reiseSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          await apiClient.putReiseId(Editid, {
            name: values.name,
            teilnehmer: values.teilnehmer,
            beschreibung: values.beschreibung,
          });
          onClose();
        }}
      >
        <Form>
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputControl label="Name" name={"name"} variant="outline" />
              <InputControl
                label="Beschreibung"
                name={"beschreibung"}
                variant="outline"
              />
              <InputControl
                label="Teilnehmer"
                name={"teilnehmer"}
                variant="outline"
              />
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