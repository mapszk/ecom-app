import { Box, Grid } from "@chakra-ui/react"
import CategoryForm from "../../components/Dashboard/CategoryForm/CategoryForm"
import CategoryList from "../../components/Dashboard/CategoryList/CategoryList"
import DashHeader from "../../components/Dashboard/DashHeader"
import DashInfo from '../../components/Dashboard/DashInfo'
import withAuth from "../../hoc/withAuth"
import Container from "../../components/Container"
import { firestore } from "../../util/firebaseServer"
import { useState } from "react"

const Categories = ({categories}) => {
    const [categoriesToShow, setCategoriesToShow] = useState(categories)
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
                    <CategoryForm categoriesToShow={categoriesToShow} setCategoriesToShow={setCategoriesToShow}/>
                    <CategoryList categoriesToShow={categoriesToShow} setCategoriesToShow={setCategoriesToShow}/>
                </Grid>
            </Box>
        </Container>
    )
}

export async function getServerSideProps(ctx) {
    const data = []
    await firestore.collection('categories')
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                data.push(doc.data())
            })
        })
    return {
        props: {
            categories: data
        }
    }
}

export default withAuth(Categories) 
