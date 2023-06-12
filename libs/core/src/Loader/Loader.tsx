import React from 'react'

import type { DefaultProps, WDesignColor, WDesignNumberSize, WDesignTheme } from '@worldprinter/wdesign-styles'
import { getSize, rem, useComponentDefaultProps, useWDesignTheme } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import { Bars } from './loaders/Bars'
import { Dots } from './loaders/Dots'
import { Oval } from './loaders/Oval'

const LOADERS = {
    bars: Bars,
    oval: Oval,
    dots: Dots,
}

const sizes = {
    xs: rem(18),
    sm: rem(22),
    md: rem(36),
    lg: rem(44),
    xl: rem(58),
}

export type LoaderProps = {
    /** Defines width of loader */
    size?: WDesignNumberSize

    /** Loader color from theme */
    color?: WDesignColor

    /** Loader appearance */
    variant?: WDesignTheme['loader']
} & DefaultProps &
    Omit<React.ComponentPropsWithoutRef<'svg'>, 'display' | 'opacity'>

const defaultProps: Partial<LoaderProps> = {
    size: 'md',
}

export function Loader(props: LoaderProps) {
    const { size, color, variant, ...others } = useComponentDefaultProps('Loader', defaultProps, props)
    const theme = useWDesignTheme()
    const defaultLoader = variant in LOADERS ? variant : theme.loader

    return (
        <Box
            role='presentation'
            component={LOADERS[defaultLoader] || LOADERS.bars}
            size={getSize({ size, sizes })}
            color={
                theme.fn.variant({
                    variant: 'filled',
                    primaryFallback: false,
                    color: color || theme.primaryColor,
                }).background
            }
            {...others}
        />
    )
}

Loader.displayName = '@worldprinter/wdesign-core/Loader'
