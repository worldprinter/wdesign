import type { MantineThemeBase } from '../../../types'
import { primaryShade } from '../primary-shade/primary-shade'

export function primaryColor(theme: MantineThemeBase) {
    return (colorScheme?: 'light' | 'dark') => {
        const shade = primaryShade(theme)(colorScheme)
        return theme.colors[theme.primaryColor][shade]
    }
}
