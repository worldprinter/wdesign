import type { ClassNames, Styles, WDesignColor, WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { createSafeContext } from '@worldprinter/wdesign-utils'

import type { TabsStylesNames } from './Tabs'
import { TABS_ERRORS } from './Tabs.errors'
import type { TabsOrientation, TabsPlacement, TabsStylesParams, TabsValue, TabsVariant } from './Tabs.types'

type TabsContext = {
    id: string
    value: TabsValue
    orientation: TabsOrientation
    loop: boolean
    activateTabWithKeyboard: boolean
    allowTabDeactivation: boolean
    onTabChange(value: TabsValue): void
    getTabId(value: string): string
    getPanelId(value: string): string
    setMountedPanelIds(values: string[] | ((oldValue: string[]) => string[])): void
    mountedPanelIds: string[]
    variant: TabsVariant
    color: WDesignColor
    radius: WDesignNumberSize
    inverted: boolean
    keepMounted: boolean
    placement: TabsPlacement
    classNames: ClassNames<TabsStylesNames>
    styles: Styles<TabsStylesNames, TabsStylesParams>
    unstyled: boolean
}

export const [TabsContextProvider, useTabsContext] = createSafeContext<TabsContext>(TABS_ERRORS.context)
