import React, { forwardRef } from 'react'

import type {
    DefaultProps,
    Selectors,
    Variants,
    WDesignColor,
    WDesignGradient,
    WDesignNumberSize,
    WDesignSize,
} from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import { Box } from '../Box'
import type { BadgeStylesParams } from './Badge.styles'
import useStyles from './Badge.styles'

export type BadgeStylesNames = Selectors<typeof useStyles>
export type BadgeVariant = Variants<'light' | 'filled' | 'outline' | 'dot' | 'gradient'>

export type BadgeProps = {
    /** Key of theme.colors */
    color?: WDesignColor

    /** Controls appearance */
    variant?: BadgeVariant

    /** Controls gradient, applied to gradient variant only */
    gradient?: WDesignGradient

    /** Badge height and font size */
    size?: WDesignSize

    /** Key of theme.radius or any valid CSS value to set border-radius, "xl" by default */
    radius?: WDesignNumberSize

    /** Sets badge width to 100% of parent element, hides overflow text with text-overflow: ellipsis */
    fullWidth?: boolean

    /** Section rendered on the left side of label */
    leftSection?: React.ReactNode

    /** Section rendered on the right side of label */
    rightSection?: React.ReactNode

    /** Badge label */
    children?: React.ReactNode
} & DefaultProps<BadgeStylesNames, BadgeStylesParams>

const defaultProps: Partial<BadgeProps> = {
    variant: 'light',
    size: 'md',
    radius: 'xl',
}

export const _Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
    const {
        className,
        color,
        variant,
        fullWidth,
        children,
        size,
        leftSection,
        rightSection,
        radius,
        gradient,
        classNames,
        styles,
        unstyled,
        ...others
    } = useComponentDefaultProps('Badge', defaultProps, props)

    const { classes, cx } = useStyles(
        { fullWidth, color, radius, gradient },
        { classNames, styles, name: 'Badge', unstyled, variant, size },
    )

    return (
        <Box
            className={cx(classes.root, className)}
            ref={ref}
            {...others}
        >
            {leftSection && <span className={classes.leftSection}>{leftSection}</span>}
            <span className={classes.inner}>{children}</span>
            {rightSection && <span className={classes.rightSection}>{rightSection}</span>}
        </Box>
    )
})

_Badge.displayName = '@worldprinter/wdesign-core/Badge'

export const Badge = createPolymorphicComponent<'div', BadgeProps>(_Badge)
