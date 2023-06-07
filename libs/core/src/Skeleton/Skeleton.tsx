import React, { forwardRef } from 'react'

import type { DefaultProps, MantineNumberSize } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import type { SkeletonStylesParams } from './Skeleton.styles'
import useStyles from './Skeleton.styles'

export type SkeletonProps = {
    variant?: string

    /** Should skeleton overlay be displayed */
    visible?: boolean

    /** Skeleton height */
    height?: number | string

    /** Skeleton width */
    width?: number | string

    /** If Skeleton is a circle, it's width and border-radius will be equal to height */
    circle?: boolean

    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize

    /** Whether to show the animation effect */
    animate?: boolean
} & DefaultProps<never, SkeletonStylesParams> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<SkeletonProps> = {
    height: 'auto',
    width: '100%',
    visible: true,
    animate: true,
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
    const { height, width, visible, animate, className, circle, radius, unstyled, variant, ...others } =
        useComponentDefaultProps('Skeleton', defaultProps, props)

    const { classes, cx } = useStyles(
        { height, width, circle, radius, animate },
        { name: 'Skeleton', unstyled, variant },
    )

    return (
        <Box
            className={cx(classes.root, { [classes.visible]: visible }, className)}
            ref={ref}
            {...others}
        />
    )
})

Skeleton.displayName = '@worldprinter/wdesign-core/Skeleton'
