import { firestore } from '../util/firebaseServer'
import Navbar from '../components/Store/Navbar/Navbar'
import Container from '../components/Container'
import HomeWelcome from '../components/Store/HomeWelcome'
import ProductsGroup from '../components/Store/Product/ProductsGroup'
import Footer from '../components/Store/Footer'

const Home = ({categories, userData, latestProducts}) => {
	return (
		<>
			<Navbar logo={userData.logoImgUrl} categories={categories}/>
			<Container>
				<HomeWelcome image={userData.welcomeImageUrl} welcome={userData.welcome}/>
				<ProductsGroup title="Ultimos productos" products={latestProducts}/>
			</Container>
			<Footer/>
		</>
	)
}

export async function getStaticProps() {
	const categories = []
	const latestProducts = []
	let userData
	await firestore.collection('categories')
		.get()
		.then(querySnap=>{
			querySnap.forEach(doc=>{
				categories.push(doc.data())
			})
		})
	await firestore.collection('users')
		.doc('userInfo')
		.get()
		.then(doc=>{
			userData = doc.data()
		})
	await firestore.collection('products')
		.limit(4)
		.get()
		.then(querySnap=>{
			querySnap.forEach(doc=>{
				latestProducts.push(doc.data())
			})
		})
	return {
		props: {
			categories,
			userData,
			latestProducts
		},
		revalidate: 60 * 10
	}
}
export default Home
