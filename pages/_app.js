import { Box, ChakraProvider } from "@chakra-ui/react"
import AuthContextProvider from "../contexts/authContext"
import theme from "../theme"

const MyApp = ({Component, pageProps}) => {
    return(
        <ChakraProvider theme={theme}>
            <AuthContextProvider>
                <Box width="95%" maxWidth="1024px" mx="auto">
                    <Component {...pageProps}/>
                </Box>
            </AuthContextProvider>
        </ChakraProvider>
    )
}

export default MyApp
