import type { WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { createSafeContext } from '@worldprinter/wdesign-utils'

type GridContextValue = {
    gutter: WDesignNumberSize
    gutterXs: WDesignNumberSize
    gutterSm: WDesignNumberSize
    gutterMd: WDesignNumberSize
    gutterLg: WDesignNumberSize
    gutterXl: WDesignNumberSize
    grow: boolean
    columns: number
}

export const [GridProvider, useGridContext] = createSafeContext<GridContextValue>(
    'Grid component was not found in tree',
)
