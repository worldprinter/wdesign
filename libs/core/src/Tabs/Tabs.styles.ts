import { createStyles } from '@worldprinter/wdesign-styles'

import type { TabsStylesParams } from './Tabs.types'

export default createStyles((_theme, { orientation, placement }: TabsStylesParams) => ({
    root: {
        display: orientation === 'vertical' ? 'flex' : undefined,
        flexDirection: placement === 'right' ? 'row-reverse' : 'row',
    },
}))
