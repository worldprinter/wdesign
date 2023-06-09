import type {
    CSSObject,
    WDesignColor,
    WDesignGradient,
    WDesignNumberSize,
    WDesignTheme,
} from '@worldprinter/wdesign-styles'
import { createStyles, getSize, rem } from '@worldprinter/wdesign-styles'

export const AVATAR_VARIANTS = ['filled', 'light', 'gradient', 'outline']

export type AvatarStylesParams = {
    radius: WDesignNumberSize
    color: WDesignColor
    withinGroup: boolean
    spacing: WDesignNumberSize
    gradient: WDesignGradient
}

export const sizes = {
    xs: rem(16),
    sm: rem(26),
    md: rem(38),
    lg: rem(56),
    xl: rem(84),
}

type GetGroupStylesInput = {
    withinGroup: boolean
    spacing: WDesignNumberSize
    theme: WDesignTheme
}

function getGroupStyles({ withinGroup, spacing, theme }: GetGroupStylesInput): CSSObject {
    if (!withinGroup) {
        return null
    }

    return {
        marginLeft: `calc(${getSize({
            size: spacing,
            sizes: theme.spacing,
        })} * -1)`,
        backgroundColor: `${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        border: `${rem(2)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    }
}

type GetVariantStylesInput = {
    theme: WDesignTheme
    variant: string
    color: WDesignColor
    gradient: WDesignGradient
}

function getVariantStyles({ theme, variant, color, gradient }: GetVariantStylesInput) {
    const colors = theme.fn.variant({ variant, color, gradient })

    if (AVATAR_VARIANTS.includes(variant)) {
        return {
            placeholder: {
                color: colors.color,
                backgroundColor: colors.background,
                backgroundImage: variant === 'gradient' ? colors.background : undefined,
                border: `${rem(variant === 'gradient' ? 0 : 1)} solid ${colors.border}`,
            },

            placeholderIcon: {
                color: colors.color,
            },
        }
    }

    return {}
}

export default createStyles(
    (theme, { radius, withinGroup, spacing, color, gradient }: AvatarStylesParams, { variant, size }) => {
        const variantStyles = getVariantStyles({ theme, color, gradient, variant })
        return {
            root: {
                ...theme.fn.focusStyles(),
                WebkitTapHighlightColor: 'transparent',
                boxSizing: 'border-box',
                position: 'relative',
                display: 'block',
                userSelect: 'none',
                overflow: 'hidden',
                borderRadius: theme.fn.radius(radius),
                textDecoration: 'none',
                border: 0,
                backgroundColor: 'transparent',
                padding: 0,
                width: getSize({ size, sizes }),
                minWidth: getSize({ size, sizes }),
                height: getSize({ size, sizes }),
                ...getGroupStyles({ withinGroup, spacing, theme }),
            },

            image: {
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                display: 'block',
            },

            placeholder: {
                ...theme.fn.fontStyles(),
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                userSelect: 'none',
                borderRadius: theme.fn.radius(radius),
                fontSize: `calc(${getSize({ size, sizes })} / 2.5)`,
                ...variantStyles.placeholder,
            },

            placeholderIcon: {
                width: '70%',
                height: '70%',
                ...variantStyles.placeholderIcon,
            },
        }
    },
)
