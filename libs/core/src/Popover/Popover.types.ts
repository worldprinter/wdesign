import type { Selectors } from '@worldprinter/wdesign-styles'

import type useStyles from './PopoverDropdown/PopoverDropdown.styles'

export type { PopoverStylesParams } from './PopoverDropdown/PopoverDropdown.styles'

export type PopoverStylesNames = Selectors<typeof useStyles>

export type PopoverWidth = 'target' | React.CSSProperties['width']

export type PopoverMiddlewares = {
    shift: boolean
    flip: boolean
    inline?: boolean
}
