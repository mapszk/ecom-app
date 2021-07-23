import { Alert, AlertDescription, AlertIcon, Box, Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { auth } from '../util/firebaseClient'
import { firestore } from "../util/firebaseServer"

const login = ({userData}) => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [warning, setWarning] = useState(false)
    const [alert, setAlert] = useState({})

    const clearWarning = () => {
        setTimeout(()=>{
            setIsSubmitting(false)
            setWarning(false)
            setAlert({})
        }, 4000)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        if(email===''|| pass===''){
            setWarning(true)
            setAlert({msg: 'Por favor rellena todos los campos', type: 'error'})
            setIsSubmitting(false)
            clearWarning()
        }
        await auth.signInWithEmailAndPassword(email, pass)
            .then(user=>{
                setIsSubmitting(false)
                console.log('logeado')
                router.push('/dashboard')
            })
            .catch(err=>{
                setIsSubmitting(false)
                setWarning(true)
                setAlert({msg: err.message, type: 'error'})
                clearWarning()
            })
            
    }
    return (
        <>
            <Head>
                <title>{userData.title} - Iniciar sesión</title>
            </Head>
            <Box 
                bg="white"
                boxShadow="base"
                rounded="md"
                border="1px"
                borderColor="gray.300"
                m="auto" 
                mt={20}
                p={4}
                textAlign="center" 
                width="400px" 
                height="auto"
            >   
                <Heading mb={2} size="lg">Inicia sesión</Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={4}>
                        <FormLabel textAlign="center">Email</FormLabel>
                        <Input value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel textAlign="center">Contraseña</FormLabel>
                        <Input value={pass} onChange={(e)=>setPass(e.target.value)} type="password"/>
                    </FormControl>
                    {
                        warning &&
                        <Alert rounded="md" mb={4} status={alert.type}>
                            <AlertIcon/>
                            <AlertDescription>{alert.msg}</AlertDescription>
                        </Alert>
                    }
                    <Button isLoading={isSubmitting} type="submit" mb={2} isFullWidth colorScheme="primary">Ingresar</Button>
                </form>
                <Button onClick={()=>router.push('/')} isFullWidth variant="outline" colorScheme="primary">Volver a la tienda</Button>
                <Alert mt={4} rounded="md" status="info">
                    <AlertIcon/>
                    <AlertDescription>Si quieres probar la demo ingresa el email 'admin@email.com' y la contraseña 'prueba1'</AlertDescription>
                </Alert>
            </Box>
        </>
    )
}

export async function getServerSideProps() {
    let userData
    await firestore.collection('users')
        .doc('userInfo')
        .get()
        .then(doc=> userData = doc.data())
    return {
        props: {
            userData
        }
    }
}
export default login
