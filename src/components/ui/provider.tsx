"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@realState/theme";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider defaultTheme="light" {...props} />
    </ChakraProvider>
  );
}
