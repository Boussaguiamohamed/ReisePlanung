import { Box, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { BaseLayout } from "../layout/Baselayout";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { object, string } from "yup";
import { ReiseTemplate } from "../components/reisetemplate";
import { useState } from "react";
import { Reise } from "../api/babel__generated/api";

export let Editid: string = "";

export type RegisterFormValues = {
    name: string;
    
}
const initialValues: RegisterFormValues = {
    name: '',
    
}

const reiseSchema = object({
    name: string().required("Name ist erforderlich"),
 
});

export type reise = {
    name: string;
    beschreibung: string;
    teilnehmer: number;
}


export const ReisePage = () => {
    const [reise, setreise] = useState<Reise[]>([]);
    return (
        <BaseLayout>
            <ReiseTemplate>
                <VStack gap={5} w="100%">
                    <Heading>Reise suchen</Heading>
                    <Formik<RegisterFormValues> 
                        validationSchema={reiseSchema}  
                        initialValues={initialValues} 
                        onSubmit={async (values, formikHelpers) => {
                            const response = await fetch(`/api/reise/${values.name}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            });
                            const data = await response.json();
                            console.log(data);
                            setreise(data);
                            formikHelpers.setSubmitting(false);
                            formikHelpers.resetForm();
                        }} 
                    >
                        <VStack as={Form}>
                            <InputControl label="Name" name={"name"} variant='outline'/>
                            <SubmitButton type={"submit"} colorScheme="blue">suchen</SubmitButton>
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                textAlign="center"
                                height="15vh"
                            >
                                <Heading>Reise informationen</Heading>
                            </Box>
                            <TableContainer>
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
                                                <Td>{entry.teilnehmer}</Td>
                                                <Td>{entry.beschreibung}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </VStack>
                    </Formik>
                </VStack>
            </ReiseTemplate>
        </BaseLayout>
    )
}
