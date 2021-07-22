import { Box, Button, Flex, Heading, Spacer, Stack, Text, useMediaQuery } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import LogoutButton from "./LogoutButton"

const DashHeader = () => {
    const [isLargerThan640] = useMediaQuery('(min-width: 640px)')
    const router = useRouter()
    return(
        <Box
            bgColor="white"
            rounded="xl"
            p={4}
            fontWeight="bold"
            mt={5}
            border="1px"
            borderColor="primary.500"
            boxShadow="base"
        >
            <Flex
                direction={isLargerThan640? 'row' : 'column'}
            >
                <Stack>
                    <Text fontSize="lg" color="gray.400">Ecommerce-App</Text>
                    <Heading mb={2}>Panel de control</Heading>
                    <Text color="gray.500">Bienvenido/a! desde aquí podras controlar toda tu tienda online</Text>
                </Stack>
                <Spacer/>
                <Stack>
                    <LogoutButton/>
                    <Button colorScheme="secondary" variant="outline" size="sm" onClick={()=>router.push('/')}>
                        Volver a la tienda
                    </Button>
                </Stack>
            </Flex>
        </Box>
    )
}

export default DashHeader
