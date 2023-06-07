import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../../Box'
import { useTabsContext } from '../Tabs.context'
import type { TabsPosition } from '../Tabs.types'
import useStyles from './TabsList.styles'

export type TabsListStylesNames = Selectors<typeof useStyles>

export type TabsListProps = {
    /** <Tabs.Tab /> components */
    children: React.ReactNode

    /** Determines whether tabs should take the whole space */
    grow?: boolean

    /** Tabs alignment */
    position?: TabsPosition
} & DefaultProps &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<TabsListProps> = {
    grow: false,
    position: 'left',
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>((props, ref) => {
    const { children, className, grow, position, ...others } = useComponentDefaultProps('TabsList', defaultProps, props)

    const { orientation, variant, color, radius, inverted, placement, classNames, styles, unstyled } = useTabsContext()
    const { classes, cx } = useStyles(
        { orientation, grow, color, position, radius, inverted, placement },
        { name: 'Tabs', unstyled, classNames, styles, variant },
    )

    return (
        <Box
            {...others}
            className={cx(classes.tabsList, className)}
            ref={ref}
            role='tablist'
            aria-orientation={orientation}
        >
            {children}
        </Box>
    )
})

TabsList.displayName = '@worldprinter/wdesign-core/TabsList'
