/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors, WDesignColor, WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { getDefaultZIndex, useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import type { IndicatorStylesParams } from './Indicator.styles'
import useStyles from './Indicator.styles'
import type { IndicatorPosition } from './Indicator.types'

export type IndicatorStylesNames = Selectors<typeof useStyles>

export type IndicatorProps = {
    variant?: string

    /** Element that should have an indicator */
    children: React.ReactNode

    /** Indicator position relative to child element */
    position?: IndicatorPosition

    /** Changes position offset, usually used when element has border-radius */
    offset?: number

    /** Determines whether indicator container should be an inline element */
    inline?: boolean

    /** Indicator width and height */
    size?: number | string

    /** Indicator label */
    label?: React.ReactNode

    /** Key of theme.radius or any valid CSS value to set border-radius, 1000rem by default */
    radius?: WDesignNumberSize

    /** Color from theme.colors or any other valid CSS color value */
    color?: WDesignColor

    /** Determines whether indicator should have border */
    withBorder?: boolean

    /** When component is disabled it renders children without indicator */
    disabled?: boolean

    /** Indicator processing animation */
    processing?: boolean

    /** Indicator z-index */
    zIndex?: React.CSSProperties['zIndex']
} & DefaultProps<IndicatorStylesNames, IndicatorStylesParams> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<IndicatorProps> = {
    position: 'top-end',
    offset: 0,
    inline: false,
    withBorder: false,
    disabled: false,
    processing: false,
    size: 10,
    radius: 1000,
    zIndex: getDefaultZIndex('app'),
}

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>((props, ref) => {
    const {
        children,
        position,
        offset,
        size,
        radius,
        inline,
        withBorder,
        className,
        color,
        styles,
        label,
        classNames,
        disabled,
        zIndex,
        unstyled,
        processing,
        variant,
        ...others
    } = useComponentDefaultProps('Indicator', defaultProps, props)

    const { classes, cx } = useStyles(
        { position, offset, radius, inline, color, withBorder, zIndex, withLabel: !!label },
        { name: 'Indicator', classNames, styles, unstyled, variant, size },
    )

    return (
        <Box
            ref={ref}
            className={cx(classes.root, className)}
            {...others}
        >
            {!disabled && (
                <>
                    <div className={cx(classes.indicator, classes.common)}>{label}</div>
                    {processing && <div className={cx(classes.processing, classes.common)} />}
                </>
            )}
            {children}
        </Box>
    )
})

Indicator.displayName = '@worldprinter/wdesign-core/Indicator'
