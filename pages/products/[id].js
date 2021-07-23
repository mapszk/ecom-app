import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Heading, Image, Spacer, Text, useMediaQuery } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { useEffect, useState } from "react"
import Container from "../../components/Container"
import Loader from "../../components/Loader"
import Footer from "../../components/Store/Footer"
import Navbar from "../../components/Store/Navbar/Navbar"
import ProductsGroups from '../../components/Store/Product/ProductsGroup'
import { useShoppingCart } from "../../hooks/useShoppingCart"
import { firestore } from "../../util/firebaseServer"
import { formatPrice } from "../../util/formatPrice"

const Product = ({product, categories, relatedProducts, userData}) => {
    const router = useRouter()
    const { shoppingCart, setShoppingCart } = useShoppingCart()
    const [isInCart, setIsInCart] = useState(false)
    const [isLargerThan640] = useMediaQuery('(min-width: 640px)')
    useEffect(()=>{
        if(shoppingCart.findIndex(item=> item.id===product.id)!== -1) setIsInCart(true)
    }, [shoppingCart])
    const addToCart = () => {
        if(!isInCart){
            setIsInCart(true)
            if(product.image) setShoppingCart(shoppingCart=> ([...shoppingCart, {id: product.id, title: product.name, unit_price: product.price, picture_url: product.image || 'null', quantity: 1}]))
            else setShoppingCart(shoppingCart=> ([...shoppingCart, {id: product.id, title: product.name, unit_price: product.price, quantity: 1}]))
        }else router.push('/cart')
    }
    if(router.isFallback) return <Loader/>
    return (
        <>
            <Head>
                <title>{userData.title} - {product.name}</title>
            </Head>
            <Navbar logo={userData.logoImgUrl} categories={categories} />
            <Container>
                <Breadcrumb
                    mb={4}
                    fontWeight="semibold" 
                    fontSize="lg"
                    separator="/"
                >
                    <BreadcrumbItem>
                        <BreadcrumbLink>{product.category}</BreadcrumbLink>
                    </BreadcrumbItem>
                    {product.subcategory && 
                    <BreadcrumbItem>
                        <BreadcrumbLink>{product.subcategory}</BreadcrumbLink>
                    </BreadcrumbItem>}
                    <BreadcrumbItem>
                        <BreadcrumbLink>{product.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Box
                    mb={4}
                    display={isLargerThan640? 'flex': 'block'}
                    w="full"
                    rounded="lg"
                >
                    <Box flex="2 1 0" width="full" mb={!isLargerThan640 ? 2 : 0} mr={isLargerThan640 ? 2 : 0}>
                        <Image 
                            h="full" 
                            w="full" 
                            objectFit="contain" 
                            rounded="lg" 
                            src={product.imageURL||'/images/sample-image.png'} 
                            border="1px"
                            borderColor="gray.200"
                        />
                    </Box> 
                    <Box
                        flex="1 1 0"
                        width="full"
                        display="flex"
                        flexDirection="column"
                        p={3}
                        border="1px"
                        borderColor="gray.300"
                        rounded="lg"
                    >
                        <Heading mb={2}>{product.name}</Heading>
                        <Text fontSize="xl">{product.category}</Text>
                        <Box my={4}>
                            <Heading mb={2} size="md">Descripción</Heading>
                            <Text lineHeight="1.5rem">{product.shortDesc}</Text>
                        </Box>
                        <Spacer/>
                        <Text fontSize="4xl" mb={2} fontWeight="bold" bgGradient="linear(to-l, primary.500, secondary.500)" bgClip="text">{formatPrice(product.price)}</Text>
                        <Button onClick={addToCart} isFullWidth colorScheme={isInCart? 'secondary': 'primary'}>{isInCart? 'Finalizar compra': 'Agregar al carrito'}</Button>
                    </Box>
                </Box>
                <Box mb={4} pb={6} borderBottom="1px" borderBottomColor="gray.300">
                    <Heading mb={2} size="md">Detalles</Heading>
                    <Text>
                        {product.desc}
                    </Text>
                </Box>
                <ProductsGroups title="Productos relacionados" products={relatedProducts}/>
            </Container>
            <Footer/>
        </>
    )
}

export async function getStaticPaths() {
    const productsId = []
    await firestore.collection('products')
        .limit(10)
        .get()
        .then(querySnap=>{
            querySnap.forEach(doc=>{
                const { id } = doc.data()
                productsId.push({params: {id}})
            })
        })
    return {
        paths: productsId,
        fallback: 'blocking'
    }
}

export async function getStaticProps({params}) {
    let product
    let userData
    const relatedProducts = []
    const categories = []
    await firestore.collection('products')
        .doc(params.id)
        .get()
        .then(doc=> product = doc.data())
    await firestore.collection('categories')
        .get()
        .then(querySnap=> querySnap.forEach(doc=> categories.push(doc.data()) ))
    await firestore.collection('products')
        .where('category', '==', product.category)
        .limit(4)
        .get()
        .then(snap=> snap.forEach(doc=> relatedProducts.push(doc.data())))
    await firestore.collection('users')
		.doc('userInfo')
		.get()
		.then(doc=>{
			userData = doc.data()
		})
    return {
        props: {
            product,
            categories,
            relatedProducts,
            userData
        },
        revalidate: 60 * 10
    }
}

export default Product
