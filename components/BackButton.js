import { ArrowBackIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"

const BackButton = ({link}) => {
    const router = useRouter()
    return (
        <Button colorScheme="teal" size="sm" onClick={()=>router.push(link)}>
            <ArrowBackIcon/>
        </Button>
    )
}

export default BackButton
