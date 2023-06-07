import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors } from '@worldprinter/wdesign-core'
import { Group, useComponentDefaultProps } from '@worldprinter/wdesign-core'

import { useRichTextEditorContext } from '../RichTextEditor.context'
import useStyles from './Toolbar.styles'

export type ToolbarStylesNames = Selectors<typeof useStyles>

export type RichTextEditorToolbarProps = {
    /** Determines whether position: sticky styles should be added to the toolbar, false by default */
    sticky?: boolean

    /** Sets top style to offset elements with fixed position, 0 by default */
    stickyOffset?: React.CSSProperties['top']
} & DefaultProps &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<RichTextEditorToolbarProps> = {
    stickyOffset: 0,
}

export const Toolbar = forwardRef<HTMLDivElement, RichTextEditorToolbarProps>((props, ref) => {
    const { className, children, sticky, stickyOffset, ...others } = useComponentDefaultProps(
        'RichTextEditorToolbar',
        defaultProps,
        props,
    )

    const ctx = useRichTextEditorContext()
    const { classes, cx } = useStyles(
        { sticky, stickyOffset },
        {
            name: 'RichTextEditor',
            classNames: ctx.classNames,
            styles: ctx.styles,
            unstyled: ctx.unstyled,
            variant: ctx.variant,
        },
    )

    return (
        <Group
            className={cx(classes.toolbar, className)}
            ref={ref}
            {...others}
        >
            {children}
        </Group>
    )
})

Toolbar.displayName = '@worldprinter/wdesign-tiptap/Toolbar'
