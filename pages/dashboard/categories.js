import { db } from "../../util/firebase"
import { Box, Grid } from "@chakra-ui/react"
import CategoryForm from "../../components/Dashboard/CategoryForm/CategoryForm"
import CategoryList from "../../components/Dashboard/CategoryList/CategoryList"
import DashHeader from "../../components/Dashboard/DashHeader"
import DashInfo from '../../components/Dashboard/DashInfo'
import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useRouter } from "next/dist/client/router"
import withAuth from "../../hoc/withAuth"

const Categories = ({categories}) => {
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
    return {
        props: {
            categories: data
        }
    }
}

export default withAuth(Categories) 
