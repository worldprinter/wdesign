import type { WDesignSize } from '@worldprinter/wdesign-styles'
import { createStyles, getSize } from '@worldprinter/wdesign-styles'

export type ContainerStylesParams = {
    fluid: boolean
    sizes: Record<WDesignSize, number | string>
}

export default createStyles((theme, { fluid, sizes }: ContainerStylesParams, { size }) => ({
    root: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        maxWidth: fluid ? '100%' : getSize({ size, sizes }),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}))
