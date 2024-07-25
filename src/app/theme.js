import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  colors: {
    brand: {
      50: "#e6f7f6",
      100: "#ccefed",
      200: "#99dfd9",
      300: "#66cfc6",
      400: "#33bfb2",
      500: "#30D5C8", // This is the main brand color from your logo
      600: "#26a89f",
      700: "#1d7e77",
      800: "#13544f",
      900: "#0a2a27",
    },
  },
});

export default theme;