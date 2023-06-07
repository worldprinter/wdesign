import React, { useState } from 'react'

import { useId, useUncontrolled } from '@worldprinter/wdesign-hooks'
import type { ClassNames, MantineColor, MantineNumberSize, Styles } from '@worldprinter/wdesign-styles'
import { getSafeId } from '@worldprinter/wdesign-utils'

import type { TabsStylesNames } from './Tabs'
import { TabsContextProvider } from './Tabs.context'
import { TABS_ERRORS } from './Tabs.errors'
import type { TabsOrientation, TabsPlacement, TabsStylesParams, TabsValue, TabsVariant } from './Tabs.types'

export type TabsProviderProps = {
    /** Default value for uncontrolled component */
    defaultValue?: TabsValue

    /** Value for controlled component */
    value?: TabsValue

    /** Callback for controlled component */
    onTabChange?(value: TabsValue): void

    /** Tabs orientation, vertical or horizontal */
    orientation?: TabsOrientation

    /** Tabs.List placement relative to Tabs.Panel, applicable only for orientation="vertical", left by default */
    placement?: TabsPlacement

    /** Base id, used to generate ids that connect labels with controls, by default generated randomly */
    id?: string

    /** Determines whether arrow key presses should loop though items (first to last and last to first) */
    loop?: boolean

    /** Determines whether tab should be activated with arrow key press, defaults to true */
    activateTabWithKeyboard?: boolean

    /** Determines whether tab can be deactivated, defaults to false */
    allowTabDeactivation?: boolean

    /** Tabs content */
    children: React.ReactNode

    /** Controls component visuals */
    variant?: TabsVariant

    /** Key of theme.colors */
    color?: MantineColor

    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize

    /** Determines whether tabs should have inverted styles */
    inverted?: boolean

    /** If set to false, Tabs.Panel content will not stay mounted when tab is not active */
    keepMounted?: boolean
}

type _TabsProviderProps = {
    classNames?: ClassNames<TabsStylesNames>
    styles?: Styles<TabsStylesNames, TabsStylesParams>
    unstyled?: boolean
} & TabsProviderProps

export function TabsProvider({
    defaultValue,
    value,
    onTabChange,
    orientation,
    children,
    loop,
    id,
    activateTabWithKeyboard,
    allowTabDeactivation,
    variant,
    color,
    radius,
    inverted,
    placement,
    keepMounted = true,
    classNames,
    styles,
    unstyled,
}: _TabsProviderProps) {
    const uid = useId(id)

    const [mountedPanelIds, setMountedPanelIds] = useState([])

    const [_value, onChange] = useUncontrolled<TabsValue>({
        value,
        defaultValue,
        finalValue: null,
        onChange: onTabChange,
    })

    return (
        <TabsContextProvider
            value={{
                placement,
                value: _value,
                orientation,
                id: uid,
                loop,
                activateTabWithKeyboard,
                getTabId: getSafeId(`${uid}-tab`, TABS_ERRORS.value),
                getPanelId: getSafeId(`${uid}-panel`, TABS_ERRORS.value),
                onTabChange: onChange,
                setMountedPanelIds,
                mountedPanelIds,
                allowTabDeactivation,
                variant,
                color,
                radius,
                inverted,
                keepMounted,
                classNames,
                styles,
                unstyled,
            }}
        >
            {children}
        </TabsContextProvider>
    )
}

TabsProvider.displayName = '@worldprinter/wdesign-core/TabsProvider'
