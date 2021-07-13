import { AddIcon, CloseIcon } from "@chakra-ui/icons"
import { Box, Button, FormLabel, HStack, Input, InputGroup } from "@chakra-ui/react"
import uniqid from 'uniqid'

const ChildInput = ({setSubcategories, subcategory, child, childs}) => {
    const handleChildInput = (e, subcategory, child) => {
        setSubcategories(subcategories=>{
            const newChilds = subcategory.childs.map(oldChild=> oldChild.id===child.id? ({...child, name: e.target.value}) : ({...oldChild}))
            return subcategories.map(sub=> sub.id===subcategory.id ? ({...sub, childs: newChilds}) : ({...sub}))
        })
    }
    const deleteChild = (subcategory, child) => {
        const newChilds = subcategory.childs.filter(oldChild=> oldChild.id!==child.id)
        setSubcategories(subcategories=>{
            return subcategories.map(sub=> sub.id===subcategory.id ? ({...sub, childs: newChilds}) : ({...sub}))
        })
    }
    const addChild = (subcategory) => {
        if(childs.length===5) return
        setSubcategories(subcategories=>{
            const oldChilds = subcategory.childs
            return subcategories.map(sub=> sub.id===subcategory.id ? ({...sub, childs: [...oldChilds, {name: '', id: uniqid()}]}) : ({...sub}))
        })
    }
    return(
        <Box pl={20}>
            <InputGroup>
                <Input 
                    value={child.name} 
                    onChange={(e)=> handleChildInput(e, subcategory, child)} 
                />
                <HStack>
                    <Button 
                        variant="outline"
                        colorScheme="red"
                        ml={2}
                        onClick={()=> deleteChild(subcategory, child)}
                    >
                        <CloseIcon/>
                    </Button>
                    <Button 
                        isDisabled={childs.length===5}
                        colorScheme="teal" 
                        variant="outline" 
                        ml={2}
                        onClick={()=> addChild(subcategory, child)}
                    >
                        <AddIcon/>
                    </Button>
                </HStack>
            </InputGroup>
        </Box>
    )
}

export default ChildInput
