import { Tabs } from '@worldprinter/wdesign-core'
import type { ForwardRefWithStaticComponents } from '@worldprinter/wdesign-utils'

import type { PrismProps } from './Prism/Prism'
import { Prism } from './Prism/Prism'
import { PrismPanel, PrismTabs } from './PrismTabs/PrismTabs'

export type { PrismTheme } from 'prism-react-renderer'

export type { PrismProps, PrismStylesNames } from './Prism/Prism'
export type { PrismStylesParams } from './Prism/Prism.styles'

type PrismComponent = ForwardRefWithStaticComponents<
    PrismProps,
    {
        Tabs: typeof PrismTabs
        TabsList: typeof Tabs.List
        Tab: typeof Tabs.Tab
        Panel: typeof PrismPanel
    }
>

const PrismExport: PrismComponent = Prism as any

PrismExport.Tabs = PrismTabs
PrismExport.Tab = Tabs.Tab
PrismExport.TabsList = Tabs.List
PrismExport.Panel = PrismPanel

export { PrismExport as Prism }
