import type { WDesignThemeBase } from '../../../types'
import { primaryShade } from '../primary-shade/primary-shade'

export function themeColor(theme: WDesignThemeBase) {
    const getPrimaryShade = primaryShade(theme)

    return (color: string, shade?: number, primaryFallback = true, useSplittedShade = true) => {
        if (typeof color === 'string' && color.includes('.')) {
            const [splitterColor, _splittedShade] = color.split('.')
            const splittedShade = parseInt(_splittedShade, 10)

            if (splitterColor in theme.colors && splittedShade >= 0 && splittedShade < 10) {
                return theme.colors[splitterColor][
                    typeof shade === 'number' && !useSplittedShade ? shade : splittedShade
                ]
            }
        }

        const _shade = typeof shade === 'number' ? shade : getPrimaryShade()

        return color in theme.colors
            ? theme.colors[color][_shade]
            : primaryFallback
            ? theme.colors[theme.primaryColor][_shade]
            : color
    }
}
