import type { CSSProperties } from 'react'
import React, { forwardRef } from 'react'

import type { DefaultProps, SpacingValue, SystemProp } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { packSx } from '@worldprinter/wdesign-utils'

import { Box, getSystemStyles } from '../Box'
import { FLEX_SYSTEM_PROPS } from './flex-props'

export type FlexProps = {
    /** gap CSS property */
    gap?: SystemProp<SpacingValue>

    /** row-gap CSS property */
    rowGap?: SystemProp<SpacingValue>

    /** column-gap CSS property */
    columnGap?: SystemProp<SpacingValue>

    /** align-items CSS property */
    align?: SystemProp<CSSProperties['alignItems']>

    /** justify-content CSS property */
    justify?: SystemProp<CSSProperties['justifyContent']>

    /** flex-wrap CSS property */
    wrap?: SystemProp<CSSProperties['flexWrap']>

    /** flex-direction CSS property */
    direction?: SystemProp<CSSProperties['flexDirection']>
} & DefaultProps &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<FlexProps> = {}

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
    const { gap, rowGap, columnGap, align, justify, wrap, direction, sx, ...others } = useComponentDefaultProps(
        'Flex',
        defaultProps,
        props,
    )

    return (
        <Box
            {...others}
            sx={[
                { display: 'flex' },
                (theme) =>
                    getSystemStyles(
                        { gap, rowGap, columnGap, align, justify, wrap, direction },
                        theme,
                        FLEX_SYSTEM_PROPS,
                    ),
                ...packSx(sx),
            ]}
            ref={ref}
        />
    )
})

Flex.displayName = '@worldprinter/wdesign-core/Flex'
