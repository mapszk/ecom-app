import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import Footer from "../../../../components/Store/Footer"
import Navbar from "../../../../components/Store/Navbar/Navbar"
import Container from '../../../../components/Container'
import { useRouter } from "next/dist/client/router"
import { firestore } from "../../../../util/firebaseServer"
import CategoryProducts from "../../../../components/Store/CategoryProducts"

const Subcategory = ({categories, products, userData}) => {
    console.log(products)
    const router = useRouter()
    const { category: categoryName, subcategory: subcategoryName } = router.query
    return (
        <>
            <Navbar logo={userData.logoImgUrl} categories={categories}/>
            <Container>
                <Breadcrumb 
                    fontWeight="semibold" 
                    fontSize="lg"
                    separator="/"
                >
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/category/${categoryName}`}>{categoryName}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/category/${categoryName}/${subcategoryName}`}>{subcategoryName}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <CategoryProducts products={products}/>
            </Container>
            <Footer/>
        </>
    )
}

export async function getStaticPaths() {
    let subcategoriesPaths = []
    await firestore.collection('categories')
        .get()
        .then(querySnap=> querySnap.forEach(doc=>{
            const { subcategories, name } = doc.data()
            if(subcategories.length>0){
                const subcategoriesNames = subcategories.map(sub=> ({params: {category: name, subcategory: sub.name}}))
                subcategoriesPaths.push(...subcategoriesNames)
            }
        }))
    return { 
        paths: subcategoriesPaths,
        fallback: false
    }
}
export async function getStaticProps({params}) {
    const categories = []
    const products = []
    let userData
    await firestore.collection('categories')
        .get()
        .then(querySnap=> querySnap.forEach(doc=>{
            categories.push(doc.data())
        }))
    await firestore.collection('products')
        .where('subcategory', '==', params.subcategory)
        .get()
        .then(querySnap=> querySnap.forEach(doc=> products.push(doc.data())))
    await firestore.collection('users')
		.doc('userInfo')
		.get()
		.then(doc=>{
			userData = doc.data()
		})
    return {
        props: {
            categories,
            subcategory: categories.filter(cat=> cat.name===params.category)[0].subcategories.filter(sub=> sub.name===params.subcategory)[0],
            products,
            userData
        },
        revalidate: 60 * 10
    }
}
export default Subcategory
