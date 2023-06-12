import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors, WDesignSize } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Text } from '../../Text'
import useStyles from './InputDescription.styles'

export type InputDescriptionStylesNames = Selectors<typeof useStyles>

export type InputDescriptionProps = {
    variant?: string

    /** Description content */
    children?: React.ReactNode

    /** Predefined size */
    size?: WDesignSize

    __staticSelector?: string
} & DefaultProps<InputDescriptionStylesNames> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<InputDescriptionProps> = {
    size: 'sm',
}

export const InputDescription = forwardRef<HTMLDivElement, InputDescriptionProps>((props, ref) => {
    const { children, className, classNames, styles, unstyled, size, __staticSelector, variant, ...others } =
        useComponentDefaultProps('InputDescription', defaultProps, props)

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
            color='dimmed'
            className={cx(classes.description, className)}
            ref={ref}
            unstyled={unstyled}
            {...others}
        >
            {children}
        </Text>
    )
})

InputDescription.displayName = '@worldprinter/wdesign-core/InputDescription'
