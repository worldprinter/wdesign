import React, { forwardRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import type { TextProps } from '../Text'
import { Text } from '../Text'
import type { TitleStylesParams } from './Title.styles'
import useStyles from './Title.styles'

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6
export type TitleSize = `h${TitleOrder}` | React.CSSProperties['fontSize']

export type TitleProps = {
    variant?: string

    /** Defines component and styles which will be used */
    order?: TitleOrder

    /** Title font-size: h1-h6 or any valid CSS font-size value */
    size?: TitleSize
} & Omit<TextProps, 'size' | 'styles' | 'classNames' | 'span'> &
    DefaultProps<never, TitleStylesParams> &
    Omit<React.ComponentPropsWithoutRef<'h1'>, 'color'>

const defaultProps: Partial<TitleProps> = {
    order: 1,
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>((props, ref) => {
    const { className, order, children, unstyled, size, weight, inline, variant, ...others } = useComponentDefaultProps(
        'Title',
        defaultProps,
        props,
    )

    const { classes, cx } = useStyles(
        { element: `h${order}`, weight, inline },
        { name: 'Title', unstyled, variant, size },
    )

    if (![1, 2, 3, 4, 5, 6].includes(order)) {
        return null
    }

    return (
        <Text
            variant={variant}
            component={`h${order}`}
            ref={ref}
            className={cx(classes.root, className)}
            {...others}
        >
            {children}
        </Text>
    )
})

Title.displayName = '@worldprinter/wdesign-core/Title'
