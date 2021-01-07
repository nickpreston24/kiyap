import { Box, Button, Flex, Stack } from "@chakra-ui/react"
import React from "react"

const Home = () => {
  return (
    <Stack>
      <Box bg='teal.100' >
        Welcome
      </Box>
      <Box bg='orange.700' color="pink.500">
        Pink
      </Box>
      <Flex justify='center'>
        <Button colorScheme="blue">Click me</Button>
      </Flex>
    </Stack>
  )
}

export default Home