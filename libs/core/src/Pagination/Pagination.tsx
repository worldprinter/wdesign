import React from 'react'

import { getSize, useComponentDefaultProps, useMantineTheme } from '@worldprinter/wdesign-styles'

import type { GroupProps } from '../Group'
import { Group } from '../Group'
import type { PaginationIcon } from './Pagination.icons'
import { PaginationControl } from './PaginationControl/PaginationControl'
import { PaginationDots } from './PaginationDots/PaginationDots'
import { PaginationFirst, PaginationLast, PaginationNext, PaginationPrevious } from './PaginationEdges/PaginationEdges'
import { PaginationItems } from './PaginationItems/PaginationItems'
import type { PaginationRootSettings } from './PaginationRoot/PaginationRoot'
import { PaginationRoot } from './PaginationRoot/PaginationRoot'

export type PaginationProps = {
    /** Determines whether first/last controls should be rendered, false by default */
    withEdges?: boolean

    /** Determines whether next/previous controls should be rendered, true by default */
    withControls?: boolean

    /** Adds props to next/previous/first/last controls */
    getControlProps?(control: 'first' | 'previous' | 'last' | 'next'): Record<string, any>

    /** Next control icon component */
    nextIcon?: PaginationIcon

    /** Previous control icon component */
    previousIcon?: PaginationIcon

    /** Last control icon component */
    lastIcon?: PaginationIcon

    /** First control icon component */
    firstIcon?: PaginationIcon

    /** Dots icon component */
    dotsIcon?: PaginationIcon
} & PaginationRootSettings &
    Omit<GroupProps, keyof PaginationRootSettings>

const defaultProps: Partial<PaginationProps> = {
    withControls: true,
    siblings: 1,
    boundaries: 1,
}

export function Pagination(props: PaginationProps) {
    const {
        withEdges,
        withControls,
        classNames,
        styles,
        unstyled,
        variant,
        size,
        total,
        value,
        defaultValue,
        onChange,
        disabled,
        siblings,
        boundaries,
        color,
        radius,
        onNextPage,
        onPreviousPage,
        onFirstPage,
        onLastPage,
        getItemProps,
        getControlProps,
        spacing,
        nextIcon,
        previousIcon,
        lastIcon,
        firstIcon,
        dotsIcon,
        ...others
    } = useComponentDefaultProps('Pagination', defaultProps, props)
    const theme = useMantineTheme()

    if (total <= 0) {
        return null
    }

    return (
        <PaginationRoot
            classNames={classNames}
            styles={styles}
            unstyled={unstyled}
            variant={variant}
            size={size}
            total={total}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            siblings={siblings}
            boundaries={boundaries}
            color={color}
            radius={radius}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
            getItemProps={getItemProps}
        >
            <Group
                spacing={spacing ?? `calc(${getSize({ size, sizes: theme.spacing })} / 2)`}
                {...others}
            >
                {withEdges && (
                    <PaginationFirst
                        icon={firstIcon}
                        {...getControlProps?.('first')}
                    />
                )}
                {withControls && (
                    <PaginationPrevious
                        icon={previousIcon}
                        {...getControlProps?.('previous')}
                    />
                )}
                <PaginationItems dotsIcon={dotsIcon} />
                {withControls && (
                    <PaginationNext
                        icon={nextIcon}
                        {...getControlProps?.('next')}
                    />
                )}
                {withEdges && (
                    <PaginationLast
                        icon={lastIcon}
                        {...getControlProps?.('last')}
                    />
                )}
            </Group>
        </PaginationRoot>
    )
}

Pagination.displayName = '@worldprinter/wdesign-core/Pagination'
Pagination.Root = PaginationRoot
Pagination.Items = PaginationItems
Pagination.Control = PaginationControl
Pagination.Dots = PaginationDots
Pagination.Next = PaginationNext
Pagination.Previous = PaginationPrevious
Pagination.Last = PaginationLast
Pagination.First = PaginationFirst
