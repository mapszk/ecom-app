import { Box, Button, Grid, Heading } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import Container from "../Container"
import ProductCard from "./Product/ProductCard"

const CategoryProducts = ({products}) => {
    const router = useRouter()
    if(products.length===0){
        return(
        <Container>
            <Box height="68.1vh" pt={20} width="full" maxW="500px">
                <Heading mb={4} size="lg">Por el momento no hay productos para esta categoría</Heading>
                <Button onClick={()=> router.back()} colorScheme="primary">Volver atrás</Button>
            </Box>
        </Container>
        )
    }else{
        return (
            <Grid mt={4} width="full" gap={2} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
                {products.map(product=>{
                    return <ProductCard
                        key={product.id}
                        image={product.image}
                        price={product.price}
                        id={product.id}
                        name={product.name}
                    />
                })}
            </Grid>
        )
    }
}

export default CategoryProducts
