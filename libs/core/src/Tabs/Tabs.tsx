import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import type { ForwardRefWithStaticComponents } from '@worldprinter/wdesign-utils'

import { Box } from '../Box'
import type { TabStylesNames } from './Tab/Tab'
import { Tab } from './Tab/Tab'
import useStyles from './Tabs.styles'
import type { TabsStylesParams } from './Tabs.types'
import type { TabsListStylesNames } from './TabsList/TabsList'
import { TabsList } from './TabsList/TabsList'
import type { TabsPanelStylesNames } from './TabsPanel/TabsPanel'
import { TabsPanel } from './TabsPanel/TabsPanel'
import type { TabsProviderProps } from './TabsProvider'
import { TabsProvider } from './TabsProvider'

export type TabsStylesNames = Selectors<typeof useStyles> | TabsListStylesNames | TabsPanelStylesNames | TabStylesNames

export type TabsProps = {} & TabsProviderProps &
    DefaultProps<TabsStylesNames, TabsStylesParams> &
    Omit<React.ComponentPropsWithRef<'div'>, keyof TabsProviderProps>

type TabsComponent = ForwardRefWithStaticComponents<
    TabsProps,
    {
        List: typeof TabsList
        Tab: typeof Tab
        Panel: typeof TabsPanel
    }
>

const defaultProps: Partial<TabsProps> = {
    orientation: 'horizontal',
    loop: true,
    activateTabWithKeyboard: true,
    allowTabDeactivation: false,
    unstyled: false,
    inverted: false,
    variant: 'default',
    placement: 'left',
}

export const Tabs: TabsComponent = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
    const {
        defaultValue,
        value,
        orientation,
        loop,
        activateTabWithKeyboard,
        allowTabDeactivation,
        children,
        id,
        onTabChange,
        variant,
        color,
        className,
        unstyled,
        classNames,
        styles,
        radius,
        inverted,
        keepMounted,
        placement,
        ...others
    } = useComponentDefaultProps('Tabs', defaultProps, props)

    const { classes, cx } = useStyles(
        { orientation, color, radius, inverted, placement },
        { unstyled, name: 'Tabs', classNames, styles, variant },
    )

    return (
        <TabsProvider
            activateTabWithKeyboard={activateTabWithKeyboard}
            defaultValue={defaultValue}
            orientation={orientation}
            onTabChange={onTabChange}
            value={value}
            id={id}
            loop={loop}
            allowTabDeactivation={allowTabDeactivation}
            color={color}
            variant={variant}
            radius={radius}
            inverted={inverted}
            keepMounted={keepMounted}
            placement={placement}
            classNames={classNames}
            styles={styles}
            unstyled={unstyled}
        >
            <Box
                {...others}
                className={cx(classes.root, className)}
                id={id}
                ref={ref}
            >
                {children}
            </Box>
        </TabsProvider>
    )
}) as any

Tabs.List = TabsList
Tabs.Tab = Tab
Tabs.Panel = TabsPanel

Tabs.displayName = '@worldprinter/wdesign-core/Tabs'
