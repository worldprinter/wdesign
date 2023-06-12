import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors, WDesignNumberSize } from '@worldprinter/wdesign-styles'

import { Box } from '../../Box'
import useStyles from './SliderRoot.styles'

export type SliderRootStylesNames = Selectors<typeof useStyles>

export type SliderRootProps = {
    size: WDesignNumberSize
    children: React.ReactNode
    disabled: boolean
    variant: string
} & DefaultProps<SliderRootStylesNames> &
    React.ComponentPropsWithoutRef<'div'>

export const SliderRoot = forwardRef<HTMLDivElement, SliderRootProps>(
    ({ className, size, classNames, styles, disabled, unstyled, variant, ...others }: SliderRootProps, ref) => {
        const { classes, cx } = useStyles(null, {
            name: 'Slider',
            classNames,
            styles,
            unstyled,
            variant,
            size,
        })
        return (
            <Box
                {...others}
                tabIndex={-1}
                className={cx(classes.root, className)}
                ref={ref}
            />
        )
    },
)

SliderRoot.displayName = '@worldprinter/wdesign-core/SliderRoot'
