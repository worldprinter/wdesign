import type React from 'react'

import type { WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { createStyles, getSize, rem } from '@worldprinter/wdesign-styles'

export type GroupPosition = 'right' | 'center' | 'left' | 'apart'

export type GroupStylesParams = {
    position: GroupPosition
    noWrap: boolean
    grow: boolean
    spacing: WDesignNumberSize
    align: React.CSSProperties['alignItems']
    count: number
}

export const GROUP_POSITIONS = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    apart: 'space-between',
}

export default createStyles((theme, { spacing, position, noWrap, grow, align, count }: GroupStylesParams) => ({
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        alignItems: align || 'center',
        flexWrap: noWrap ? 'nowrap' : 'wrap',
        justifyContent: GROUP_POSITIONS[position],
        gap: getSize({ size: spacing, sizes: theme.spacing }),
        '& > *': {
            boxSizing: 'border-box',
            maxWidth: grow
                ? `calc(${100 / count}% - (${rem(getSize({ size: spacing, sizes: theme.spacing }))} - ${getSize({
                      size: spacing,
                      sizes: theme.spacing,
                  })} / ${count}))`
                : undefined,
            flexGrow: grow ? 1 : 0,
        },
    },
}))
