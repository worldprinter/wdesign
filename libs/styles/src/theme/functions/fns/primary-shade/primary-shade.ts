import type { WDesignThemeBase } from '../../../types'

export function primaryShade(theme: WDesignThemeBase) {
    return (colorScheme?: 'light' | 'dark') => {
        if (typeof theme.primaryShade === 'number') {
            return theme.primaryShade
        }

        return theme.primaryShade[colorScheme || theme.colorScheme]
    }
}
