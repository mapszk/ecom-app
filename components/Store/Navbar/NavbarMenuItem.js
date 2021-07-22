import { ChevronDownIcon } from "@chakra-ui/icons"
import { Box, Button, HStack, Link, Stack } from "@chakra-ui/react"
import { useState } from "react"

const NavbarMenuItem = ({category}) => {
    const [showSubs, setShowSubs] = useState(false)
    return (
        <Box w="full">
            <Link 
                fontSize="xl"
                href={`/category/${category.name}`} 
                fontWeight="semibold" 
                color="primary.500"
            >
                {category.name}
            </Link>
            {category.subcategories.length>0 &&
            <Button ml={4} size="sm" onClick={()=>setShowSubs(!showSubs)} variant="outline" colorScheme="primary" p={1}>
                <ChevronDownIcon w={5} h={5} />
            </Button>}
            {showSubs &&
            <Stack spacing={4} mt={4}>
                {category.subcategories.map(sub=>{
                    return <Link 
                        display="block"
                        fontWeight="semibold"
                        href={`/category/${category.name}/${sub.name}`}
                    >
                        {sub.name}
                    </Link>
                })}
            </Stack>
            }
        </Box>
    )
}

export default NavbarMenuItem
