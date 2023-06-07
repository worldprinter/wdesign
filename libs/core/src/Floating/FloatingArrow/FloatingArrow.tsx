import React, { forwardRef } from 'react'

import { useMantineTheme } from '@worldprinter/wdesign-styles'

import type { ArrowPosition, FloatingPosition } from '../types'
import { getArrowPositionStyles } from './get-arrow-position-styles'

type FloatingArrowProps = {
    position: FloatingPosition
    arrowSize: number
    arrowOffset: number
    arrowRadius: number
    arrowPosition: ArrowPosition
    arrowX: number
    arrowY: number
    visible: boolean
} & React.ComponentPropsWithoutRef<'div'>

export const FloatingArrow = forwardRef<HTMLDivElement, FloatingArrowProps>(
    ({ position, arrowSize, arrowOffset, arrowRadius, arrowPosition, visible, arrowX, arrowY, ...others }, ref) => {
        const theme = useMantineTheme()
        if (!visible) {
            return null
        }

        return (
            <div
                {...others}
                ref={ref}
                style={getArrowPositionStyles({
                    position,
                    arrowSize,
                    arrowOffset,
                    arrowRadius,
                    arrowPosition,
                    dir: theme.dir,
                    arrowX,
                    arrowY,
                })}
            />
        )
    },
)

FloatingArrow.displayName = '@worldprinter/wdesign-core/FloatingArrow'
