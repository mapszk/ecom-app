import { Box, Grid } from "@chakra-ui/react"
import { useState } from "react"
import Container from "../../components/Container"
import DashHeader from "../../components/Dashboard/DashHeader"
import DashInfo from "../../components/Dashboard/DashInfo"
import ProductForm from "../../components/Dashboard/ProductForm/ProductForm"
import ProductList from "../../components/Dashboard/ProductList/ProductList"
import withAuth from "../../hoc/withAuth"
import { firestore } from "../../util/firebaseServer"

const Products = ({products, categories}) => {
    const [productsToShow, setProductsToShow] = useState(products)
    return(
        <Container>
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
                    <ProductForm categories={categories} setProductsToShow={setProductsToShow} />
                    <ProductList categories={categories} productsToShow={productsToShow} />
                </Grid>
            </Box>
        </Container>
    )
}

export async function getServerSideProps() {
    const categories = []
    const products = []
    await firestore.collection('categories')
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                categories.push(doc.data())
            })  
        })
    await firestore.collection('products')
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
