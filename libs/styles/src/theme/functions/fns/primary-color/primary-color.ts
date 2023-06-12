import type { WDesignThemeBase } from '../../../types'
import { primaryShade } from '../primary-shade/primary-shade'

export function primaryColor(theme: WDesignThemeBase) {
    return (colorScheme?: 'light' | 'dark') => {
        const shade = primaryShade(theme)(colorScheme)
        return theme.colors[theme.primaryColor][shade]
    }
}
