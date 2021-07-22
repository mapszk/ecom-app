import { Box } from "@chakra-ui/react"

const Container = ({children}) => {
    return (
        <Box width="95%" maxWidth="1024px" mx="auto" minH={'calc(100vh - 130px)'}>
            {children}
        </Box>
    )
}

export default Container
