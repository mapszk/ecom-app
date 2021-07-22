import { Alert, AlertDescription, AlertIcon, Box, Heading, Text } from "@chakra-ui/react"
import { useState } from "react"
import CategoryItem from "./CategoryItem"

const CategoryList = ({categoriesToShow, setCategoriesToShow}) => {
    const [warning, setWarning] = useState(false)
    const [alert, setAlert] = useState({})
    const clearWarning = () => {
        setTimeout(()=>{
            setWarning(false)
            setAlert({})
        }, 4000)
    }
    return (
        <Box>
            <Heading size="md" mb={4}>Lista de categorias</Heading>
            {
                warning && 
                <Alert my={2} status={alert.type} rounded="md">
                    <AlertIcon />
                    <AlertDescription>{alert.msg}</AlertDescription>
                </Alert>
            }
            <Box height="500px" overflowY="auto">
                {
                    categoriesToShow.length===0 &&
                    <Text>No tienes ninguna categoría</Text>
                }
                {
                    categoriesToShow.map((category)=> <CategoryItem 
                        setCategoriesToShow={setCategoriesToShow}
                        categoriesToShow={categoriesToShow}
                        key={category.id} 
                        category={category}
                        setWarning={setWarning} 
                        setAlert={setAlert}
                        clearWarning={clearWarning} 
                    />)
                }
            </Box>
        </Box>
    )
}

export default CategoryList
