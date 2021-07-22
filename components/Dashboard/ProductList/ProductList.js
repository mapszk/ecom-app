import { Alert, AlertDescription, AlertIcon, Box, Heading, Select, Text } from "@chakra-ui/react"
import { useState } from "react"
import ProductItem from "./ProductItem"

const ProductList = ({categories, productsToShow}) => {
    const [warning, setWarning] = useState(false)
    const [filter, setFilter] = useState('null')
    const [alert, setAlert] = useState({})
    const clearWarning = () => {
        setTimeout(()=>{
            setWarning(false)
            setAlert({})
        }, 4000)
    }
    return (
        <Box>
            {
                warning && 
                <Alert my={2} status={alert.type} rounded="md">
                    <AlertIcon />
                    <AlertDescription>{alert.msg}</AlertDescription>
                </Alert>
            }
            <Heading mb={4} size="md">Lista de productos</Heading>
            <Text mb={2}>Filtrar por categoría</Text>
            <Box mb={2}>
                <Select defaultChecked="null" onChange={(e)=>setFilter(e.target.value)}>
                    <option value="null">Mostrar todos</option>
                    {categories.map(cat=> <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                </Select>
            </Box>
            <Box height="500px" overflowY="auto">
                {
                    categories.length===0 &&
                    <Text>No tienes ningun producto</Text>
                }
                {
                    filter && filter==='null' ?
                    productsToShow.map(prod=> <ProductItem
                        product={prod}
                        key={prod.id}
                        setWarning={setWarning}
                        setAlert={setAlert}
                        clearWarning={clearWarning}
                    />) :
                    productsToShow.filter(prod=> prod.category===filter).map(prod=> <ProductItem
                        product={prod}
                        key={prod.id}
                        setWarning={setWarning}
                        setAlert={setAlert}
                        clearWarning={clearWarning}
                    />)
                }
            </Box>
        </Box>
    )
}

export default ProductList
