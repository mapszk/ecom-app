import { Alert, AlertDescription, AlertIcon, Box, Button, FormControl, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Textarea } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { db, storage } from "../../../util/firebaseClient"
import uniqid from 'uniqid'
import { useRouter } from "next/dist/client/router"

const fileRegex = /^.*\.(jpg|JPG|jpeg|png)$/

const ProductForm = ({categories, setProductsToShow}) => {
    const file = useRef()
    let subcategories = []
    for(let category of categories){
        for(let subs of category.subcategories){
            subcategories.push(subs)
        }
    }
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [warning, setWarning] = useState(false)
    const [alert, setAlert] = useState({})
    const [price, setPrice] = useState(0)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [shortDesc, setShortDesc] = useState('')
    const [selectedCat, setSelectedCat] = useState(null)
    const [selectedSubCat, setSelectedSubCat] = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()
        setWarning(false)
        setAlert({})
        setIsSubmitting(true)
        //validation
        if(title==='' || selectedCat===null || price===0 || desc==='' || shortDesc===''){
            setIsSubmitting(false)
            setWarning(true)
            setAlert({msg: 'Por favor, rellena todos los campos', type:'error'})
            return
        }
        if(file.current.files.length>0){
            if(!fileRegex.test(file.current.files[0].name)){
                setIsSubmitting(false)
                setWarning(true)
                setAlert({msg: 'Solo se permiten imágenes en formato jpg, jpeg, o png', type:'error'})
                return
            }
        }
        //
        const newProduct = {
            id: uniqid(),
            name: title,
            desc,
            shortDesc,
            date: Date.now(),
            price: Number(price),
            imageURL: null,
            category: selectedCat,
            subcategory: selectedSubCat || null,
        }
        if(file.current.files.length>0){
            await storage.ref().child('products/'+ newProduct.id)
                .put(file.current.files[0], file.current.files[0].type)
                .then(async ()=>{
                    await storage.ref().child('products/'+ newProduct.id)
                        .getDownloadURL()
                        .then(url=>{
                            newProduct.imageURL = url
                        })
                })
        }
        await db.collection('products')
            .doc(newProduct.id)
            .set(newProduct)
            .then(()=>{
                setIsSubmitting(false)
                setWarning(true)
                setAlert({msg: 'Producto agregado', type: 'success'})
                setProductsToShow(prods=> ([...prods, newProduct]))
            })
    }
    return (
        <Box>
            <Heading size="md" mb={4}>Agregar un producto</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={2}>
                    <FormLabel>Titulo del producto</FormLabel>
                    <Input value={title} onChange={(e)=>setTitle(e.target.value)} />
                </FormControl>
                <FormControl mb={2}>
                    <FormLabel>
                        <Stack>
                            <FormLabel>Categoría</FormLabel>
                            <Select defaultValue="default" onChange={(e)=>setSelectedCat(e.target.value)}>
                                <option value='default' disabled>Selecciona una categoría</option>
                                {categories.map(cat=> <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                            </Select>
                            <FormLabel>Subcategoría <small>(opcional)</small></FormLabel>
                            <Select defaultValue="default" onChange={(e)=>setSelectedSubCat(e.target.value)}>
                                <option value="default" disabled>Selecciona una subcategoría</option>
                                <option value={false}>Ninguna</option>
                                {selectedCat && 
                                categories.filter(cat=> cat.name===selectedCat)[0].subcategories.map(sub=> <option key={sub.id} value={sub.name}>{sub.name}</option>)}
                            </Select>
                        </Stack>
                    </FormLabel>
                </FormControl>
                <FormControl mb={2}>
                    <FormLabel>Descripción corta</FormLabel>
                    <Textarea value={desc} onChange={e=>setDesc(e.target.value)} maxLength={90} resize="none"></Textarea>
                </FormControl>
                <FormControl mb={2}>
                    <FormLabel>Descripción detallada</FormLabel>
                    <Textarea value={shortDesc} onChange={e=>setShortDesc(e.target.value)} maxLength={90} resize="vertical"></Textarea>
                </FormControl>
                <FormControl mb={2}>
                    <FormLabel>Imágenes</FormLabel>
                    <Input ref={file} accept='.png,.jpeg,.jpg' type="file" variant="flushed"/>
                </FormControl>
                <FormControl mb={2}>
                    <FormLabel>Precio (ARS)</FormLabel>
                    <NumberInput>
                        <NumberInputField value={price} onChange={e=>setPrice(e.target.value)}/>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                {
                    warning &&
                    <Alert rounded="md" mt={4} status={alert.type}>
                        <AlertIcon/>
                        <AlertDescription>{alert.msg}</AlertDescription>
                    </Alert>
                }
                <Button isLoading={isSubmitting} loadingText="Enviando" type="submit" colorScheme="primary" isFullWidth mt={4}>Agregar</Button>
            </form>
        </Box>
    )
}

export default ProductForm
