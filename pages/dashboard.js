import { Grid } from "@chakra-ui/react"
import Head from "next/head"
import Container from "../components/Container"
import DashCard from "../components/Dashboard/DashCard"
import DashHeader from "../components/Dashboard/DashHeader"
import withAuth from "../hoc/withAuth"
import { firestore } from "../util/firebaseServer"

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

export async function getServerSideProps() {
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
}
export default withAuth(Dashboard)
