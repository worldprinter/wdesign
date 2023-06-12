import type { Variants, WDesignColor, WDesignNumberSize } from '@worldprinter/wdesign-styles'

export type TabsValue = string | null
export type TabsOrientation = 'horizontal' | 'vertical'
export type TabsVariant = Variants<'default' | 'outline' | 'pills'>
export type TabsPosition = 'left' | 'center' | 'right' | 'apart'
export type TabsPlacement = 'right' | 'left'

export type TabsStylesParams = {
    placement: TabsPlacement
    orientation: TabsOrientation
    color?: WDesignColor
    radius?: WDesignNumberSize
    inverted: boolean
}
