import React, { forwardRef } from 'react'

import type {
    DefaultProps,
    MantineColor,
    MantineGradient,
    MantineNumberSize,
    Selectors,
    Variants,
} from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import type { LoaderProps } from '../Loader'
import { Loader } from '../Loader'
import { UnstyledButton } from '../UnstyledButton'
import type { ActionIconStylesParams } from './ActionIcon.styles'
import useStyles from './ActionIcon.styles'

export type ActionIconStylesNames = Selectors<typeof useStyles>

export type ActionIconProps = {
    __staticSelector?: string

    /** Icon */
    children?: React.ReactNode

    /** Controls appearance, subtle by default */
    variant?: Variants<'subtle' | 'filled' | 'outline' | 'light' | 'default' | 'transparent' | 'gradient'>

    /** Key of theme.colors */
    color?: MantineColor

    /** Gradient input, only used when variant="gradient", theme.defaultGradient by default */
    gradient?: MantineGradient

    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize

    /** Predefined button size or any valid CSS value to set width and height */
    size?: MantineNumberSize

    /** Props added to Loader component (only visible when `loading` prop is set) */
    loaderProps?: LoaderProps

    /** Indicates loading state */
    loading?: boolean

    /** Indicates disabled state */
    disabled?: boolean
} & DefaultProps<ActionIconStylesNames, ActionIconStylesParams>

const defaultProps: Partial<ActionIconProps> = {
    color: 'gray',
    size: 'md',
    variant: 'subtle',
}

export const _ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>((props, ref) => {
    const {
        className,
        color,
        children,
        radius,
        size,
        variant,
        gradient,
        disabled,
        loaderProps,
        loading,
        unstyled,
        __staticSelector,
        ...others
    } = useComponentDefaultProps('ActionIcon', defaultProps, props)

    const { classes, cx, theme } = useStyles(
        { radius, color, gradient },
        { name: ['ActionIcon', __staticSelector], unstyled, size, variant },
    )

    const loader = (
        <Loader
            color={theme.fn.variant({ color, variant }).color}
            size='100%'
            data-action-icon-loader
            {...loaderProps}
        />
    )

    return (
        <UnstyledButton
            className={cx(classes.root, className)}
            ref={ref}
            disabled={disabled}
            data-disabled={disabled || undefined}
            data-loading={loading || undefined}
            unstyled={unstyled}
            {...others}
        >
            {loading ? loader : children}
        </UnstyledButton>
    )
})

_ActionIcon.displayName = '@worldprinter/wdesign-core/ActionIcon'

export const ActionIcon = createPolymorphicComponent<'button', ActionIconProps>(_ActionIcon)
