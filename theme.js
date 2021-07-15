import { extendTheme } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools'

const customTheme = extendTheme({
    styles: {
        global: (props) => ({
            'html, body': {
                bg: mode('gray.50', 'red')(props),
            }
        })
    },
    colors: {
        primary: {
          100: '#bbf1db',
          200: '#95e7c4',
          300: '#6ddcae',
          400: '#46d297',
          500: '#2db97d',
          600: '#209061',
          700: '#136745',
          800: '#043f28',
          900: '#00170a',
        },
        secondary: {
          100: '#cae3db',
          200: '#aecfc5',
          300: '#8fbaae',
          400: '#72a697',
          500: '#598d7e',
          600: '#436e62',
          700: '#2e4f46',
          800: '#183029',
          900: '#00130c',
        },
        third: {
          100: '#e5d9cd',
          200: '#d2c0ae',
          300: '#c0a78d',
          400: '#ae8f6d',
          500: '#957553',
          600: '#745b40',
          700: '#53402d',
          800: '#32271a',
          900: '#150c02',
        }
    }
})

export default customTheme
