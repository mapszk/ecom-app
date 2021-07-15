import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, HStack, Input, Spacer, Text } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import { useRef, useState } from "react"
import { db } from "../../../util/firebase"
import { capitalize } from '../../../util/capitalize'

const ChildItem = ({child, clearWarning, setAlert, setWarning, oldCategory, oldSubcategory}) => {
    const cancelRef = useRef()
    const childRef = useRef()
    const [modal, setModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(capitalize(child.name))
    const [edited, setEdited] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const editChild = async () => {
        if(editValue==='') return
        setIsSubmitting(true)
        for(let subcategory of oldCategory.subcategories){
            for(let oldChild of subcategory.childs){
                if(oldChild.id===child.id) child.name = editValue.trim()
            }
        }
        await db.collection('categories')
            .doc(oldCategory.id)
            .update(oldCategory)
            .then(()=>{
                setWarning(true)
                setAlert({msg: 'Hijo editado', type: 'success'})
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
    const deleteChild = async () => {
        setIsSubmitting(true)
        const newSubcategories = oldCategory.subcategories.map(sub=>sub.id===oldSubcategory.id? ({...sub, childs: sub.childs.filter(ch=>ch.id!==child.id)}) : sub)
        console.log(newSubcategories)
        console.log(oldCategory.subcategories)
        const newCat = {
            ...oldCategory,
            subcategories: newSubcategories
        }
        console.log(newCat)
        await db.collection('categories')
            .doc(oldCategory.id)
            .update(newCat)
            .then(()=>{
                childRef.current.remove()
                setIsSubmitting(false)
                setModal(false)
                setAlert({msg: 'Hijo borrado', type: 'success'})
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
                                Borrar hijo
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                Estás seguro/a que quieres borrar el hijo?
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button isLoading={isSubmitting} ref={cancelRef} onClick={()=>setModal(false)}>
                                    Cancelar
                                </Button>
                                <Button isLoading={isSubmitting} ml={4} colorScheme="red" onClick={deleteChild}>
                                    Borrar
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            <HStack 
                ref={childRef}
                p={2}
                pl={4}
                ml={20} 
                mt={1}
                rounded="md"
                _hover={{bg: "gray.100"}}
            >
                <Flex align="center" flexDirection="row" width="full">
                    {
                        !isEditing ? <Text>{edited ? capitalize(editValue) : capitalize(child.name)}</Text> :
                        <HStack width="full" mr={2}>
                            <Input
                                size="sm"
                                variant="flushed"
                                value={editValue}
                                onChange={(e)=>setEditValue(e.target.value)}
                            />
                            <Button isLoading={isSubmitting} onClick={()=>{
                                setEdited(true)
                                editChild()
                            }} size="sm">
                                <CheckIcon/>
                            </Button>
                            <Button isLoading={isSubmitting} onClick={()=>setIsEditing(false)} size="sm">
                                <CloseIcon/>
                            </Button>
                        </HStack>
                    }
                    <Spacer/>
                    <Button onClick={()=>setIsEditing(true)} variant="outline" size="sm" colorScheme="primary">
                        <EditIcon/>
                    </Button>
                    <Button onClick={()=>setModal(true)} variant="outline" size="sm" ml={2} colorScheme="red">
                        <DeleteIcon/>
                    </Button>
                </Flex>
            </HStack>
        </>
    )
}

export default ChildItem
