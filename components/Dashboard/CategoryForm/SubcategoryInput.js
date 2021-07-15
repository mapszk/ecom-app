import { AddIcon, ArrowDownIcon, CloseIcon } from "@chakra-ui/icons"
import { Button, FormControl, FormLabel, HStack, Input, InputGroup, Stack } from "@chakra-ui/react"
import ChildInput from "./ChildInput"
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
    const addChildOnCategory = (subcategory) => {
        if(subcategory.childs.length===0) setSubcategories(subcategories=>{
            return subcategories.map(sub=> sub.id===subcategory.id ? ({...sub, childs: [{name: '', id: uniqid()}]}) : ({...sub}))
        })
        else return
    }
    const addSubcategory = () => {
        if(subcategories.length===10) return
        setSubcategories(subcategories=>{
            return ([...subcategories, {name:'', id: uniqid(), childs: []}])
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
                            <Button 
                                colorScheme="yellow" 
                                isDisabled={Boolean(subcategory.childs.length)}
                                onClick={()=> addChildOnCategory(subcategory)}
                            >
                                <ArrowDownIcon w={5} h={5} />
                            </Button>
                        </HStack>
                    </HStack>
                    {subcategory.childs.length>0 && <FormLabel pl={20}>Hijos</FormLabel>}
                    {subcategory.childs.map((child)=>{
                        return <ChildInput
                            key={child.id}
                            child={child}
                            childs={subcategory.childs}
                            subcategory={subcategory}
                            setSubcategories={setSubcategories}
                        />
                    })}
                </Stack>
            </InputGroup>
        </FormControl>
    )
}

export default SubcategoryInput
