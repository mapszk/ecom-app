import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import Container from "../../../components/Container"
import CategoryProducts from "../../../components/Store/CategoryProducts"
import Footer from "../../../components/Store/Footer"
import Navbar from "../../../components/Store/Navbar/Navbar"
import { firestore } from "../../../util/firebaseServer"

const Category = ({categories, category, products, userData}) => {
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
                        <BreadcrumbLink href={`/category/${category.name}`}>{category.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <CategoryProducts products={products} category={category}/>
            </Container>
            <Footer/>
        </>
    )
}

export async function getStaticPaths() {
    const categories = []
    await firestore.collection('categories')
        .get()
        .then(querySnap=> querySnap.forEach(doc=>{
            const { name } = doc.data()
            categories.push({params: {category: name}})
        }))
    return {
        paths: categories,
        fallback: true
    }
}
export async function getStaticProps({params}) {
    const categories = []
    const products = []
    let userData
    await firestore.collection('users')
		.doc('userInfo')
		.get()
		.then(doc=>{
			userData = doc.data()
		})
    await firestore.collection('categories')
        .get()
        .then(querySnap=> querySnap.forEach(doc=> categories.push(doc.data())))
    await firestore.collection('products')
        .where('category', '==', params.category)
        .get()
        .then(querySnap=> querySnap.forEach(doc=> products.push(doc.data())))
    return {
        props: {
            categories,
            category: categories.filter(cat=> cat.name===params.category)[0],
            products,
            userData
        },
        revalidate: 60 * 10
    }
}

export default Category
