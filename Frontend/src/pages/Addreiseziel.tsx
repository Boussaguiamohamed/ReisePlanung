import { BaseLayout } from "../layout/Baselayout";
import { ReiseTemplate } from "../components/reisetemplate";
import { Heading, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Box, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, ModalFooter, Button} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState, useCallback, useEffect } from "react";
import { Reiseziel, Reise } from "../api/babel__generated";
import { useApiClient } from "../hooks/useApiClient";


export let reiseid: string = "";

export type reise = {
    name: string;
    beschreibung: string;
    teilnehmer: number;
}

export const Addreiseziel = () => {
    const client = useApiClient();
    const [reiseziel, setreiseziel] = useState<Reiseziel[]>([]);
    const [reise, setreise] = useState<Reise[]>([]);

    const loadreise = useCallback(async () => {
        const res = await client.getReise();
        setreise(res.data);
    }, [client]);

    useEffect(() => {
        loadreise();
    }, [loadreise]);

    const loadreiseziel = useCallback(async () => {
        const res = await client.getReiseziel();
        setreiseziel(res.data);
    }, [client]);

    useEffect(() => {
        loadreiseziel();
    }, [loadreiseziel]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleClick = async (entry: Reise) => {
        reiseid = entry.id;
        console.log(reiseid);
        onOpen();
    };

    const disclosureadd = useDisclosure();
    const disclosuredelete = useDisclosure();


    return (
        <BaseLayout>
            <ReiseTemplate>
                <TableContainer>
                    <Heading>Reisen:</Heading>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Beschreibung</Th>
                                <Th>Teilnehmer</Th>
                                <Th>Reiseziele</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {reise.map((entry) => (
                                <Tr key={entry.id}>
                                    <Td>{entry.name}</Td>
                                    <Td>{entry.beschreibung}</Td>
                                    <Td>{entry.teilnehmer}</Td>
                                    <Td>
                                        <IconButton
                                            aria-label={"add"}
                                            onClick={() => handleClick(entry)}
                                            icon={<AddIcon color={'black'} />}
                                        />
                                        <Modal isOpen={isOpen} onClose={onClose}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Box>
                                                        <Table>
                                                            <Thead>
                                                                <Tr>
                                                                    <Th>Name</Th>
                                                                    <Th>Beschreibung</Th>
                                                                    <Th>Actions</Th>
                                                                </Tr>
                                                            </Thead>
                                                            <Tbody>
                                                                {reiseziel.map((entry) => (
                                                                    <Tr key={entry.id}>
                                                                        <Td>{entry.name}</Td>
                                                                        <Td>{entry.beschreibung}</Td>
                                                                        <Td>
                                                                            <IconButton
                                                                                aria-label={"add"}
                                                                                onClick={async () => {
                                                                                    const response = await fetch(`/api/reise/${reiseid}`, {
                                                                                        method: 'POST',
                                                                                        headers: {
                                                                                            'Content-Type': 'application/json'
                                                                                        },
                                                                                        body: JSON.stringify({
                                                                                            id: entry.id
                                                                                        })
                                                                                    });
                                                                                    if (response.ok) {
                                                                                        onClose();

                                                                                    }else{
                                                                                        disclosureadd.onOpen();
                                                                                    }
                                                                                }}
                                                                                icon={<AddIcon />}
                                                                            />
                                                                            <Modal isOpen={disclosureadd.isOpen} onClose={disclosureadd.onClose}>
                                                                                <ModalOverlay />
                                                                                <ModalContent>
                                                                                    <ModalCloseButton />
                                                                                    <ModalBody>
                                                                                        <Box>
                                                                                            <Heading>Reiseziel bereits hinzugefügt</Heading>
                                                                                        </Box>

                                                                                    </ModalBody>
                                                                                    <ModalFooter>
                                                                                        <Button onClick={disclosureadd.onClose}>Close</Button>
                                                                                    </ModalFooter>
                                                                                </ModalContent>
                                                                            </Modal>
                                                                            <IconButton
                                                                                aria-label={"delete"}
                                                                                onClick={async () => {
                                                                                    console.log(entry.id);
                                                                                    const response = await fetch(`/api/reise/${reiseid}/reiseziel/${entry.id}`, {
                                                                                        method: 'DELETE',
                                                                                        headers: {
                                                                                            'Content-Type': 'application/json'
                                                                                        },
                                                                                    });
                                                                                    if (response.ok) {
                                                                                        onClose();
                                                                                    }else{
                                                                                        disclosuredelete.onOpen();
                                                                                    }
                                                                                }}
                                                                                icon={<DeleteIcon />}
                                                                            />
                                                                            <Modal isOpen={disclosuredelete.isOpen} onClose={disclosuredelete.onClose}>
                                                                                <ModalOverlay />
                                                                                <ModalContent>
                                                                                    <ModalCloseButton />
                                                                                    <ModalBody>
                                                                                        <Box>
                                                                                            <Heading>Reiseziel bereits gelöscht</Heading>
                                                                                        </Box>

                                                                                    </ModalBody>
                                                                                    <ModalFooter>
                                                                                        <Button onClick={disclosuredelete.onClose}>Close</Button>
                                                                                    </ModalFooter>
                                                                                </ModalContent>
                                                                            </Modal>
                                                                        </Td>
                                                                    </Tr>
                                                                ))}
                                                            </Tbody>
                                                        </Table>
                                                    </Box>
                                                </ModalBody>
                                            </ModalContent>
                                        </Modal>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </ReiseTemplate>
        </BaseLayout>
    )
}


