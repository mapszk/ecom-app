import { Box, Button, Grid, Heading, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react"
import DashHeader from "../../components/Dashboard/DashHeader"
import DashInfo from "../../components/Dashboard/DashInfo"
import { SwatchesPicker } from "react-color"
import { useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import { useAuth } from "../../hooks/useAuth"
import withAuth from "../../hoc/withAuth"
import { db } from "../../util/firebase"

const Store = ({userData}) => {
    const [primary, setPrimary] = useState(userData.colors.primary)
    const [secondary, setSecondary] = useState(userData.colors.secondary)
    const { user } = useAuth()
    const router = useRouter()
    useEffect(()=>{
        if(!user) router.push('/login')
    })
    return(
        <>
            <DashHeader/>
            <Box
                my={4}
                boxShadow="base"
                rounded="xl"
                bgColor="white"
                border="1px"
                borderColor="primary.500"
                p={4}
            >
                <DashInfo link={'/dashboard'}/>
                <Grid gridGap={4} templateColumns="repeat(auto-fit, minmax(300px, 1fr))">
                    <Box>
                        <Heading mb={4} size="md">Elige el color primario de tu tienda</Heading>
                        <Popover placement="right">
                            <PopoverTrigger>
                                <Box
                                    _hover={{bg: primary}}
                                    as={Button}
                                    width="50px"
                                    height="50px"
                                    rounded="full"
                                    bg={primary}
                                    boxShadow="base"
                                ></Box>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverBody>
                                    <SwatchesPicker width="100%" color={primary} onChangeComplete={color=>setPrimary(color.hex)}/>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>
                    <Box>
                        <Heading mb={4} size="md">Elige el color primario de tu tienda</Heading>
                        <Popover placement="right">
                            <PopoverTrigger>
                                <Box
                                    as={Button}
                                    width="50px"
                                    height="50px"
                                    rounded="full"
                                    bg={secondary}
                                    boxShadow="base"
                                ></Box>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverBody>
                                    <SwatchesPicker width="100%" color={secondary} onChangeComplete={color=>setSecondary(color.hex)}/>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>
                </Grid>
            </Box>
        </>
    )
}

export async function getServerSideProps() {
    let userData 
    await db.collection('users')
        .doc('userInfo')
        .get()
        .then((doc)=>{
            userData = doc.data()
        })
    return { 
        props: {
            userData
        }
    }
}

export default withAuth(Store)
