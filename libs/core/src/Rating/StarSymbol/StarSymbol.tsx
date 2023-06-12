import React from 'react'

import type { WDesignColor, WDesignSize } from '@worldprinter/wdesign-styles'

import { StarIcon } from './StarIcon'
import useStyles from './StarSymbol.styles'

export type StarSymbolProps = {
    size: WDesignSize
    color: WDesignColor
    type: 'empty' | 'full'
}

export function StarSymbol({ size, type, color }: StarSymbolProps) {
    const { classes } = useStyles({ type, color }, { name: 'Rating', size })
    return <StarIcon className={classes.icon} />
}

StarSymbol.displayName = '@worldprinter/wdesign-core/StarSymbol'
