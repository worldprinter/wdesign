import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors, WDesignColor } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import { Curve } from './Curve/Curve'
import { getCurves } from './get-curves/get-curves'
import useStyles from './RingProgress.styles'

export type RingProgressStylesNames = Selectors<typeof useStyles>

type RingProgressSection = {
    value: number
    color: WDesignColor
    tooltip?: React.ReactNode
} & React.ComponentPropsWithRef<'circle'>

export type RingProgressProps = {
    variant?: string

    /** Label displayed in the center of the ring */
    label?: React.ReactNode

    /** Ring thickness */
    thickness?: number

    /** Width and height of the progress ring */
    size?: number

    /** Sets whether the edges of the progress circle are rounded */
    roundCaps?: boolean

    /** Ring sections */
    sections: RingProgressSection[]

    /** Color of the root section, key of theme.colors or CSS color value */
    rootColor?: WDesignColor
} & DefaultProps<RingProgressStylesNames> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<RingProgressProps> = {
    size: 120,
    thickness: 12,
}

export const RingProgress = forwardRef<HTMLDivElement, RingProgressProps>((props, ref) => {
    const {
        className,
        style,
        label,
        sections,
        size,
        thickness,
        classNames,
        styles,
        roundCaps,
        rootColor,
        unstyled,
        variant,
        ...others
    } = useComponentDefaultProps('RingProgress', defaultProps, props)

    const { classes, cx } = useStyles(null, {
        name: 'RingProgress',
        classNames,
        styles,
        unstyled,
        variant,
    })

    const curves = getCurves({
        size,
        thickness,
        sections,
        renderRoundedLineCaps: roundCaps,
        rootColor,
    }).map(({ data, sum, root, lineRoundCaps, offset }, index) => (
        <Curve
            {...data}
            key={index}
            size={size}
            thickness={thickness}
            sum={sum}
            offset={offset}
            color={data?.color}
            root={root}
            lineRoundCaps={lineRoundCaps}
        />
    ))

    return (
        <Box
            style={{ width: size, height: size, ...style }}
            className={cx(classes.root, className)}
            ref={ref}
            {...others}
        >
            <svg
                width={size}
                height={size}
                style={{ transform: 'rotate(-90deg)' }}
            >
                {curves}
            </svg>

            {label && (
                <div
                    className={classes.label}
                    style={{ right: thickness * 2, left: thickness * 2 }}
                >
                    {label}
                </div>
            )}
        </Box>
    )
})

RingProgress.displayName = '@worldprinter/wdesign-core/RingProgress'
