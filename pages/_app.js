import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import AuthContextProvider from "../contexts/authContext"
import ShoppingCartContextProvider from '../contexts/ShoppingCartContext'
import { db } from "../util/firebaseClient"
import { mode } from '@chakra-ui/theme-tools'
import chroma from 'chroma-js'
import Loader from "../components/Loader"

const MyApp = ({Component, pageProps}) => {
    const [theme, setTheme] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const getTheme = async () => {
            await db.collection('users')
                .doc('userInfo')
                .get()
                .then(doc=>{
                    const { colors } = doc.data()
                    const primaryScale = chroma.scale([
                        chroma(colors.primary).brighten(2), 
                        colors.primary, 
                        chroma(colors.primary).darken(2)
                    ])
                    const secondaryScale = chroma.scale([
                        chroma(colors.secondary).brighten(2), 
                        colors.secondary, 
                        chroma(colors.secondary).darken(2)
                    ])
                    setTheme(extendTheme({
                        colors: {
                            primary: {
                                50: primaryScale(0.05).hex(),
                                100: primaryScale(0.1).hex(),
                                200: primaryScale(0.2).hex(),
                                300: primaryScale(0.3).hex(),
                                400: primaryScale(0.4).hex(),
                                500: primaryScale(0.5).hex(),
                                600: primaryScale(0.6).hex(),
                                700: primaryScale(0.7).hex(),
                                800: primaryScale(0.8).hex(),
                                900: primaryScale(0.9).hex(),
                            },
                            secondary: {
                                50: secondaryScale(0.05).hex(),
                                100: secondaryScale(0.1).hex(),
                                200: secondaryScale(0.2).hex(),
                                300: secondaryScale(0.3).hex(),
                                400: secondaryScale(0.4).hex(),
                                500: secondaryScale(0.5).hex(),
                                600: secondaryScale(0.6).hex(),
                                700: secondaryScale(0.7).hex(),
                                800: secondaryScale(0.8).hex(),
                                900: secondaryScale(0.9).hex(),
                            },
                        },
                        styles: {
                            global: (props) => ({
                                'html, body': {
                                    bg: mode('gray.50', 'red')(props),
                                }
                            })
                        }
                    }))
                    setLoading(false)
                })
        }
        getTheme()
    },[])

    if(loading) return(
        <ChakraProvider>
            <AuthContextProvider>
                <Loader/>
            </AuthContextProvider>
        </ChakraProvider>
    )
    return(
        <ChakraProvider theme={theme}>
            <AuthContextProvider>
                <ShoppingCartContextProvider>
                    <Component {...pageProps}/>
                </ShoppingCartContextProvider>
            </AuthContextProvider>
        </ChakraProvider>
    )
}

export default MyApp
