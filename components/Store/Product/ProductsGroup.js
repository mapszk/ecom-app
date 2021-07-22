import { Grid, Heading } from "@chakra-ui/react"
import ProductCard from "./ProductCard"

const ProductsGroup = ({title, products}) => {
    return (
        <>
            <Heading size="md" mb={4}>{title}</Heading>
            <Grid gap={2} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
                {products.map(product=>{
                    return <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.imageURL}
                        price={product.price}
                        name={product.name}
                    />
                })}
            </Grid>
        </>
    )
}

export default ProductsGroup
