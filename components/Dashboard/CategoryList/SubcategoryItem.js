import { AddIcon, CheckIcon, ChevronDownIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Flex, HStack, Spacer } from '@chakra-ui/layout'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Input, Text } from '@chakra-ui/react'
import ChildItem from './ChildItem'
import { useRef, useState } from "react"
import uniqid from 'uniqid'
import { capitalize } from '../../../util/capitalize'
import { db } from '../../../util/firebase'
import { useRouter } from 'next/dist/client/router'

const SubcategoryItem = ({subcategory, setAlert, setWarning, clearWarning, oldCategory}) => {
    const { name, childs } = subcategory
    const cancelRef = useRef()
    const subcategoryRef = useRef()
    const [modal, setModal] = useState(false)
    const [showChilds, setShowChilds] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(capitalize(name))
    const [newChildValue, setNewChildValue] = useState('')
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
    const addChild = async () => {
        if(newChildValue==='') return
        setIsSubmitting(true)
        const newSubcategories = oldCategory.subcategories.map(sub=> sub.id===subcategory.id ? ({...sub, childs: [...sub.childs, {id: uniqid(), name: newChildValue.trim()}]}) : sub)
        await db.collection('categories')
            .doc(oldCategory.id)
            .update({
                ...oldCategory,
                subcategories: newSubcategories
            })
            .then(()=>{
                setWarning(true)
                setAlert({msg: 'Hijo creado', type: 'success'})
                clearWarning()
                setIsEditing(false)
                setEdited(true)
                setIsSubmitting(false)
                setNewChildValue('')
                router.reload()
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
                subcategoryRef.current.remove()
                setIsSubmitting(false)
                setModal(false)
                setAlert({msg: 'Subcategoría borrada', type: 'success'})
                setWarning(true)
                clearWarning()
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
                ref={subcategoryRef}
                p={2}
                ml={8} 
                mt={1}
                rounded="md"
                _hover={{bg: "gray.100"}}
            >
                <ChevronDownIcon cursor="pointer" w={6} h={6} onClick={()=>setShowChilds(!showChilds)} />
                <Flex align="center" flexDirection="row" width="full">
                    {
                        !isEditing ? <Text>{edited ? capitalize(editValue) : capitalize(name)}</Text> :
                        <HStack width="full" mr={2}>
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
            {
                showChilds && childs.length<5 && 
                <HStack p={2} ml={20}>   
                    <Input variant="filled" value={newChildValue} onChange={e=>setNewChildValue(e.target.value)} size="sm"/>
                    <Button isLoading={isSubmitting} onClick={addChild} colorScheme="primary" size="sm">
                        <AddIcon/>
                    </Button>
                </HStack>
            }
            {showChilds && childs.map((child)=> <ChildItem 
                oldCategory={oldCategory} 
                oldSubcategory={subcategory}
                key={child.id} 
                child={child}
                setWarning={setWarning}
                setAlert={setAlert}
                clearWarning={clearWarning}
            />)
            }
        </>
    )
}

export default SubcategoryItem
