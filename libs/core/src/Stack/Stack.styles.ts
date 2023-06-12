import type { WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { createStyles, getSize } from '@worldprinter/wdesign-styles'

export type StackStylesParams = {
    spacing: WDesignNumberSize
    align: React.CSSProperties['alignItems']
    justify: React.CSSProperties['justifyContent']
}

export default createStyles((theme, { spacing, align, justify }: StackStylesParams) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: align,
        justifyContent: justify,
        gap: getSize({ size: spacing, sizes: theme.spacing }),
    },
}))
