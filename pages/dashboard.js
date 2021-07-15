import { Grid } from "@chakra-ui/react"
import DashCard from "../components/Dashboard/DashCard"
import DashHeader from "../components/Dashboard/DashHeader"
import StoreSettings from "../components/Dashboard/StoreSettings"
import withAuth from "../hoc/withAuth"
import { db } from "../util/firebase"

const Dashboard = ({userData}) => {
    return(
        <>
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
                <StoreSettings colors={userData.colors}/>
            </Grid>
        </>
    )
}

export async function getServerSideProps() {
    let userData 
    await db.collection('users')
        .doc('userInfo')
        .get()
        .then((doc)=>{
            userData = doc.data()
        })
    return { 
        props: {
            userData
        }
    }
}

export default withAuth(Dashboard)
