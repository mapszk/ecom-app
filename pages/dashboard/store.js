import { Box, Grid, Heading } from "@chakra-ui/react"
import DashHeader from "../../components/Dashboard/DashHeader"
import DashInfo from "../../components/Dashboard/DashInfo"
import { SwatchesPicker } from "react-color"
import { useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import { useAuth } from "../../hooks/useAuth"
import withAuth from "../../hoc/withAuth"

const Store = () => {
    const [primary, setPrimary] = useState('#fff')
    const [secondary, setSecondary] = useState('#ff')
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
                borderColor="teal"
                p={4}
            >
                <DashInfo link={'/dashboard'}/>
                <Grid gridGap={4} templateColumns="repeat(auto-fit, minmax(300px, 1fr))">
                    <Box>
                        <Heading mb={4} size="md">Elige el color primario de tu tienda</Heading>
                        <SwatchesPicker  color={primary} onChangeComplete={color=>setPrimary(color)}/>
                    </Box>
                    <Box>
                        <Heading mb={4} size="md">Elige el color secundario de tu tienda</Heading>
                        <SwatchesPicker  color={secondary} onChangeComplete={color=>setSecondary(color)}/>
                    </Box>
                </Grid>
            </Box>
        </>
    )
}

export default withAuth(Store)
