import * as React from "react";
import Head from "next/head";
import {
  ChakraProvider,
  Heading,
  Text,
  Image,
  Container,
  VStack,
  Box,
  Divider,
  Link,
} from "@chakra-ui/react";
import {AppProps} from "next/app";

import theme from "../theme";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <Head>
        <title>Mi tienda online - Almacency</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        {/* Inicio de meta tags de licencia - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
        <meta content="goncy" name="author" />
        <meta content="Gonzalo Pozzo" name="copyright" />
        {/* Fin de meta tags de licencia */}
      </Head>
      <ChakraProvider theme={theme}>
        <Box padding={4}>
          <Container
            backgroundColor="white"
            borderRadius="sm"
            boxShadow="md"
            maxWidth="container.xl"
            padding={4}
          >
            <VStack marginBottom={4}>
              <Image borderRadius={9999} src="//placehold.it/128x128" />
              <Heading>Almacency</Heading>
              <Text>El almacen de Goncy</Text>
            </VStack>
            <Divider marginY={4} />
            <Component {...pageProps} />
            <Divider marginY={4} />
            {/* Inicio de copyright - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
            <Text textAlign="center">
              © Copyright {new Date().getFullYear()}. Hecho con ♥ para la comunidad, por{" "}
              <Link isExternal href="https://gonzalopozzo.com">
                goncy
              </Link>
              .
            </Text>
            {/* Fin de copyright */}
          </Container>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;
