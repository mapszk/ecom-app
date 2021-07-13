import { extendTheme } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools'

const customTheme = extendTheme({
    styles: {
        global: (props) => ({
            'html, body': {
                bg: mode('gray.50', 'red')(props),
            }
        })
    }
})

export default customTheme