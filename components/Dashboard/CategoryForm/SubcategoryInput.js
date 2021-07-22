import { AddIcon, CloseIcon } from "@chakra-ui/icons"
import { Button, FormControl, HStack, Input, InputGroup, Stack } from "@chakra-ui/react"
import uniqid from 'uniqid'

const SubcategoryInput = ({setSubcategories, subcategory, subcategories}) => {
    const handleSubcategoryInput = (e, subcategory) => {
        setSubcategories(subcategories=>{
            return subcategories.map(sub=> sub.id===subcategory.id ? ({...sub, name: e.target.value}) : ({...sub}))
        })
    }
    const deleteSubcategory = (subcategory) => {
        setSubcategories(subcategories=>{
            return subcategories.filter(sub=> sub.id!==subcategory.id)
        })
    }
    const addSubcategory = () => {
        if(subcategories.length===10) return
        setSubcategories(subcategories=>{
            return ([...subcategories, {name:'', id: uniqid()}])
        })
    }
    return (
        <FormControl mb={2}>
            <InputGroup>
                <Stack width="full">
                    <HStack>
                        <Input 
                            value={subcategory.name} 
                            onChange={(e)=> handleSubcategoryInput(e, subcategory)}
                        />
                        <HStack>
                            <Button
                                colorScheme="red" 
                                onClick={()=> deleteSubcategory(subcategory)}
                            >
                                <CloseIcon/>
                            </Button>
                            <Button 
                                colorScheme="primary" 
                                isDisabled={subcategories.length===10}
                                onClick={()=> addSubcategory()}
                            >
                                <AddIcon/>
                            </Button>
                        </HStack>
                    </HStack>
                </Stack>
            </InputGroup>
        </FormControl>
    )
}

export default SubcategoryInput
