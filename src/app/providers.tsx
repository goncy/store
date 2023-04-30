"use client";

import {ChakraProvider} from "@chakra-ui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

import theme from "../theme";

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <NextThemesProvider enableSystem attribute="class" defaultTheme="system">
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </NextThemesProvider>
  );
}
