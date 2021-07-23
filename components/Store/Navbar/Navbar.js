import { HamburgerIcon } from "@chakra-ui/icons"
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Heading, HStack, Image, Link, LinkBox, LinkOverlay, Spacer, Tag, useDisclosure, useMediaQuery, VStack } from "@chakra-ui/react"
import { useShoppingCart } from '../../../hooks/useShoppingCart'
import NavbarItem from "./NavbarItem"
import { FaShoppingCart } from 'react-icons/fa'
import { useRef, useState } from "react"
import NavbarMenuItem from "./NavbarMenuItem"

const Navbar = ({categories, logo}) => {
    const { shoppingCart } = useShoppingCart()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const buttonRef = useRef()
    const [isLargerThan640] = useMediaQuery('(min-width: 640px)')
    return (
        <Box mb={4} bg="primary.500" height="60px">
            <Box height="full" width="95%" maxW="1024px" mx="auto">
                <Flex
                    height="full"
                    alignItems="center"
                    color="white"
                >
                    {logo
                    ? <LinkBox>
                        <LinkOverlay href="/">
                            <Image mr={5} w="100px" src={logo}/>
                        </LinkOverlay>
                    </LinkBox>
                    : <Heading mr={5} size="lg">Logo</Heading>
                    }
                    {
                        isLargerThan640 && categories.map(cat=>{
                            return <NavbarItem key={cat.id} category={cat}/>
                        })
                    }
                    <Spacer/>
                    <LinkBox>
                        <LinkOverlay href="/cart">
                            <Button 
                                bg="transparent" 
                                fontSize="2xl"
                                p="1"
                                _hover={{bg: 'transparent'}}
                                position="relative"
                            >
                                {shoppingCart.length>0 && <Tag 
                                    size="sm" 
                                    position="absolute" 
                                    top="-1" 
                                    right="-1" 
                                    bg="black" 
                                    color="white" 
                                    rounded="full"
                                >
                                    {shoppingCart.length}
                                </Tag>}
                                <FaShoppingCart/>
                            </Button>
                        </LinkOverlay>
                    </LinkBox>
                    <Button
                        onClick={onOpen}
                        ref={buttonRef}
                        ml={2}
                        display={!isLargerThan640? 'block':'none'}
                        p={0} 
                        _hover={{bg: "transparent"}}
                        variant="ghost"
                    >
                        <HamburgerIcon width={6} height={6} />
                    </Button>
                    <Drawer
                        isOpen={isOpen}
                        placement="right"
                        onClose={onClose}
                        finalFocusRef={buttonRef}
                    >
                        <DrawerOverlay/>
                        <DrawerContent>
                            <DrawerCloseButton/>
                            <DrawerBody width="full">
                                <VStack w="full" spacing={6} pt={20}>
                                {categories.map(cat=> <NavbarMenuItem key={cat.id} category={cat} />)}
                                </VStack>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Flex>
            </Box>
        </Box>
    )
}

export default Navbar
