import { Grid } from "@chakra-ui/react"
import Head from "next/head"
import Container from "../components/Container"
import DashCard from "../components/Dashboard/DashCard"
import DashHeader from "../components/Dashboard/DashHeader"
import { adminAuth, firestore } from "../util/firebaseServer"
import nookies from 'nookies'

const Dashboard = ({userData}) => {
    return(
        <>
            <Head>
                <title>{userData.title} - Panel de control</title>
            </Head>
            <Container>
                <DashHeader/>
                <Grid 
                    mt={5}
                    gridGap={5}
                    templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                >
                    <DashCard 
                        link="/dashboard/products"
                        title="Productos"
                        desc="Controla todos los productos de tu tienda online"
                    />
                    <DashCard 
                        link="/dashboard/categories"
                        title="Categorias"
                        desc="Controla todas las categorias de tu tienda online"
                    />
                    <DashCard
                        link="/dashboard/store"
                        title="Tienda"
                        desc="Ajusta la identidad de tu tienda"
                    />
                </Grid>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx) {
    try{
        const cookies = nookies.get(ctx)
        const token = await adminAuth.verifyIdToken(cookies.token)
        let userData
        await firestore.collection('users')
            .doc('userInfo')
            .get()
            .then(doc=>{
                userData = doc.data()
            })
        return {
            props: {
                userData
            }
        }
    }catch(err){
        ctx.res.writeHead(302, {Location: '/login'})
        ctx.res.end()
        return { props: {}}
    }
}
export default Dashboard
