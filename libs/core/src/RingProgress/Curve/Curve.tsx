import React from 'react'

import type { WDesignColor } from '@worldprinter/wdesign-styles'
import { useWDesignTheme } from '@worldprinter/wdesign-styles'

import { Tooltip } from '../../Tooltip'
import { getCurveProps } from './get-curve-props'

type CurveProps = {
    value?: number
    size: number
    offset: number
    sum: number
    thickness: number
    lineRoundCaps: boolean
    root?: boolean
    color?: WDesignColor
    tooltip?: React.ReactNode
} & React.ComponentPropsWithRef<'circle'>

export function Curve({
    size,
    value,
    offset,
    sum,
    thickness,
    root,
    color,
    lineRoundCaps,
    tooltip,
    ...others
}: CurveProps) {
    const theme = useWDesignTheme()
    const stroke = theme.fn.themeColor(
        color || (theme.colorScheme === 'dark' ? 'dark' : 'gray'),
        color ? theme.fn.primaryShade() : theme.colorScheme === 'dark' ? 4 : 1,
        false,
    )

    return (
        <Tooltip.Floating
            disabled={!tooltip}
            label={tooltip}
        >
            <circle
                {...others}
                fill='none'
                strokeLinecap={lineRoundCaps ? 'round' : 'butt'}
                stroke={stroke}
                {...getCurveProps({ sum, size, thickness, value, offset, root })}
            />
        </Tooltip.Floating>
    )
}

Curve.displayName = '@worldprinter/wdesign-core/Curve'
