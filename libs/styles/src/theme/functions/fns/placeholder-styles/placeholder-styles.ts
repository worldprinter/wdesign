import type { CSSObject } from '../../../../tss'
import type { WDesignThemeBase } from '../../../types'

export function placeholderStyles(theme: WDesignThemeBase) {
    return (): CSSObject => ({
        userSelect: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    })
}
