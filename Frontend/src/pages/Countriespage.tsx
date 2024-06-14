import { Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { BaseLayout } from "../layout/Baselayout";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { object, string } from "yup";
import { ReiseTemplate } from "../components/reisetemplate";

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

export type countries = {
    name: string;
    capital: string;
    population: number;
    currencyname: string;
    currencycode: string;
}

let country: countries[] = [];

const setcountry = (data: countries[]) => {
    country = data;
    console.log(country);
}

export const Countriespage = () => {
    return (
        <BaseLayout>
            <ReiseTemplate>
                <VStack gap={5} w="100%">
                    <Heading>Land suchen</Heading>
                    <Formik<RegisterFormValues>
                        validationSchema={reiseSchema}
                        initialValues={initialValues}
                        onSubmit={async (values, formikHelpers) => {
                            const response = await fetch(`/api/reiseziel/des/${values.name}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            });
                            const data = await response.json();
                            setcountry([data]);
                            console.log(country);

                            formikHelpers.setSubmitting(false);
                            formikHelpers.resetForm();
                        }}
                    >
                        {() => (
                            <VStack as={Form} spacing={5}>
                                <InputControl label="Name" name="name" variant="outline" />
                                <SubmitButton type="submit" colorScheme="blue">
                                    Anlegen
                                </SubmitButton>
                                <TableContainer>
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                <Th>Name</Th>
                                                <Th>Capital</Th>
                                                <Th>Population</Th>
                                                <Th>Currency</Th>
                                                <Th>Currency code</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {country.map((c, index) => (
                                                <Tr key={index}>
                                                    <Td>{c.name}</Td>
                                                    <Td>{c.capital}</Td>
                                                    <Td>{c.population}</Td>
                                                    <Td>{c.currencyname}</Td>
                                                    <Td>{c.currencycode}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </VStack>
                        )}
                    </Formik>
                </VStack>
            </ReiseTemplate>
        </BaseLayout>
    );
}