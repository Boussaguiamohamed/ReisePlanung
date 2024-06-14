import { BaseLayout } from "../layout/Baselayout";
import { ReiseTemplate } from "../components/reisetemplate";
import { Heading, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Box } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState, useCallback, useEffect } from "react";
import { Reiseziel, Reise } from "../api/babel__generated";
import { useApiClient } from "../hooks/useApiClient";

export let Editzielid: string = "";

export type reise = {
    name: string;
    beschreibung: string;
    teilnehmer: number;
};

export const ReisezielPage = () => {
    const client = useApiClient();
    const [reiseziel, setreiseziel] = useState<Reiseziel[]>([]);

    const loadreiseziel = useCallback(async () => {
        const res = await client.getReiseziel();
        setreiseziel(res.data);
    }, [client]);

    useEffect(() => {
        loadreiseziel();
    }, [loadreiseziel]);

    const [reise, setreise] = useState<Reise[]>([]);

    return (
        <BaseLayout>
            <ReiseTemplate>
                <TableContainer>
                    <Heading>Reiseziele:</Heading>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Beschreibung</Th>
                                <Th>Datum von</Th>
                                <Th>Datum bis</Th>
                                <Th>Activities</Th>
                                <Th>Reisen</Th>
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
                                            aria-label={"search"}
                                            onClick={async () => {
                                                Editzielid = entry.id;
                                                const response = await fetch(`/api/reiseziel/${entry.id}`, {
                                                    method: 'GET',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                });
                                                const data = await response.json();
                                                setreise(data);
                                            }}
                                            icon={<Search2Icon />}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>

                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height={"50"}
                    textAlign="center"
                ></Box>

                <TableContainer>
                    <Heading>Reisen:</Heading>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Beschreibung</Th>
                                <Th>Teilnehmer</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {reise.map((entry) => (
                                <Tr key={entry.id}>
                                    <Td>{entry.name}</Td>
                                    <Td>{entry.beschreibung}</Td>
                                    <Td>{entry.teilnehmer}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </ReiseTemplate>
        </BaseLayout>
    );
};
