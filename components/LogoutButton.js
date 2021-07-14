import { Button } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import { useState } from "react"
import { auth } from "../util/firebase"

const LogoutButton = () => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleClick = async () => {
        setIsSubmitting(true)
        await auth.signOut().then(()=>{
            router.push({pathname: '/login'}, undefined, {shallow: true})
            setIsSubmitting(false)
        }) 
    }
    return (
        <Button isLoading={isSubmitting} onClick={handleClick} colorScheme="teal">
            Cerrar sesión
        </Button>
    )
}

export default LogoutButton
