import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors, WDesignSize } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Text } from '../../Text'
import useStyles from './InputError.styles'

export type InputErrorStylesNames = Selectors<typeof useStyles>

export type InputErrorProps = {
    variant?: string

    /** Error content */
    children?: React.ReactNode

    /** Predefined size */
    size?: WDesignSize

    __staticSelector?: string
} & DefaultProps<InputErrorStylesNames> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<InputErrorProps> = {
    size: 'sm',
}

export const InputError = forwardRef<HTMLDivElement, InputErrorProps>((props, ref) => {
    const { children, className, classNames, styles, unstyled, size, __staticSelector, variant, ...others } =
        useComponentDefaultProps('InputError', defaultProps, props)

    const { classes, cx } = useStyles(null, {
        name: ['InputWrapper', __staticSelector],
        classNames,
        styles,
        unstyled,
        variant,
        size,
    })

    return (
        <Text
            className={cx(classes.error, className)}
            ref={ref}
            {...others}
        >
            {children}
        </Text>
    )
})

InputError.displayName = '@worldprinter/wdesign-core/InputError'
