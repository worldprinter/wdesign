import type { WDesignNumberSize, WDesignThemeBase } from '../../../types'
import { rem } from '../../../utils'

export function radius(theme: WDesignThemeBase) {
    return (size?: WDesignNumberSize): string | number => {
        if (typeof size === 'number') {
            return rem(size)
        }

        const defaultRadius =
            typeof theme.defaultRadius === 'number'
                ? theme.defaultRadius
                : theme.radius[theme.defaultRadius] || theme.defaultRadius

        return theme.radius[size] || size || defaultRadius
    }
}
