import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors, WDesignColor } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import type { BlockquoteStylesParams } from './Blockquote.styles'
import useStyles from './Blockquote.styles'
import { QuoteIcon } from './QuoteIcon'

export type BlockquoteStylesNames = Selectors<typeof useStyles>

export type BlockquoteProps = {
    variant?: string

    /** Icon color from theme */
    color?: WDesignColor

    /** Icon, defaults to quote icon */
    icon?: React.ReactNode

    /** Describe a reference to a cited quote */
    cite?: React.ReactNode
} & DefaultProps<BlockquoteStylesNames, BlockquoteStylesParams> &
    Omit<React.ComponentPropsWithoutRef<'blockquote'>, 'cite'>

const defaultProps: Partial<BlockquoteProps> = {
    color: 'gray',
    icon: <QuoteIcon />,
}

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>((props: BlockquoteProps, ref) => {
    const { className, color, icon, cite, children, classNames, styles, unstyled, variant, ...others } =
        useComponentDefaultProps('Blockquote', defaultProps, props)
    const { classes, cx } = useStyles({ color }, { classNames, styles, unstyled, name: 'Blockquote', variant })

    return (
        <Box
            component='blockquote'
            className={cx(classes.root, className)}
            ref={ref}
            {...others}
        >
            <div className={classes.inner}>
                {icon && <div className={classes.icon}>{icon}</div>}
                <div className={classes.body}>
                    {children}
                    {cite && <cite className={classes.cite}>{cite}</cite>}
                </div>
            </div>
        </Box>
    )
})

Blockquote.displayName = '@worldprinter/wdesign-core/Blockquote'
