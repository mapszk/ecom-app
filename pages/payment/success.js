import { firestore } from "../../util/firebaseServer"
import Navbar from '../../components/Store/Navbar/Navbar'
import Footer from '../../components/Store/Footer'
import Container from "../../components/Container"
import Head from "next/head"
import { Box, Heading } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router"

const failure = ({userData, categories}) => {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{userData.title} - Pago exitoso</title>
            </Head>
            <Navbar categories={categories} logo={userData.logoImgUrl} />
            <Container>
                <Box pt={10} mx="auto" flexDirection="column" display="flex" justifyContent="center" alignItems="center" w="full" maxW="500px">
                    <Heading mb={4}>Pago exitoso!</Heading>
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
		revalidate: 60 * 2
    }
}
export default failure
