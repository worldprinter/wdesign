import type { WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { createStyles, getSize } from '@worldprinter/wdesign-styles'

export type ListStylesParams = {
    withPadding: boolean
    listStyleType: string
    spacing: WDesignNumberSize
    center: boolean
}

export default createStyles((theme, { withPadding, listStyleType }: ListStylesParams, { size }) => ({
    root: {
        ...theme.fn.fontStyles(),
        listStyleType,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: getSize({ size, sizes: theme.fontSizes }),
        lineHeight: theme.lineHeight,
        margin: 0,
        paddingLeft: withPadding ? theme.spacing.xl : 0,
        listStylePosition: 'inside',
    },
}))
