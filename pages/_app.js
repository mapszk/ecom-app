import { Box, ChakraProvider } from "@chakra-ui/react"
import theme from "../theme"

const MyApp = ({Component, pageProps}) => {
    return(
        <ChakraProvider theme={theme}>
            <Box width="95%" maxWidth="1024px" mx="auto">
                <Component {...pageProps}/>
            </Box>
        </ChakraProvider>
    )
}

export default MyApp
