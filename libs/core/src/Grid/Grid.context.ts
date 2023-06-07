import type { MantineNumberSize } from '@worldprinter/wdesign-styles'
import { createSafeContext } from '@worldprinter/wdesign-utils'

type GridContextValue = {
    gutter: MantineNumberSize
    gutterXs: MantineNumberSize
    gutterSm: MantineNumberSize
    gutterMd: MantineNumberSize
    gutterLg: MantineNumberSize
    gutterXl: MantineNumberSize
    grow: boolean
    columns: number
}

export const [GridProvider, useGridContext] = createSafeContext<GridContextValue>(
    'Grid component was not found in tree',
)
