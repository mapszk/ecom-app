import { Box, Grid } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import { useEffect } from "react"
import DashHeader from "../../components/Dashboard/DashHeader"
import DashInfo from "../../components/Dashboard/DashInfo"
import ProductForm from "../../components/Dashboard/ProductForm/ProductForm"
import ProductList from "../../components/Dashboard/ProductList/ProductList"
import withAuth from "../../hoc/withAuth"
import { useAuth } from "../../hooks/useAuth"
import { db } from '../../util/firebase'

const Products = ({products, categories}) => {
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
                    <ProductForm categories={categories}/>
                    <ProductList categories={categories} products={products} />
                </Grid>
            </Box>
        </>
    )
}

export async function getServerSideProps() {
    const categories = []
    const products = []
    await db.collection('categories')
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                categories.push(doc.data())
            })  
        })
    await db.collection('products')
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                products.push(doc.data())
            })
        })
    return {
        props: {
            categories,
            products
        }
    }
}

export default withAuth(Products) 
