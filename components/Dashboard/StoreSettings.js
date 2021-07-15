import { Flex, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Box, Heading, Button, Text, HStack, VStack, Spacer, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react"
import { set } from "lodash"
import { useState } from "react"
import { SwatchesPicker } from "react-color"
import { db } from "../../util/firebase"

const StoreSettings = ({colors}) => {
    const [primary, setPrimary] = useState(colors.primary)
    const [secondary, setSecondary] = useState(colors.secondary)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [warning, setWarning] = useState(false)
    const [alert, setAlert] = useState({})
    const clearWarning = () => {
        setInterval(()=>{
            setAlert({})
            setWarning(false)
        }, 4000)
    }
    const submitColors = async () => {
        setIsSubmitting(true)
        await db.collection('users')
            .doc('userInfo')
            .update({
                colors: {
                    primary,
                    secondary
                }
            })
            .then(()=>{
                setIsSubmitting(false)
                setAlert({msg: 'Colores guardados', type: 'success'})
                setWarning(true)
                clearWarning()
            })
            .catch(()=>{
                setIsSubmitting(false)
                setAlert({msg: 'Ha ocurrido un error por favor intenta de nuevo', type: 'error'})
                setWarning(true)
                clearWarning()
            })
    }
    return (
        <Flex
            justifyContent="start"
            direction="column"
            minHeight="280px"
            bgColor="white"
            boxShadow="base"
            rounded="md"
            p={5}
            _hover={{border: "1px", borderColor: "primary.500"}}
        >
            <Heading size="lg" mb={2}>Tienda</Heading>
            <Text mb={4} size="md">Elige dos colores para tu tienda</Text>
            <HStack spacing={6}>
                <VStack>
                    <Popover placement="right">
                        <PopoverTrigger>
                            <Box
                                _hover={{bg: primary}}
                                as={Button}
                                width="50px"
                                height="50px"
                                rounded="full"
                                bg={primary}
                                boxShadow="base"
                            ></Box>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody>
                                <SwatchesPicker width="100%" color={primary} onChangeComplete={color=>setPrimary(color.hex)}/>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Text size="sm">Primario</Text>
                </VStack>
                <VStack>
                    <Popover placement="right">
                        <PopoverTrigger>
                            <Box
                                _hover={{bg: secondary}}
                                as={Button}
                                width="50px"
                                height="50px"
                                rounded="full"
                                bg={secondary}
                                boxShadow="base"
                            ></Box>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody>
                                <SwatchesPicker width="100%" color={secondary} onChangeComplete={color=>setSecondary(color.hex)}/>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Text size="sm">Secundario</Text>
                </VStack>
            </HStack>
            <Spacer/>
            {warning &&
            <Alert my={2} rounded="md" status={alert.type}>
                <AlertIcon/>
                <AlertDescription>{alert.msg}</AlertDescription>
            </Alert>
            }
            <Button
                variant="solid"
                alignSelf="flex-start" 
                colorScheme="primary"
                onClick={submitColors}
                isLoading={isSubmitting}
            >
                Guardar
            </Button>
        </Flex>
    )
}

export default StoreSettings
