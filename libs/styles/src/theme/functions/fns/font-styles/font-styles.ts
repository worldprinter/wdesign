import type { CSSObject } from '../../../../tss'
import type { MantineThemeBase } from '../../../types'

export function fontStyles(theme: MantineThemeBase) {
    return (): CSSObject => ({ fontFamily: theme.fontFamily || 'sans-serif' })
}
