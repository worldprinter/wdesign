import type { WDesignTheme } from '@worldprinter/wdesign-styles'
import { getSize } from '@worldprinter/wdesign-styles'

export function getFontSizeValue(size: any, theme: WDesignTheme) {
    return getSize({ size, sizes: theme.fontSizes })
}
