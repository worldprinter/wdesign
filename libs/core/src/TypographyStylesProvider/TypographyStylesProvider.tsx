import React, { forwardRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import useStyles from './TypographyStylesProvider.styles'

export type TypographyStylesProviderProps = {
    variant?: string

    /** Render any content to add WDesign typography styles */
    children: React.ReactNode
} & DefaultProps &
    React.ComponentPropsWithoutRef<'div'>

export const TypographyStylesProvider = forwardRef<HTMLDivElement, TypographyStylesProviderProps>((props, ref) => {
    const { className, unstyled, variant, ...others } = useComponentDefaultProps('TypographyStylesProvider', {}, props)

    const { classes, cx } = useStyles(null, {
        name: 'TypographyStylesProvider',
        unstyled,
        variant,
    })

    return (
        <Box
            className={cx(classes.root, className)}
            ref={ref}
            {...others}
        />
    )
})

TypographyStylesProvider.displayName = '@worldprinter/wdesign-core/TypographyStylesProvider'
