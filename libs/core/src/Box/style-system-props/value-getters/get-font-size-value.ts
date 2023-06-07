import type { MantineTheme } from '@worldprinter/wdesign-styles'
import { getSize } from '@worldprinter/wdesign-styles'

export function getFontSizeValue(size: any, theme: MantineTheme) {
    return getSize({ size, sizes: theme.fontSizes })
}
