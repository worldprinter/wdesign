import { createStyles, getSize, rem } from '@worldprinter/wdesign-styles'

export default createStyles((theme, _params, { size }) => ({
    input: {
        fontFamily: theme.fontFamilyMonospace,
        fontSize: `calc(${getSize({ size, sizes: theme.fontSizes })} - ${rem(2)})`,
    },
}))
