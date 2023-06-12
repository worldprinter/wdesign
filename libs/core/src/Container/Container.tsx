import React, { forwardRef } from 'react'

import type { DefaultProps, WDesignNumberSize, WDesignSize } from '@worldprinter/wdesign-styles'
import { rem, useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import useStyles from './Container.styles'

export type ContainerProps = {
    variant?: string

    /** Predefined container max-width or number for max-width */
    size?: WDesignNumberSize

    /** If fluid is set to true, size prop is ignored and Container can expand to 100% of width */
    fluid?: boolean

    /** Container sizes */
    sizes?: Record<WDesignSize, number | string>
} & DefaultProps &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<ContainerProps> = {
    sizes: {
        xs: rem(540),
        sm: rem(720),
        md: rem(960),
        lg: rem(1140),
        xl: rem(1320),
    },
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>((props: ContainerProps, ref) => {
    const { className, fluid, size, unstyled, sizes, variant, ...others } = useComponentDefaultProps(
        'Container',
        defaultProps,
        props,
    )

    const { classes, cx } = useStyles({ fluid, sizes }, { unstyled, name: 'Container', variant, size })

    return (
        <Box
            className={cx(classes.root, className)}
            ref={ref}
            {...others}
        />
    )
})

Container.displayName = '@worldprinter/wdesign-core/Container'
