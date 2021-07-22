import { Box, Link } from "@chakra-ui/react"

const Footer = () => {
    return (
        <Box bottom="0" right="0" left="0" position="relative" mt={10} bgGradient="linear(to-t, secondary.600, secondary.500)" height="70px">
            <Box w="95%" maxW="1024px" mx="auto" height="full">
                <Box height="full" display="flex" alignItems="center" justifyContent="flex-end" color="secondary.100">
                    <Link href="/dashboard">Panel de control</Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer
