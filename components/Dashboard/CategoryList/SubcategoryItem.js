import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Flex, HStack, Spacer } from '@chakra-ui/layout'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Input, Text } from '@chakra-ui/react'
import { useRef, useState } from "react"
import { capitalize } from '../../../util/capitalize'
import { db } from '../../../util/firebaseClient'
import { useRouter } from 'next/dist/client/router'

const SubcategoryItem = ({subcategory, setAlert, setWarning, clearWarning, oldCategory}) => {
    const { name } = subcategory
    const cancelRef = useRef()
    const [modal, setModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(capitalize(name))
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [edited, setEdited] = useState(false)
    const router = useRouter()

    const editSubcategory = async () => {
        if(editValue==='') return
        setIsSubmitting(true)
        const newSubcategories = oldCategory.subcategories.map(sub=> sub.id === subcategory.id ? ({...sub, name: editValue.trim()}) : sub)
        await db.collection('categories')
            .doc(oldCategory.id)
            .update({
                ...oldCategory,
                subcategories: newSubcategories
            })
            .then(()=>{
                setWarning(true)
                setAlert({msg: 'Subcategoría editada', type: 'success'})
                clearWarning()
                setIsEditing(false)
                setEdited(true)
                setIsSubmitting(false)
                return
            })
            .catch(()=>{
                setWarning(true)
                setAlert({msg: 'Ha ocurrido un error, por favor intenta de nuevo', type: 'error'})
                clearWarning()
                setIsSubmitting(false)
                return
            })
    }
    const deleteSubcategory = async () => {
        setIsSubmitting(false)
        await db.collection('categories')
            .doc(oldCategory.id)
            .update({
                ...oldCategory,
                subcategories: oldCategory.subcategories.filter(sub=> sub.id !== subcategory.id)
            })
            .then(()=>{
                setIsSubmitting(false)
                setModal(false)
                setAlert({msg: 'Subcategoría borrada', type: 'success'})
                setWarning(true)
                clearWarning()
                router.reload()
                return
            })
            .catch(()=>{
                setIsSubmitting(false)
                setModal(false)
                setAlert({msg: 'Ha ocurrido un error, por favor intente de nuevo', type: 'success'})
                setWarning(true)
                clearWarning()
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
                            Borrar subcategoría
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Estás seguro/a que quieres borrar la subcategoría?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button isLoading={isSubmitting} ref={cancelRef} onClick={()=>setModal(false)}>
                                Cancelar
                            </Button>
                            <Button isLoading={isSubmitting} ml={4} colorScheme="red" onClick={deleteSubcategory}>
                                Borrar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <HStack 
                p={2}
                ml={8} 
                mt={1}
                rounded="md"
                _hover={{bg: "gray.100"}}
            >
                <Flex align="center" flexDirection="row" width="full">
                    {
                        !isEditing ? <Text>{edited ? capitalize(editValue) : capitalize(name)}</Text> :
                        oldCategory.subcategories.length>=10 && <HStack width="full" mr={2}>
                            <Input
                                size="sm"
                                variant="flushed"
                                value={editValue}
                                onChange={(e)=>setEditValue(e.target.value)}
                            />
                            <Button isLoading={isSubmitting} onClick={()=>{
                                setEdited(true)
                                editSubcategory()
                            }} size="sm">
                                <CheckIcon/>
                            </Button>
                            <Button isLoading={isSubmitting} onClick={()=>setIsEditing(false)} size="sm">
                                <CloseIcon/>
                            </Button>
                        </HStack>
                    }
                    <Spacer/>
                    <Button onClick={()=>setIsEditing(true)} size="sm" colorScheme="primary">
                        <EditIcon/>
                    </Button>
                    <Button onClick={()=>setModal(true)} size="sm" ml={2} colorScheme="red">
                        <DeleteIcon/>
                    </Button>
                </Flex>
            </HStack>
        </>
    )
}

export default SubcategoryItem
