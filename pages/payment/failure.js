import { Box, Button, Heading, Text } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import Container from "../../components/Container"
import Footer from "../../components/Store/Footer"
import Navbar from "../../components/Store/Navbar/Navbar"
import { firestore } from "../../util/firebaseServer"

const success = ({userData, categories}) => {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{userData.title} - Error en el pago</title>
            </Head>
            <Navbar categories={categories} logo={userData.logoImgUrl} />
            <Container>
                <Box pt={10} mx="auto" flexDirection="column" display="flex" justifyContent="center" alignItems="center" w="full" maxW="500px">
                    <Heading mb={2}>Oops!</Heading>
                    <Text mb={4} fontWeight="semibold">
                        Ha ocurrido un error en el pago
                    </Text>
                    <Button colorScheme="primary" onClick={()=>router.push('/')}>Volver al inicio</Button>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export async function getStaticProps() {
    const categories = []
    let userData
    await firestore.collection('users')
        .doc('userInfo')
        .get()
        .then(doc => userData = doc.data())
    await firestore.collection('categories')
        .get()
        .then(snap=> snap.forEach(doc=> categories.push(doc.data())))
    return {
        props: {
            categories,
            userData
        },
        revalidate: 60 * 10
    }
}
export default success
