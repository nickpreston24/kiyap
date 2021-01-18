import { extendTheme } from '@chakra-ui/react'
// import icons from './icons'
import colors from './colors'
import space from './space'
import fonts from './fonts'

const theme = extendTheme({
    ...colors,
    ...space,
    ...fonts
});

export default theme