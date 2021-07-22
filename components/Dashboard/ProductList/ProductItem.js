import { ChevronDownIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, HStack, Link, Spacer, Stack, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import { useRef, useState } from "react"
import { db, storage } from "../../../util/firebaseClient"
import { formatPrice } from '../../../util/formatPrice'

const ProductItem = ({product, setAlert, setWarning, clearWarning}) => {
    const [modal, setModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const cancelRef = useRef()
    const [showInfo, setShowInfo] = useState(false)
    const router = useRouter()
    const deleteProduct = async () => {
        setIsSubmitting(true)
        if(product.imageURL){
            await storage.ref().child('products/'+ product.id)
            .delete()
            .catch(()=>{
                setIsSubmitting(false)
                setWarning(true)
                setAlert({msg: 'Ha ocurrido un error, por favor intente de nuevo', type: 'error'})
                clearWarning()
                setModal(false)
                return
            })
        }
        await db.collection('products')
            .doc(product.id)
            .delete()
            .then(()=>{
                setIsSubmitting(false)
                setWarning(true)
                setAlert({msg: 'Producto borrado', type: 'success'})
                clearWarning()
                setModal(false)
                router.reload()
                return
            })
            .catch(()=>{
                setIsSubmitting(false)
                setWarning(true)
                setAlert({msg: 'Ha ocurrido un error, por favor intente de nuevo', type: 'error'})
                clearWarning()
                setModal(false)
                return
            })
    }
    return (
        <>
            <AlertDialog
                    isOpen={modal}
                    leastDestructiveRef={cancelRef}
                    onClose={()=>setModal(false)}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                Borrar producto
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                Estás seguro/a que quieres borrar el producto?
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button isLoading={isSubmitting} ref={cancelRef} onClick={()=>setModal(false)}>
                                    Cancelar
                                </Button>
                                <Button isLoading={isSubmitting} ml={4} colorScheme="red" onClick={deleteProduct}>
                                    Borrar
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            <Box>
                <HStack p={2} rounded="md" _hover={{bg: 'gray.100'}}>
                    <ChevronDownIcon onClick={()=>setShowInfo(!showInfo)} cursor="pointer" w={6} h={6}/>
                    <Flex width="full" alignItems="center">
                        <Text>{product.name}</Text>
                        <Spacer/>
                        <Button onClick={()=>setModal(true)} size="sm" colorScheme="red">
                            <DeleteIcon/>
                        </Button>
                    </Flex>
                </HStack>
                {
                    showInfo &&
                    <Stack p={2} px={4} _hover={{bg: 'gray.100'}} rounded="md" justifyContent="start" width="full">
                        <Text>Categoría: {product.category}</Text>
                        <Text>Precio: {formatPrice(product.price)}</Text>
                        <Text>Subcategoría: {product.subcategory || 'ninguna'}</Text>
                        <Text>Hijo: {product.child || 'ninguno'}</Text>
                        {product.imageURL?<Link href={product.imageURL} isExternal>Imagen <ExternalLinkIcon/></Link>:<Text>No tiene imagen</Text>}
                    </Stack>
                }
            </Box>
        </>
    )
}

export default ProductItem
