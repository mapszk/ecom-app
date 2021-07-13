import { Button, Heading } from "@chakra-ui/react"
import DashHeader from "../../components/Dashboard/DashHeader"
import { db } from '../../firebase'

const Products = () => {
    return(
        <>
            <DashHeader/>
            <Heading>productos</Heading>
        </>
    )
}

export default Products 
