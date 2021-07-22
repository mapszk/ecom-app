import { FormControl, FormLabel, Box, Button, Heading, Input, Radio, RadioGroup, HStack, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react"
import { useState } from "react"
import { db } from "../../../util/firebaseClient"
import SubcategoryInput from "./SubcategoryInput"
import uniqid from 'uniqid'

const CategoryForm = ({setCategoriesToShow, categoriesToShow}) => {
    const [hasSub, setHasSub] = useState(null)
    const [catName, setCatName] = useState('')
    const [subcategories, setSubcategories] = useState([])
    const [warning, setWarning] = useState(false)
    const [alert, setAlert] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubs = () => {
        setHasSub(true)
        if(subcategories.length===0){
            setSubcategories(subcategories=> {
                return ([{name:'', id: uniqid()}])
            })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setWarning(false)
        setIsSubmitting(true)

        // validation for empty fields
        if(catName===''){
            setWarning(true)
            setAlert({msg: 'Por favor, rellena todos los campos', type: 'error'})
            setIsSubmitting(false)
            return
        }
        for(let subcategory of subcategories){
            if(subcategory.name===''){
                setWarning(true)
                setAlert({msg: 'Por favor, rellena todos los campos', type: 'error'})
                setIsSubmitting(false)
                return
            }
            for(let child of subcategory.childs){
                if(child.name===''){
                    setWarning(true)
                    setAlert({msg: 'Por favor, rellena todos los campos', type: 'error'})
                    setIsSubmitting(false)
                    return
                }
            }
        }

        // trim all names
        const trimedSubcategories = subcategories.map(subcategory => {
            return ({
                ...subcategory,
                name: subcategory.name.trim(),
            })
        })
        const newCategory = {
            id: uniqid(),
            name: catName.trim(),
            subcategories: trimedSubcategories
        }

        //add to database
        await db.collection('categories')
            .doc(newCategory.id)
            .set(newCategory)
            .then(()=>{
                setWarning(true)
                setAlert({msg: 'Categoria agregada', type: 'success'})
                setIsSubmitting(false)
                setCategoriesToShow(cats=> ([...cats, newCategory]))
                return
            })
            .catch((err)=>{
                console.log(err)
                setWarning(true)
                setAlert({msg: 'Ha ocurrido un error, por favor intenta de nuevo', type: 'error'})
                setIsSubmitting(false)
                return
            })
    }
    return(
        <Box>
            <Heading size="md" mb={4}>Agregar categoría</Heading>
            <form onSubmit={handleSubmit}>
                    <FormControl id="name" mb={2}>
                        <FormLabel>Nombre de la categoría</FormLabel>
                        <Input value={catName} onChange={(e)=>setCatName(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired mb={2}>
                        <FormLabel>Tiene subcategorías?</FormLabel>
                        <RadioGroup defaultValue="false">
                            <HStack spacing={4}>
                                <Radio value="true" onClick={()=>handleSubs()}>Si</Radio>
                                <Radio defaultChecked value="false" onClick={()=>setHasSub(false)}>No</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                    <FormLabel>Subcategorías</FormLabel>
                    {hasSub && subcategories.map((subcategory)=> {
                        return <SubcategoryInput
                            subcategory={subcategory}
                            key={subcategory.id}
                            subcategories={subcategories}
                            setSubcategories={setSubcategories}
                        />
                    })}
                    {
                        warning && 
                        <Alert status={alert.type} rounded="md" mt={4}>
                            <AlertIcon />
                            <AlertDescription mr={2}>{alert.msg}</AlertDescription>
                        </Alert>
                    }
                    {
                        <Alert status="info" rounded="md" mt={4}>
                            <AlertIcon />
                            <AlertDescription mr={2}>No puedes agregar más de 5 categorías</AlertDescription>
                        </Alert>
                    }
                    <Button disabled={categoriesToShow.length>=5} loadingText="Enviando" isLoading={isSubmitting} type="submit" colorScheme="primary" isFullWidth mt={4}>Agregar</Button>
            </form>
        </Box>
    )
}

export default CategoryForm
