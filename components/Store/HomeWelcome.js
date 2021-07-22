import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react"

const HomeWelcome = ({welcome, image}) => {
    const [isLargerThan640] = useMediaQuery('(min-width: 640px)')
    return (
        <Box my={10} height="300px">
            <Flex height="full">
                <Box alignItems="center" flex="3" display={isLargerThan640?'flex':'none'} fontSize="4xl" fontWeight="semibold">
                    <Text fontWeight="700" lineHeight="3rem">{welcome}</Text>
                </Box>
                <Box display="flex" flex="4" justifyContent="center">
                    <Image objectFit="cover" src={image} height="full" rounded="lg"/>
                </Box>
            </Flex>
        </Box>
    )
}

export default HomeWelcome
