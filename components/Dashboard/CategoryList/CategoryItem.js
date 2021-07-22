import { Button, Flex, Spacer, Text, Box, HStack, Input, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react"
import { AddIcon, CheckIcon, ChevronDownIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useRef, useState } from "react"
import uniqid from 'uniqid'
import SubcategoryItem from "./SubcategoryItem"
import { capitalize } from "../../../util/capitalize"
import { db } from "../../../util/firebaseClient"
import { useRouter } from "next/dist/client/router"

const CategoryItem = ({category, setAlert, setWarning, clearWarning, setCategoriesToShow, categoriesToShow}) => {
    const { name, subcategories } = category
    const [modal, setModal] = useState(false)
    const cancelRef = useRef()
    const [isEditing, setIsEditing] = useState(false)
    const [showSubcategories, setShowSubcategories] = useState(false)
    const [editValue, setEditValue] = useState(capitalize(name))
    const [newSubValue, setNewSubValue] = useState('')
    const [edited, setEdited] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const editCategory = async () => {
        if(editValue==='') return
        setIsSubmitting(true)
        await db.collection('categories')
            .doc(category.id)
            .update({
                name: editValue.trim()
            })
            .then(()=>{
                setWarning(true)
                setAlert({msg: 'Categoria editada', type: 'success'})
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
    const addSubcategory = async () => {
        if(newSubValue==='') return
        setIsSubmitting(true)
        const newSubcategory = {
            id: uniqid(),
            name: newSubValue.trim(),
        }
        await db.collection('categories')
            .doc(category.id)
            .update({
                ...category,
                subcategories: [
                    ...category.subcategories,
                    newSubcategory
                ]
            })
            .then(()=>{
                setWarning(true)
                setAlert({msg: 'Subcategoría creada', type: 'success'})
                clearWarning()
                setIsEditing(false)
                setEdited(true)
                setIsSubmitting(false)
                setNewSubValue('')
                const newCategory = {
                    name: category.name,
                    id: category.id,
                    subcategories: [...category.subcategories, newSubcategory]
                }
                const newCategories = categoriesToShow.filter(cat=> cat.id!==category.id)
                newCategories.push(newCategory)
                console.log(newCategories)
                setCategoriesToShow(newCategories)  
            })
            .catch(()=>{
                setWarning(true)
                setAlert({msg: 'Ha ocurrido un error, por favor intenta de nuevo', type: 'error'})
                clearWarning()
                setIsSubmitting(false)
                return
            })
    }
    const deleteCategory = async () => {
        setIsSubmitting(true)
        await db.collection('categories')
            .doc(category.id)
            .delete()
            .then(()=>{
                setIsSubmitting(false)
                setModal(false)
                setAlert({msg: 'Categoría borrada', type: 'success'})
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
    return(
        <>
            <AlertDialog
                isOpen={modal}
                leastDestructiveRef={cancelRef}
                onClose={()=>setModal(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            Borrar categoría
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Estás seguro/a que quieres borrar la categoría?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button isLoading={isSubmitting} ref={cancelRef} onClick={()=>setModal(false)}>
                                Cancelar
                            </Button>
                            <Button isLoading={isSubmitting} ml={4} colorScheme="red" onClick={deleteCategory}>
                                Borrar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Box>
                <HStack
                    rounded="md"
                    p={2}
                    _hover={{bg: "gray.100"}}
                >
                    <ChevronDownIcon cursor="pointer" w={6} h={6} onClick={()=>setShowSubcategories(!showSubcategories)}/>
                    <Flex align="center" flexDirection="row" width="full">
                        {
                            !isEditing ? <Text>{edited ? capitalize(editValue) : capitalize(name)}</Text> :
                            <HStack width="full" mr={2}>
                                <Input
                                    size="sm"
                                    variant="flushed"
                                    value={editValue}
                                    onChange={(e)=> setEditValue(e.target.value)}
                                />
                                <Button isLoading={isSubmitting} onClick={()=>{
                                    setEdited(true)
                                    editCategory()
                                }} size="sm">
                                    <CheckIcon/>
                                </Button>
                                <Button isLoading={isSubmitting} onClick={()=>setIsEditing(false)} size="sm">
                                    <CloseIcon/>
                                </Button>
                            </HStack>
                        }
                        <Spacer/>
                        <Button isDisabled={isEditing} size="sm" colorScheme="primary" onClick={()=>setIsEditing(true)}>
                            <EditIcon/>
                        </Button>
                        <Button onClick={()=>setModal(true)} size="sm" ml={2} colorScheme="red">
                            <DeleteIcon/>
                        </Button>
                    </Flex>
                </HStack>
                {
                    showSubcategories && subcategories.length<10 && 
                    <HStack p={2} ml={8}>   
                        <Input variant="filled" value={newSubValue} onChange={e=>setNewSubValue(e.target.value)} size="sm"/>
                        <Button isLoading={isSubmitting} onClick={addSubcategory} colorScheme="primary" size="sm">
                            <AddIcon/>
                        </Button>
                    </HStack>
                }
                {
                    showSubcategories && subcategories.map((subcategory)=> 
                    <SubcategoryItem 
                        key={subcategory.id} 
                        oldCategory={category}
                        subcategory={subcategory}
                        setWarning={setWarning}
                        setAlert={setAlert}
                        clearWarning={clearWarning}
                    />)
                }
            </Box>
        </>
    )
}

export default CategoryItem
