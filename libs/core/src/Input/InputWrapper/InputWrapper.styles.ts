import { createStyles } from '@worldprinter/wdesign-styles'

export default createStyles((theme) => ({
    root: {
        ...theme.fn.fontStyles(),
        lineHeight: theme.lineHeight,
    },
}))
