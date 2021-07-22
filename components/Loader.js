import { Flex, Spinner } from "@chakra-ui/react"

const Loader = () => {
    return (
        <Flex justify="center" align="center" width="100vw" height="100vh">
            <Spinner m="auto" size="xl" color="gray.400" />
        </Flex>
    )
}

export default Loader
