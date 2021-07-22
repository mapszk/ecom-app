import { CloseIcon } from "@chakra-ui/icons"
import { Box, Button, FormLabel, Heading, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spacer, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useShoppingCart } from "../../hooks/useShoppingCart"
import { formatPrice } from "../../util/formatPrice"

const ShoppingCartItem = ({product}) => {
    const { setShoppingCart } = useShoppingCart()
    const removeItemFromCart = () => {
        setShoppingCart(cart=> cart.filter(item=> item.id!==product.id))
    }
    return (
        <Box mb={2} display="flex" pb={2} borderBottom="1px" borderBottomColor="gray.300">
            <Image objectFit="cover" mr={2} rounded="md" width="35%" src={product.picture_url||'/images/sample-image.png'}/>
            <Stack spacing={1}>
                <Heading size="md">{product.title}</Heading>
                <Text 
                    fontSize="2xl" 
                    fontWeight="bold" 
                    bgGradient="linear(to-l, primary.500, secondary.500)" 
                    bgClip="text"
                >
                    {formatPrice(product.unit_price)}
                </Text>
            </Stack>
            <Spacer/>
            <Button onClick={removeItemFromCart} colorScheme="secondary" size="sm" variant="outline">
                <CloseIcon/>
            </Button>
        </Box>
    )
}

export default ShoppingCartItem
