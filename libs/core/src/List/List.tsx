import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors, WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import type { ForwardRefWithStaticComponents } from '@worldprinter/wdesign-utils'

import { Box } from '../Box'
import { ListProvider } from './List.context'
import useStyles from './List.styles'
import type { ListItemStylesNames } from './ListItem/ListItem'
import { ListItem } from './ListItem/ListItem'

export type ListStylesNames = ListItemStylesNames | Selectors<typeof useStyles>

export type ListProps = {
    variant?: string

    /** <List.Item /> components only */
    children: React.ReactNode

    /** List type: ol or ul */
    type?: 'ordered' | 'unordered'

    /** Include padding-left to offset list from main content */
    withPadding?: boolean

    /** Font size from theme or number to set value */
    size?: WDesignNumberSize

    /** Icon that should replace list item dot */
    icon?: React.ReactNode

    /** Spacing between items from theme or number to set value */
    spacing?: WDesignNumberSize

    /** Center items with icon */
    center?: boolean

    /** List style */
    listStyleType?: React.CSSProperties['listStyleType']
} & DefaultProps<ListStylesNames> &
    Omit<React.ComponentPropsWithRef<'ol'>, 'type'>

type ListComponent = ForwardRefWithStaticComponents<ListProps, { Item: typeof ListItem }>

const defaultProps: Partial<ListProps> = {
    type: 'unordered',
    size: 'md',
    spacing: 0,
}

export const List: ListComponent = forwardRef<HTMLUListElement, ListProps>((props: ListProps, ref) => {
    const {
        children,
        type,
        size,
        listStyleType,
        withPadding,
        center,
        spacing,
        icon,
        className,
        styles,
        classNames,
        unstyled,
        variant,
        ...others
    } = useComponentDefaultProps('List', defaultProps, props)

    const { classes, cx } = useStyles(
        { withPadding, listStyleType, center, spacing },
        { classNames, styles, name: 'List', unstyled, size, variant },
    )

    return (
        <ListProvider
            value={{
                spacing,
                center,
                icon,
                listStyleType,
                size,
                withPadding,
                classNames,
                styles,
                unstyled,
                variant,
            }}
        >
            <Box<any>
                component={type === 'unordered' ? 'ul' : 'ol'}
                className={cx(classes.root, className)}
                ref={ref}
                {...others}
            >
                {children}
            </Box>
        </ListProvider>
    )
}) as any

List.Item = ListItem
List.displayName = '@worldprinter/wdesign-core/List'
