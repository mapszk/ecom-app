import { Box, Heading, Text } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"

const DashHeader = () => {
    const router = useRouter()
    const getText = () => {
        switch(router.pathname){
            case '/dashboard':
                return 'Bienvenido/a! desde aquí podras controlar toda tu tienda online'
            case '/dashboard/categories':
                return 'Categorías'
            case '/dashboard/products':
                return 'Productos'
            case '/dashboard/store':
                return 'Tienda'
            default:
                return 'Bienvenido/a! desde aquí podras controlar toda tu tienda online'
        }
    }
    return(
        <Box
            color="gray.700"
            bgColor="white"
            rounded="xl"
            p={4}
            fontWeight="bold"
            mt={5}
            border="1px"
            borderColor="gray.400"
            boxShadow="base"
        >
            <Text fontSize="lg" color="gray.400">Ecommerce-App</Text>
            <Heading mb={2}>Panel de control</Heading>
            <Text color="gray.500">
                {getText()}
            </Text>
        </Box>
    )
}

export default DashHeader
