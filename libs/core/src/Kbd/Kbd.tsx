import React, { forwardRef } from 'react'

import type { DefaultProps, WDesignSize } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import useStyles from './Kbd.styles'

export type KbdProps = {
    variant?: string

    /** Keyboard key */
    children: React.ReactNode

    /** Controls component size, 'sm' by default */
    size?: WDesignSize
} & DefaultProps &
    React.ComponentPropsWithoutRef<'kbd'>

const defaultProps: Partial<KbdProps> = {
    size: 'sm',
}

export const Kbd = forwardRef<HTMLElement, KbdProps>((props: KbdProps, ref) => {
    const { className, children, unstyled, variant, size, ...others } = useComponentDefaultProps(
        'Kbd',
        defaultProps,
        props,
    )

    const { classes, cx } = useStyles(null, {
        name: 'Kbd',
        unstyled,
        variant,
        size,
    })

    return (
        <Box
            component='kbd'
            className={cx(classes.root, className)}
            ref={ref}
            {...others}
        >
            {children}
        </Box>
    )
})

Kbd.displayName = '@worldprinter/wdesign-core/Kbd'
