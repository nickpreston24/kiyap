import { ChakraProvider } from '@chakra-ui/react'

import mainTheme from '../themes'

function CustomApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={mainTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default CustomApp