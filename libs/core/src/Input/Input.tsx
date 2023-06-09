import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors, Variants, WDesignNumberSize, WDesignSize } from '@worldprinter/wdesign-styles'
import { rem, useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import { Box, extractSystemStyles } from '../Box'
import useStyles from './Input.styles'
import { InputDescription } from './InputDescription/InputDescription'
import { InputError } from './InputError/InputError'
import { InputLabel } from './InputLabel/InputLabel'
import { InputPlaceholder } from './InputPlaceholder/InputPlaceholder'
import { useInputWrapperContext } from './InputWrapper.context'
import { InputWrapper } from './InputWrapper/InputWrapper'

export type InputStylesNames = Selectors<typeof useStyles>

export type InputSharedProps = {
    /** Adds icon on the left side of input */
    icon?: React.ReactNode

    /** Width of icon section */
    iconWidth?: React.CSSProperties['width']

    /** Right section of input, similar to icon but on the right */
    rightSection?: React.ReactNode

    /** Width of right section, is used to calculate input padding-right */
    rightSectionWidth?: React.CSSProperties['width']

    /** Props spread to rightSection div element */
    rightSectionProps?: Record<string, any>

    /** Properties spread to root element */
    wrapperProps?: Record<string, any>

    /** Sets required on input element */
    required?: boolean

    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: WDesignNumberSize

    /** Defines input appearance, defaults to default in light color scheme and filled in dark */
    variant?: Variants<'default' | 'filled' | 'unstyled'>

    /** Disabled input state */
    disabled?: boolean

    /** Input size */
    size?: WDesignSize
}

export type InputProps = {
    /** Static css selector base */
    __staticSelector?: string

    /** Determines whether input has error styles */
    error?: React.ReactNode

    /** Will input have multiple lines? */
    multiline?: boolean

    /** Determines whether cursor on input should be pointer */
    pointer?: boolean
} & InputSharedProps &
    DefaultProps<InputStylesNames>

const defaultProps: Partial<InputProps> = {
    size: 'sm',
    variant: 'default',
}

export const _Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        className,
        error,
        required,
        disabled,
        variant,
        icon,
        style,
        rightSectionWidth,
        iconWidth,
        rightSection,
        rightSectionProps,
        radius,
        size,
        wrapperProps,
        classNames,
        styles,
        __staticSelector,
        multiline,
        sx,
        unstyled,
        pointer,
        ...others
    } = useComponentDefaultProps('Input', defaultProps, props)
    const { offsetBottom, offsetTop, describedBy } = useInputWrapperContext()

    const { classes, cx } = useStyles(
        {
            radius,
            multiline,
            invalid: !!error,
            rightSectionWidth: rightSectionWidth ? rem(rightSectionWidth) : undefined,
            iconWidth,
            withRightSection: !!rightSection,
            offsetBottom,
            offsetTop,
            pointer,
        },
        {
            classNames,
            styles,
            name: ['Input', __staticSelector],
            unstyled,
            variant,
            size,
        },
    )

    const { systemStyles, rest } = extractSystemStyles(others)

    return (
        <Box
            className={cx(classes.wrapper, className)}
            sx={sx}
            style={style}
            {...systemStyles}
            {...wrapperProps}
        >
            {icon && <div className={classes.icon}>{icon}</div>}

            <Box
                component='input'
                {...rest}
                ref={ref}
                required={required}
                aria-invalid={!!error}
                aria-describedby={describedBy}
                disabled={disabled}
                data-disabled={disabled || undefined}
                data-with-icon={!!icon || undefined}
                data-invalid={!!error || undefined}
                className={classes.input}
            />

            {rightSection && (
                <div
                    {...rightSectionProps}
                    className={classes.rightSection}
                >
                    {rightSection}
                </div>
            )}
        </Box>
    )
}) as any

_Input.displayName = '@worldprinter/wdesign-core/Input'
_Input.Wrapper = InputWrapper
_Input.Label = InputLabel
_Input.Description = InputDescription
_Input.Error = InputError
_Input.Placeholder = InputPlaceholder

export const Input = createPolymorphicComponent<
    'input',
    InputProps,
    {
        Wrapper: typeof InputWrapper
        Label: typeof InputLabel
        Description: typeof InputDescription
        Error: typeof InputError
        Placeholder: typeof InputPlaceholder
    }
>(_Input)
