import { Box, Button, Image, LinkBox, LinkOverlay, Spacer, Text, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { useShoppingCart } from '../../../hooks/useShoppingCart'
import { formatPrice } from '../../../util/formatPrice'

const ProductCard = ({image, name, price, id}) => {
    const { shoppingCart, setShoppingCart } = useShoppingCart()
    const [isInCart, setIsInCart] = useState(false)
    const router = useRouter()
    useEffect(()=>{
        if(shoppingCart.findIndex(item=> item.id===id)!==-1) setIsInCart(true)
    }, [shoppingCart])
    const addToCart = () => {
        if(!isInCart){
            setIsInCart(true)
            if(image) setShoppingCart(shoppingCart=> ([...shoppingCart, {id, title: name, unit_price: price, picture_url: image || 'null', quantity: 1}]))
            else setShoppingCart(shoppingCart=> ([...shoppingCart, {id, title: name, unit_price: price, quantity: 1}]))
        }else router.push('/cart')
    }
    return (
        <Box
            _hover={{transform: "scale(1.02)"}}
            transition="transform .2s ease"
            p={2}
            w="full"
            h="280px"
            bg="white"
            border="1px"
            borderColor="gray.300"
            rounded="lg"
        >
            <LinkBox h="50%">
                <LinkOverlay href={`/products/${id}`}>
                    <Image
                        cursor="pointer"
                        rounded={'lg'}
                        height="full"
                        width="full"
                        objectFit="cover"
                        src={image||'/images/sample-image.png'}
                        borderBottom="1px"
                        borderBottomColor="gray.300"
                    />
                </LinkOverlay>
            </LinkBox>
            <Box height="50%" display="flex" flexDir="column" textAlign="center">
                {name.length>26 ?
                <Tooltip label={name}>
                    <Text fontSize="lg" fontWeight="600" whiteSpace="wrap" overflow="hidden" textOverflow="ellipsis" mt={1}>
                        {`${name.slice(0,26)}...`}
                    </Text>
                </Tooltip> :
                <Text fontSize="lg" fontWeight="600" whiteSpace="wrap" overflow="hidden" textOverflow="ellipsis" mt={1}>
                    {name}
                </Text> 
                }
                <Spacer/>
                <Text mb={2} bgGradient="linear(to-l, primary.500, secondary.500)" bgClip="text" fontWeight={700} fontSize="xl">{formatPrice(price)}</Text>
                <Button 
                    _hover={{transform: "translateY(-10%)"}}
                    transition="transform .5s ease"
                    isFullWidth 
                    size="sm" 
                    colorScheme={isInCart? 'secondary': 'primary'}
                    onClick={addToCart}
                >
                    {isInCart? 'Finalizar compra' : 'Agregar al carrito'}
                </Button>
            </Box>
      </Box>
    )
}

export default ProductCard
