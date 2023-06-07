import { createSafeContext } from '@worldprinter/wdesign-utils'

export type ScrollAreaComponent = React.FC<any>

type DrawerContext = {
    scrollAreaComponent: ScrollAreaComponent
}

export const [DrawerProvider, useDrawerContext] = createSafeContext<DrawerContext>(
    'Drawer component was not found in tree',
)
