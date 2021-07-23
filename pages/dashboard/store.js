import { Alert, AlertDescription, AlertIcon, Box, Button, FormControl, FormLabel, Heading, HStack, Input, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Spacer, Text, Textarea, VStack } from "@chakra-ui/react"
import DashHeader from "../../components/Dashboard/DashHeader"
import { SwatchesPicker } from "react-color"
import { useRef, useState } from "react"
import Container from "../../components/Container"
import { adminAuth, firestore } from "../../util/firebaseServer"
import { db, storage } from "../../util/firebaseClient"
import Head from "next/head"
import nookies from 'nookies'
import DashInfo from "../../components/Dashboard/DashInfo"

const fileRegex = /^.*\.(jpg|JPG|jpeg|png)$/

const Store = ({userData}) => {
    const { colors } = userData
    const logoRef = useRef()
    const welcomeRef = useRef()
    const [title, setTitle] = useState('')
    const [welcome, setWelcome] = useState('')
    const [primary, setPrimary] = useState(userData.colors.primary)
    const [secondary, setSecondary] = useState(userData.colors.secondary)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [warning, setWarning] = useState(false)
    const [alert, setAlert] = useState({})
    const clearWarning = () => {
        setInterval(()=>{
            setAlert({})
            setWarning(false)
        }, 4000)
    }
    const submit = async () => {
        //update title
        if(title!==''){
            setIsSubmitting(true)
            await db.collection('users')
                .doc('userInfo')
                .update({
                    title
                })
                .then(()=>{
                    setIsSubmitting(false)
                    setAlert({msg: 'Cambios guardados', type: 'success'})
                    setWarning(true)
                    clearWarning()
                })
                .catch(()=>{
                    setIsSubmitting(false)
                    setAlert({msg: 'Ha ocurrido un error por favor intenta de nuevo', type: 'error'})
                    setWarning(true)
                    clearWarning()
                })
        }
        //update colors
        if(colors.primary && colors.secondary){
            setIsSubmitting(true)
            await db.collection('users')
                .doc('userInfo')
                .update({
                    colors: {
                        primary,
                        secondary
                    }
                })
                .then(()=>{
                    setIsSubmitting(false)
                    setAlert({msg: 'Cambios guardados', type: 'success'})
                    setWarning(true)
                    clearWarning()
                })
                .catch(()=>{
                    setIsSubmitting(false)
                    setAlert({msg: 'Ha ocurrido un error por favor intenta de nuevo', type: 'error'})
                    setWarning(true)
                    clearWarning()
                })
        }
        //update welcome text
        if(welcome!==''){
            setIsSubmitting(true)
            await db.collection('users')
                .doc('userInfo')
                .update({
                    welcome
                })
                .then(()=>{
                    setIsSubmitting(false)
                    setAlert({msg: 'Cambios guardados', type: 'success'})
                    setWarning(true)
                    clearWarning()
                })
                .catch(()=>{
                    setIsSubmitting(false)
                    setAlert({msg: 'Ha ocurrido un error por favor intenta de nuevo', type: 'error'})
                    setWarning(true)
                    clearWarning()
                })
        }
        //update welcome image
        if(welcomeRef.current.files.length!==0){
            if(!fileRegex.test(welcomeRef.current.files[0].name)){
                setIsSubmitting(false)
                setWarning(true)
                setAlert({msg: 'Solo se permiten imágenes en formato jpg, jpeg, o png', type:'error'})
                return
            }
            await storage.ref().child('/userInfo/'+ 'welcomeImg')
                .put(welcomeRef.current.files[0], welcomeRef.current.files[0].type)
                .then(async ()=>{
                    await storage.ref().child('/userInfo/'+ 'welcomeImg')
                        .getDownloadURL()
                        .then(async url=>{
                            await db.collection('users')
                                .doc('userInfo')
                                .update({
                                    welcomeImgUrl: url
                                })
                                .then(()=>{
                                    setIsSubmitting(false)
                                    setAlert({msg: 'Cambios guardados', type: 'success'})
                                    setWarning(true)
                                    clearWarning()
                                })
                                .catch(()=>{
                                    setIsSubmitting(false)
                                    setAlert({msg: 'Ha ocurrido un error por favor intenta de nuevo', type: 'error'})
                                    setWarning(true)
                                    clearWarning()
                                })
                        })
                })
        }
        //update logo
        if(logoRef.current.files.length>0){
            if(!fileRegex.test(logoRef.current.files[0].name)){
                setIsSubmitting(false)
                setWarning(true)
                setAlert({msg: 'Solo se permiten imágenes en formato jpg, jpeg, o png', type:'error'})
                return
            }
            await storage.ref().child('/userInfo/'+ 'logo')
                .put(logoRef.current.files[0], logoRef.current.files[0].type)
                .then(async ()=>{
                    await storage.ref().child('/userInfo/'+ 'logo')
                        .getDownloadURL()
                        .then(async url=>{
                            await db.collection('users')
                                .doc('userInfo')
                                .update({
                                    logoImgUrl: url
                                })
                                .then(()=>{
                                    setIsSubmitting(false)
                                    setAlert({msg: 'Cambios guardados', type: 'success'})
                                    setWarning(true)
                                    clearWarning()
                                })
                                .catch(()=>{
                                    setIsSubmitting(false)
                                    setAlert({msg: 'Ha ocurrido un error por favor intenta de nuevo', type: 'error'})
                                    setWarning(true)
                                    clearWarning()
                                })
                        })
                })
        }
    }
    return (
        <>
            <Head>
                <title>{userData.title} - Panel de control: Tienda</title>
            </Head>
            <Container>
                <DashHeader/>
                <Box
                    my={4}
                    boxShadow="base"
                    rounded="xl"
                    bgColor="white"
                    border="1px"
                    borderColor="primary.500"
                    p={4}
                >
                    <DashInfo link='/dashboard'/>
                    <FormControl>
                        <FormLabel>Nombre de tu tienda</FormLabel>
                        <Input value={title} onChange={e=>setTitle(e.target.value)} />
                    </FormControl>
                    <FormControl mt={2}>
                        <FormLabel>Elige dos colores para tu tienda</FormLabel>
                        <HStack spacing={6}>
                            <VStack>
                                <Popover placement="right">
                                    <PopoverTrigger>
                                        <Box
                                            _hover={{bg: primary}}
                                            as={Button}
                                            width="50px"
                                            height="50px"
                                            rounded="full"
                                            bg={primary}
                                            boxShadow="base"
                                        ></Box>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverBody>
                                            <SwatchesPicker width="100%" color={primary} onChangeComplete={color=>setPrimary(color.hex)}/>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                                <Text size="sm">Primario</Text>
                            </VStack>
                            <VStack>
                                <Popover placement="right">
                                    <PopoverTrigger>
                                        <Box
                                            _hover={{bg: secondary}}
                                            as={Button}
                                            width="50px"
                                            height="50px"
                                            rounded="full"
                                            bg={secondary}
                                            boxShadow="base"
                                        ></Box>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverBody>
                                            <SwatchesPicker width="100%" color={secondary} onChangeComplete={color=>setSecondary(color.hex)}/>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                                <Text size="sm">Secundario</Text>
                            </VStack>
                        </HStack>
                    </FormControl>
                    <FormControl mt={2}>
                        <FormLabel>Logo de tu tienda</FormLabel>
                        <Input ref={logoRef} accept='.png,.jpeg,.jpg' type="file" variant="flushed" size="sm"/>
                    </FormControl>
                    <FormControl mt={2}>
                        <FormLabel>Imagen de bienvenida</FormLabel>
                        <Input ref={welcomeRef} accept='.png,.jpeg,.jpg' type="file" variant="flushed" size="sm"/>
                    </FormControl>
                    <FormControl mt={2}>
                        <FormLabel>Mensaje de bienvenida</FormLabel>
                        <Textarea value={welcome} onChange={e=>setWelcome(e.target.value)} resize="none" maxLength="60"></Textarea>
                    </FormControl>
                    <Spacer/>
                    {warning &&
                    <Alert my={2} rounded="md" status={alert.type}>
                        <AlertIcon/>
                        <AlertDescription>{alert.msg}</AlertDescription>
                    </Alert>
                    }
                    <Button
                        mt={4}
                        variant="solid"
                        alignSelf="flex-start" 
                        colorScheme="primary"
                        onClick={submit}
                        isLoading={isSubmitting}
                    >
                        Guardar
                    </Button>
                </Box>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx) {
    try{
        const cookies = nookies.get(ctx)
        const token = await adminAuth.verifyIdToken(cookies.token)
        let userData 
        await firestore.collection('users')
            .doc('userInfo')
            .get()
            .then((doc)=> userData = doc.data())
        return { 
            props: {
                userData
            }
        }
    }catch(err){
        ctx.res.writeHead(302, {Location: '/login'})
        ctx.res.end()
        return { props: {}}
    }
}

export default Store
