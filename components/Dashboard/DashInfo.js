import { Heading, HStack } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import BackButton from "../BackButton"

const DashInfo = ({link}) => {
    const router = useRouter()
    const getText = () => {
        switch(router.pathname){
            case '/dashboard/categories':
                return 'Categorías'
            case '/dashboard/products':
                return 'Productos'
            case '/dashboard/store':
                return 'Tienda'
        }
    }
    return (
        <HStack mb={4} spacing={4} alignItems="center">
            <BackButton link={link} />
            <Heading size="lg">{getText()}</Heading>
        </HStack>
    )
}

export default DashInfo
