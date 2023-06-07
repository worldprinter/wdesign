import React, { forwardRef } from 'react'

import type { DefaultProps, MantineNumberSize } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import { Box } from '../Box'
import type { BackgroundImageStylesParams } from './BackgroundImage.styles'
import useStyles from './BackgroundImage.styles'

export type BackgroundImageProps = {
    variant?: string

    /** Image url */
    src: string

    /** Key of theme.radius or any valid CSS value to set border-radius, 0 by default */
    radius?: MantineNumberSize
} & DefaultProps<never, BackgroundImageStylesParams> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<BackgroundImageProps> = {
    radius: 0,
}

export const _BackgroundImage = forwardRef<HTMLDivElement, BackgroundImageProps>((props, ref) => {
    const { src, radius, variant, unstyled, className, ...others } = useComponentDefaultProps(
        'BackgroundImage',
        defaultProps,
        props,
    )

    const { classes, cx } = useStyles({ radius, src }, { name: 'BackgroundImage', variant, unstyled })

    return (
        <Box
            {...others}
            ref={ref}
            className={cx(classes.root, className)}
        />
    )
})

_BackgroundImage.displayName = '@worldprinter/wdesign-core/BackgroundImage'

export const BackgroundImage = createPolymorphicComponent<'div', BackgroundImageProps>(_BackgroundImage)
