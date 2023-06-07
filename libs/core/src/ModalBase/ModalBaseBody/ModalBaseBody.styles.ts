import type { MantineNumberSize } from '@worldprinter/wdesign-styles'
import { createStyles, getSize } from '@worldprinter/wdesign-styles'

type ModalBaseBodyStylesParams = {
    padding: MantineNumberSize
}

export default createStyles((theme, { padding }: ModalBaseBodyStylesParams) => ({
    body: {
        padding: getSize({ size: padding, sizes: theme.spacing }),

        '&:not(:only-child)': {
            paddingTop: 0,
        },
    },
}))
