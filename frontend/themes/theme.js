import { extendTheme } from '@chakra-ui/react'
import colors from './colors'
import space from './space'
import fonts from './fonts'
import borders from './borders';
import indeces from './indeces';

const theme = extendTheme({
    ...colors,
    ...space,
    ...fonts,
    ...borders,
    ...indeces,
    breakpoints: ["30em", "48em", "62em", "80em"]
});

export default theme