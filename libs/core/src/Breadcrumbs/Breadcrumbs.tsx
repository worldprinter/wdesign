import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { isElement } from '@worldprinter/wdesign-utils'

import { Box } from '../Box'
import { Text } from '../Text'
import useStyles from './Breadcrumbs.styles'

export type BreadcrumbsStylesNames = Selectors<typeof useStyles>

export type BreadcrumbsProps = {
    variant?: string

    /** Separator between breadcrumbs */
    separator?: React.ReactNode

    /** React nodes that should be separated */
    children: React.ReactNode
} & DefaultProps<BreadcrumbsStylesNames> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<BreadcrumbsProps> = {
    separator: '/',
}

export const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>((props: BreadcrumbsProps, ref) => {
    const { className, children, separator, classNames, styles, unstyled, variant, ...others } =
        useComponentDefaultProps('Breadcrumbs', defaultProps, props)

    const { classes, cx } = useStyles(null, {
        classNames,
        styles,
        unstyled,
        name: 'Breadcrumbs',
        variant,
    })

    const items = React.Children.toArray(children).reduce<React.ReactNode[]>((acc, child, index, array) => {
        const item = isElement(child) ? (
            React.cloneElement(child, {
                className: cx(classes.breadcrumb, child.props?.className),
                key: index,
            })
        ) : (
            <div
                className={classes.breadcrumb}
                key={index}
            >
                {child}
            </div>
        )

        acc.push(item)

        if (index !== array.length - 1) {
            acc.push(
                <Text
                    size='sm'
                    className={classes.separator}
                    key={`separator-${index}`}
                >
                    {separator}
                </Text>,
            )
        }

        return acc
    }, [])

    return (
        <Box
            className={cx(classes.root, className)}
            ref={ref}
            {...others}
        >
            {items}
        </Box>
    )
})

Breadcrumbs.displayName = '@worldprinter/wdesign-core/Breadcrumbs'
