import React, { forwardRef, useCallback } from 'react'

import type { DefaultProps, Selectors, WDesignNumberSize } from '@worldprinter/wdesign-core'
import { Box } from '@worldprinter/wdesign-core'

import { useCarouselContext } from '../Carousel.context'
import useStyles from './CarouselSlide.styles'

export type CarouselSlideStylesNames = Selectors<typeof useStyles>

export type CarouselSlideProps = {
    /** Slide content */
    children?: React.ReactNode

    /** Slide width, defaults to 100%, examples: 40rem, 50% */
    size?: string | number

    /** Key of theme.spacing or number to set gap between slides */
    gap?: WDesignNumberSize
} & DefaultProps &
    React.ComponentPropsWithoutRef<'div'>

export const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(
    ({ children, className, size, gap, onClick, ...others }, ref) => {
        const ctx = useCarouselContext()
        const { classes, cx } = useStyles(
            {
                gap: typeof gap === 'undefined' ? ctx.slideGap : gap,
                size: typeof size === 'undefined' ? ctx.slideSize : size,
                orientation: ctx.orientation,
                includeGapInSize: ctx.includeGapInSize,
                breakpoints: ctx.breakpoints,
            },
            {
                name: 'Carousel',
                classNames: ctx.classNames,
                styles: ctx.styles,
                unstyled: ctx.unstyled,
                variant: ctx.variant,
            },
        )

        const handleClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (ctx.embla?.clickAllowed()) {
                    onClick?.(event)
                }
            },
            [ctx.embla, onClick],
        )

        return (
            <Box
                className={cx(classes.slide, className)}
                ref={ref}
                onClick={handleClick}
                {...others}
            >
                {children}
            </Box>
        )
    },
)

CarouselSlide.displayName = '@worldprinter/wdesign-carousel/CarouselSlide'
