import Navbar from '../components/Store/Navbar/Navbar'
import Footer from '../components/Store/Footer'
import Container from '../components/Container'
import Head from 'next/head'
import { firestore } from '../util/firebaseServer'
import { useShoppingCart } from '../hooks/useShoppingCart'
import { Box, Heading, Text } from '@chakra-ui/layout'
import { Button, Link, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import ShoppingCartItem from '../components/Store/ShoppingCartItem'
import { useEffect, useState } from 'react'

const cart = ({categories, userData}) => {
    const [paymentLink, setPaymentLink] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { shoppingCart } = useShoppingCart()
    useEffect(()=>{
        const getBuyButton = async () => {
            setLoading(true)
            await fetch('http://localhost:3000/api/payment', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: shoppingCart,
                    back_urls: {
                        'success': process.env.NEXT_PUBLIC_DOMAIN + '/payment/success',
                        'failure': process.env.NEXT_PUBLIC_DOMAIN + '/payment/failure',
                        'pending': process.env.NEXT_PUBLIC_DOMAIN + '/payment/pending',
                    }
                })
            })
            .then(res=> res.json())
            .then(json=> {
                setPaymentLink(json.init_point)
                setLoading(false)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        getBuyButton()
    }, [shoppingCart])
    return (
        <>
            <Head>
                <title>{userData.title} - Carrito de compra</title>
            </Head>
            <Navbar logo={userData.logoImgUrl} categories={categories}/>
            <Container>
                {shoppingCart.length===0?
                <Box pt={20} width="full" maxW="450px">
                    <Heading mb={2} size="lg">Tu carrito está vacío</Heading>
                    <Text>Comienza a agregar productos!</Text>
                    <Button mt={4} colorScheme="primary" onClick={()=>router.back()}>Volver atrás</Button>
                </Box> :
                <Box p={2} w="full" maxWidth="500px" mx="auto">
                    <Heading size="lg" mb={4}>Carrito de compra</Heading>
                    {shoppingCart.map(product=> <ShoppingCartItem product={product}/>)}
                    <LinkBox>
                        <LinkOverlay href={paymentLink} isExternal>
                            <Button
                                isLoading={loading}
                                isFullWidth
                                colorScheme="primary"
                                mt={4}
                                textDecoration="none" 
                                textDecor="none"
                            >
                                Comprar
                            </Button>
                        </LinkOverlay>
                    </LinkBox>
                </Box>
                }
            </Container>
            <Footer/>
        </>
    )
}

export async function getStaticProps() {
    let userData
    const categories = []
    await firestore.collection('users')
		.doc('userInfo')
		.get()
		.then(doc=>{
			userData = doc.data()
		})
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
export default cart
