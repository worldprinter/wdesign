import type { WDesignColor, WDesignTheme } from '@worldprinter/wdesign-styles'
import { createStyles } from '@worldprinter/wdesign-styles'

export type AnchorStylesParams = {
    color: WDesignColor
    underline: boolean
}

type GetAnchorColor = {
    theme: WDesignTheme
    color: 'dimmed' | WDesignColor
}

function getAnchorColor({ theme, color }: GetAnchorColor) {
    if (color === 'dimmed') {
        return theme.fn.dimmed()
    }

    return theme.fn.themeColor(color || theme.primaryColor, theme.colorScheme === 'dark' ? 4 : 7, false, true)
}

export default createStyles((theme, { color, underline }: AnchorStylesParams) => ({
    root: {
        backgroundColor: 'transparent',
        cursor: 'pointer',
        padding: 0,
        border: 0,
        color: getAnchorColor({ theme, color }),
        ...theme.fn.hover({ textDecoration: underline ? 'underline' : 'none' }),
    },
}))
