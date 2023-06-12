import type { WDesignColor, WDesignGradient, WDesignNumberSize, WDesignTheme } from '@worldprinter/wdesign-styles'
import { createStyles, getSize, rem } from '@worldprinter/wdesign-styles'

export type ThemeIconStylesParams = {
    color: WDesignColor
    radius: WDesignNumberSize
    variant: string
    gradient: WDesignGradient
}

const sizes = {
    xs: rem(16),
    sm: rem(20),
    md: rem(26),
    lg: rem(32),
    xl: rem(40),
}

const THEME_ICON_VARIANTS = ['filled', 'light', 'gradient', 'outline', 'default']

type GetVariantStylesInput = {
    theme: WDesignTheme
    variant: string
    color: WDesignColor
    gradient: WDesignGradient
}

function getVariantStyles({ theme, variant, color, gradient }: GetVariantStylesInput) {
    if (!THEME_ICON_VARIANTS.includes(variant)) {
        return null
    }

    const colors = theme.fn.variant({
        variant,
        color: color || theme.primaryColor,
        gradient,
        primaryFallback: false,
    })

    return {
        backgroundColor: colors.background,
        color: colors.color,
        backgroundImage: variant === 'gradient' ? colors.background : undefined,
        border: `${rem(variant === 'gradient' ? 0 : 1)} solid ${colors.border}`,
    }
}

export default createStyles((theme, { color, radius, gradient }: ThemeIconStylesParams, { variant, size }) => {
    const iconSize = getSize({ size, sizes })

    return {
        root: {
            ...theme.fn.fontStyles(),
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            width: iconSize,
            height: iconSize,
            minWidth: iconSize,
            minHeight: iconSize,
            borderRadius: theme.fn.radius(radius),
            ...getVariantStyles({ theme, variant, gradient, color }),
        },
    }
})
