import { Box, Grid } from "@chakra-ui/react"
import CategoryForm from "../../components/Dashboard/CategoryForm/CategoryForm"
import CategoryList from "../../components/Dashboard/CategoryList/CategoryList"
import DashHeader from "../../components/Dashboard/DashHeader"
import DashInfo from '../../components/Dashboard/DashInfo'
import Container from "../../components/Container"
import { adminAuth, firestore } from "../../util/firebaseServer"
import { useState } from "react"
import Head from "next/head"
import nookies from 'nookies'

const Categories = ({userData, categories}) => {
    const [categoriesToShow, setCategoriesToShow] = useState(categories)
    return(
        <>
            <Head>
                <title>{userData.title} - Panel de control: Categorías</title>
            </Head>
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
        </>
    )
}

export async function getServerSideProps(ctx) {
    try{
        const cookies = nookies.get(ctx)
        const token = await adminAuth.verifyIdToken(cookies.token)
        const data = []
        let userData
        await firestore.collection('categories')
            .get()
            .then(querySnapshot=>{
                querySnapshot.forEach(doc=>{
                    data.push(doc.data())
                })
            })
        await firestore.collection('users')
            .doc('userInfo')
            .get()
            .then(doc=> userData = doc.data())
        return {
            props: {
                categories: data,
                userData
            }
        }
    }catch(err){
        ctx.res.writeHead(302, {Location: '/login'})
        ctx.res.end()
        return { props: {}}
    }
}

export default Categories
