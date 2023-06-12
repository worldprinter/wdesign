import type { WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { createStyles, getSize } from '@worldprinter/wdesign-styles'

type ModalBaseBodyStylesParams = {
    padding: WDesignNumberSize
}

export default createStyles((theme, { padding }: ModalBaseBodyStylesParams) => ({
    body: {
        padding: getSize({ size: padding, sizes: theme.spacing }),

        '&:not(:only-child)': {
            paddingTop: 0,
        },
    },
}))
