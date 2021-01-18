import { ChakraProvider } from '@chakra-ui/react'
import withApollo from '../lib/apollo'

import mainTheme from '../themes'

function CustomApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={mainTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default withApollo({ ssr: true })(CustomApp)