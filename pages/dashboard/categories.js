import { db } from '../../firebase'
import { Alert, AlertIcon, Box, Divider, Grid, Heading } from "@chakra-ui/react"
import CategoryForm from "../../components/Dashboard/CategoryForm/CategoryForm"
import CategoryList from "../../components/Dashboard/CategoryList/CategoryList"
import DashHeader from "../../components/Dashboard/DashHeader"

const Categories = ({categories}) => {
    return(
        <>
            <DashHeader/>
            <Box
                my={4}
                boxShadow="base"
                rounded="xl"
                bgColor="white"
                border="1px"
                borderColor="gray.400"
                p={4}
            >
                <Alert mb={4} rounded="lg" status="info">
                    <AlertIcon/>
                    Recuerda que tu tienda actualiza los cambios todos los días a las 22:00 horas.
                </Alert>
                <Grid gridGap={4} templateColumns="repeat(auto-fit, minmax(300px, 1fr))">
                    <CategoryForm/>
                    <CategoryList categories={categories}/>
                </Grid>
            </Box>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const data = []
    await db.collection('categories')
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                data.push(doc.data())
            })
        })
        .catch(err=>{
            data.push('error')
        })
    return {
        props: {
            categories: data
        }
    }
}

export default Categories 
