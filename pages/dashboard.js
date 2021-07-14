import { Grid } from "@chakra-ui/react"
import DashCard from "../components/Dashboard/DashCard"
import DashHeader from "../components/Dashboard/DashHeader"
import withAuth from "../hoc/withAuth"

const Dashboard = () => {
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
                <DashCard 
                    link="/dashboard/store"
                    title="Tienda"
                    desc="Controla otros datos de tu tienda online"
                />
            </Grid>
        </>
    )
}

export default withAuth(Dashboard)
