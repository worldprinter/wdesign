import React, { forwardRef } from 'react'

import type {
    DefaultProps,
    Variants,
    WDesignColor,
    WDesignGradient,
    WDesignNumberSize,
} from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import type { ThemeIconStylesParams } from './ThemeIcon.styles'
import useStyles from './ThemeIcon.styles'

export type ThemeIconVariant = Variants<'filled' | 'light' | 'gradient' | 'outline' | 'default'>

export type ThemeIconProps = {
    /** Icon */
    children: React.ReactNode

    /** Width and height of theme icon */
    size?: WDesignNumberSize

    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: WDesignNumberSize

    /** Icon color from theme */
    color?: WDesignColor

    /** Controls appearance */
    variant?: ThemeIconVariant

    /** Controls gradient settings in gradient variant only */
    gradient?: WDesignGradient
} & DefaultProps<never, ThemeIconStylesParams> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<ThemeIconProps> = {
    size: 'md',
    variant: 'filled',
}

export const ThemeIcon = forwardRef<HTMLDivElement, ThemeIconProps>((props, ref) => {
    const { className, size, radius, variant, color, children, gradient, unstyled, ...others } =
        useComponentDefaultProps('ThemeIcon', defaultProps, props)

    const { classes, cx } = useStyles(
        { variant, radius, color, gradient },
        { name: 'ThemeIcon', unstyled, variant, size },
    )

    return (
        <Box
            className={cx(classes.root, className)}
            ref={ref}
            {...others}
        >
            {children}
        </Box>
    )
})

ThemeIcon.displayName = '@worldprinter/wdesign-core/ThemeIcon'
