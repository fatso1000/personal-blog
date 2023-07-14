import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: { initialColorMode: "light", useSystemColorMode: false },
  colors: {
    green: "#002930",
    pink: "#FFD6DA",
    cream: "#FFF5E0",
    purple: "#C1B8F6",
    orange: "#E95B10",
    lightGreen: "#DDF6E6",
    lightBlue: "#C7F5FF",
  },
  fonts: {
    heading: "var(--font-montserrat)",
    body: "var(--font-montserrat)",
  },
});
