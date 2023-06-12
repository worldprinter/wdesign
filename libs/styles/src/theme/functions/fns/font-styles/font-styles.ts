import type { CSSObject } from '../../../../tss'
import type { WDesignThemeBase } from '../../../types'

export function fontStyles(theme: WDesignThemeBase) {
    return (): CSSObject => ({ fontFamily: theme.fontFamily || 'sans-serif' })
}
