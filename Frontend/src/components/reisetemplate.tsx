import { Box, Center } from "@chakra-ui/react";

export const ReiseTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <Center h="full">
      <Box
        minH="650px"
        w="1100px"
        borderRadius="lg"
        boxShadow="md"
        p={4}
        bg="white"
        _dark={{ bg: "gray.700" }}
      >
        {children}
      </Box>
    </Center>
  );
};
