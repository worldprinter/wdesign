/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react'

import type { DefaultProps, MantineNumberSize } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import type { StackStylesParams } from './Stack.styles'
import useStyles from './Stack.styles'

export type StackProps = {
    variant?: string

    /** Key of theme.spacing or any valid CSS value to set gap */
    spacing?: MantineNumberSize

    /** align-items CSS property */
    align?: React.CSSProperties['alignItems']

    /** justify-content CSS property */
    justify?: React.CSSProperties['justifyContent']
} & DefaultProps<never, StackStylesParams> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<StackProps> = {
    spacing: 'md',
    align: 'stretch',
    justify: 'flex-start',
}

export const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
    const { spacing, className, align, justify, unstyled, variant, ...others } = useComponentDefaultProps(
        'Stack',
        defaultProps,
        props,
    )

    const { classes, cx } = useStyles({ spacing, align, justify }, { name: 'Stack', unstyled, variant })

    return (
        <Box
            className={cx(classes.root, className)}
            ref={ref}
            {...others}
        />
    )
})

Stack.displayName = '@worldprinter/wdesign-core/Stack'
