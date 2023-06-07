import React from 'react'

import {
    DefaultProps,
    getSize,
    MantineColor,
    MantineNumberSize,
    MantineTheme,
    rem,
    useComponentDefaultProps,
    useMantineTheme,
} from '@worldprinter/wdesign-styles'

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

export interface LoaderProps extends DefaultProps, Omit<React.ComponentPropsWithoutRef<'svg'>, 'display' | 'opacity'> {
    /** Defines width of loader */
    size?: MantineNumberSize

    /** Loader color from theme */
    color?: MantineColor

    /** Loader appearance */
    variant?: MantineTheme['loader']
}

const defaultProps: Partial<LoaderProps> = {
    size: 'md',
}

export function Loader(props: LoaderProps) {
    const { size, color, variant, ...others } = useComponentDefaultProps('Loader', defaultProps, props)
    const theme = useMantineTheme()
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
