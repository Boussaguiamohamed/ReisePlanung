import { BaseLayout } from "../layout/Baselayout";
import img1 from "../images/bild.png";
import { Box, Image, Text } from "@chakra-ui/react";
import { ReiseTemplate } from "../components/reisetemplate";

export const HomePage = () => {
    return (
        <BaseLayout>
            <ReiseTemplate>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                >
                    <Text fontSize="5xl" as="b" color="blue.900" mb={8}>
                        Willkommen auf unserer Homepage
                    </Text>
                    <Image src={img1} alt="Example" width="100%" height="100%" objectFit="contain" />
                </Box>
            </ReiseTemplate>
        </BaseLayout>
    );
};
