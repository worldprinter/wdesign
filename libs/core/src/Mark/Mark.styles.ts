import type { WDesignColor } from '@worldprinter/wdesign-styles'
import { createStyles } from '@worldprinter/wdesign-styles'

export type MarkStylesParams = {
    color: WDesignColor
}

export default createStyles((theme, { color }: MarkStylesParams) => ({
    root: {
        backgroundColor: theme.fn.themeColor(color, theme.colorScheme === 'dark' ? 5 : 2),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : 'inherit',
    },
}))
