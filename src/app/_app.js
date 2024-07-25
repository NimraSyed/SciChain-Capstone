// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
//import { FileProvider } from '../contexts/FileContext';
import theme from '../theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
