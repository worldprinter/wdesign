import React, { forwardRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-core'
import { ColorSwatch, useComponentDefaultProps } from '@worldprinter/wdesign-core'

import { useRichTextEditorContext } from '../../RichTextEditor.context'
import { Control } from '../Control/Control'

export type RichTextEditorColorControlProps = {
    /** Color that will be set as text color, for example #ef457e */
    color: string
} & DefaultProps &
    React.ComponentPropsWithoutRef<'button'>

const defaultProps: Partial<RichTextEditorColorControlProps> = {}

export const ColorControl = forwardRef<HTMLButtonElement, RichTextEditorColorControlProps>((props, ref) => {
    const { color, ...others } = useComponentDefaultProps('RichTextEditorColorControl', defaultProps, props)
    const { editor, labels, unstyled } = useRichTextEditorContext()
    const currentColor = editor?.getAttributes('textStyle').color || null
    const label = labels.colorControlLabel(color)

    return (
        <Control
            active={currentColor === color}
            aria-label={label}
            title={label}
            onClick={() => (editor.chain() as any).focus().setColor(color).run()}
            {...others}
            ref={ref}
        >
            <ColorSwatch
                color={color}
                size={14}
                unstyled={unstyled}
            />
        </Control>
    )
})
