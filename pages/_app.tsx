import React from "react";
import {
  ChakraProvider,
  Heading,
  Text,
  Image,
  Container,
  VStack,
  Box,
  Divider,
} from "@chakra-ui/react";
import {AppProps} from "next/app";

import theme from "../theme";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          backgroundColor="white"
          borderRadius="sm"
          boxShadow="md"
          maxWidth="container.xl"
          padding={4}
        >
          <VStack marginBottom={6}>
            <Image borderRadius={9999} src="//placehold.it/128x128" />
            <Heading>Almacency</Heading>
            <Text>El almacen de Goncy</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
