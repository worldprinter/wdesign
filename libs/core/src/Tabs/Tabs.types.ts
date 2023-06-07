import type { MantineColor, MantineNumberSize, Variants } from '@worldprinter/wdesign-styles'

export type TabsValue = string | null
export type TabsOrientation = 'horizontal' | 'vertical'
export type TabsVariant = Variants<'default' | 'outline' | 'pills'>
export type TabsPosition = 'left' | 'center' | 'right' | 'apart'
export type TabsPlacement = 'right' | 'left'

export type TabsStylesParams = {
    placement: TabsPlacement
    orientation: TabsOrientation
    color?: MantineColor
    radius?: MantineNumberSize
    inverted: boolean
}
