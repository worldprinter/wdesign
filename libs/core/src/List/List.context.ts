import type { ClassNames, Styles, WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { createSafeContext } from '@worldprinter/wdesign-utils'

import type { ListStylesNames } from './List'

type ListContextValue = {
    spacing?: WDesignNumberSize
    center?: boolean
    icon?: React.ReactNode
    listStyleType?: string
    withPadding?: boolean
    size?: WDesignNumberSize
    classNames?: ClassNames<ListStylesNames>
    styles?: Styles<ListStylesNames>
    unstyled?: boolean
    variant?: string
}

export const [ListProvider, useListContext] = createSafeContext<ListContextValue>(
    'List component was not found in tree',
)
