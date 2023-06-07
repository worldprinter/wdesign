import React, { forwardRef } from 'react'

import type { RichTextEditorControlProps } from '../Control/Control'
import { Control } from '../Control/Control'

export type RichTextEditorControlBaseProps = {
    icon: React.FC<{ size: number | string }>
} & RichTextEditorControlProps

export const ControlBase = forwardRef<HTMLButtonElement, RichTextEditorControlBaseProps>(
    ({ className, active, icon: Icon, ...others }, ref) => (
        <Control
            active={active}
            ref={ref}
            {...others}
        >
            <Icon size='1rem' />
        </Control>
    ),
)

ControlBase.displayName = '@worldprinter/wdesign-tiptap/ControlBase'
