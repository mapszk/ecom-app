import { Box, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react"
import LogoutButton from "../LogoutButton"

const DashHeader = () => {
    return(
        <Box
            color="gray.700"
            bgColor="white"
            rounded="xl"
            p={4}
            fontWeight="bold"
            mt={5}
            border="1px"
            borderColor="teal"
            boxShadow="base"
        >
            <Flex>
                <Stack>
                    <Text fontSize="lg" color="gray.400">Ecommerce-App</Text>
                    <Heading mb={2}>Panel de control</Heading>
                    <Text color="gray.500">Bienvenido/a! desde aquí podras controlar toda tu tienda online</Text>
                </Stack>
                <Spacer/>
                <LogoutButton/>
            </Flex>
        </Box>
    )
}

export default DashHeader
