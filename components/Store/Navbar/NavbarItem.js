import { Box, Link, LinkBox, LinkOverlay } from "@chakra-ui/react"
import { useState } from "react"

const NavbarItem = ({category}) => {
    const { name, subcategories } = category
    const [hover, setHover] = useState(false)
    if(subcategories.length===0) return(
        <Link
            href={`/category/${name}`}
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            _hover={{bg: 'primary.600'}}
            fontWeight="semibold"
            h="full"
            px={4}
        >
            {name}
        </Link>
    )
    return (
        <LinkBox h="full">
            <LinkOverlay h="full" href={`/category/${name}`}>
                <Box
                    onMouseEnter={()=>setHover(true)}
                    onMouseLeave={()=>setHover(false)}
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    cursor="pointer"
                    _hover={{bg: 'primary.600'}}
                    fontWeight="semibold"
                    h="full"
                    px={4}
                >
                    {name}
                    {hover &&
                    <Box
                        zIndex={10}
                        onMouseEnter={()=>setHover(true)}
                        onMouseLeave={()=>setHover(false)}
                        position="absolute"
                        top="100%"
                        roundedBottom="md"
                        left="0"
                        w="200px"
                        bg="white"
                        color="primary.500"
                        boxShadow="lg"
                    >
                        {subcategories.map(sub=>{
                            return <Link 
                                display="block"
                                cursor="pointer"
                                href={`/category/${category.name}/${sub.name}`}
                                //onClick={()=>router.push(`/category/${category.name}/${sub.name}`)}
                                onMouseEnter={()=>setHover(true)}
                                onMouseLeave={()=>setHover(false)}
                                w="full"
                                key={sub.id}
                                _hover={{bg: "primary.500", color: "white"}}
                                p={4}
                                py={2}
                                rounded="md"
                            >
                                {sub.name}
                            </Link>
                        })}
                    </Box>
                    }
                </Box>
            </LinkOverlay>
        </LinkBox>
    )
}

export default NavbarItem
