import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { BaseLayout } from "../layout/Baselayout";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { object, string } from "yup";
import { ReiseTemplate } from "../components/reisetemplate";
import { useCallback, useEffect, useState } from "react";
import { Reiseziel } from "../api/babel__generated/api";
import { useApiClient } from "../hooks/useApiClient";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ReisezielModal, ReisezielModalProps } from "./UserModalziel";
import { ReisezielFormValues } from "./UserModalziel";

export let Editzielid: string = "";

export type reise = {
  name: string;
  beschreibung: string;
  teilnehmer: number;
}

export const ReisesuchenPage = () => {
  const disclosure = useDisclosure();
  const disclosureEdit = useDisclosure();
  const client = useApiClient();
  const [reiseziel, setreiseziel] = useState<Reiseziel[]>([]);

  const loadreiseziel = useCallback(async () => {
    const res = await client.getReiseziel();
    setreiseziel(res.data);
  }, [client]);

  useEffect(() => {
    loadreiseziel();
  }, [loadreiseziel]);

  const onDelete = async (id: string) => {
    await client.deleteReisezielId(id);
    loadreiseziel();
  };

  return (
    <BaseLayout>
      <ReiseTemplate>
        <Button onClick={() => { disclosure.onOpen(); }}>
          Hinzufügen
        </Button>
        <ReisezielModal isOpen={disclosure.isOpen} onClose={disclosure.onClose} />

        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Beschreibung</Th>
                <Th>Datum von</Th>
                <Th>Datum bis</Th>
                <Th>Activities</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reiseziel.map((entry) => (
                <Tr key={entry.id}>
                  <Td>{entry.name}</Td>
                  <Td>{entry.beschreibung}</Td>
                  <Td>{entry.datumvon}</Td>
                  <Td>{entry.datumbis}</Td>
                  <Td>{entry.activities}</Td>
                  <Td>
                    <IconButton
                      aria-label={"delete"}
                      onClick={() => { onDelete(entry.id); }}
                      icon={<DeleteIcon />}
                    />
                    <span> </span>
                    <IconButton
                      aria-label={"edit"}
                      onClick={() => {
                        Editzielid = entry.id;
                        disclosureEdit.onOpen();
                      }}
                      icon={<EditIcon />}
                    />
                    <ReisezielModalEdit isOpen={disclosureEdit.isOpen} onClose={disclosureEdit.onClose} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </ReiseTemplate>
    </BaseLayout>
  );
}

const ReisezielModalEdit = ({ isOpen, onClose }: ReisezielModalProps) => {
  const apiClient = useApiClient();
  const initialValues: ReisezielFormValues = {
    name: "",
    beschreibung: "",
    datumvon: "",
    datumbis: "",
    activities: ""
  };

  const reisezielSchema = object({
    name: string().required("Name ist erforderlich"),
    beschreibung: string().required("Beschreibung ist erforderlich"),
    datumvon: string().required("Datum von ist erforderlich"),
    datumbis: string().required("Datum bis ist erforderlich"),
    activities: string().required("Activities ist erforderlich"),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <Formik<ReisezielFormValues>
        validationSchema={reisezielSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          await apiClient.putReisezielId(Editzielid, {
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
              <InputControl label="Name" name={"name"} variant='outline' />
              <InputControl label="Beschreibung" name={"beschreibung"} variant='outline' />
              <InputControl label="datum von" name={"datumvon"} inputProps={{ type: 'date', size: 'md' }} variant='outline' />
              <InputControl label="datum bis" name={"datumbis"} inputProps={{ type: 'date', size: 'md' }} variant='outline' />
              <InputControl label="Activities" name={"activities"} variant='outline' />
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
