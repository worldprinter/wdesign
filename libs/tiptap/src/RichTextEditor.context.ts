import type { Editor } from '@tiptap/react'

import type { ClassNames, Styles } from '@worldprinter/wdesign-core'
import { createSafeContext } from '@worldprinter/wdesign-utils'

import type { RichTextEditorLabels } from './labels'
import type { RichTextEditorStylesNames } from './RichTextEditor'

type RichTextEditorContext = {
    editor: Editor
    labels: RichTextEditorLabels
    withCodeHighlightStyles: boolean
    withTypographyStyles: boolean
    classNames: ClassNames<RichTextEditorStylesNames>
    styles: Styles<RichTextEditorStylesNames>
    unstyled: boolean
    variant: string
}

export const [RichTextEditorProvider, useRichTextEditorContext] = createSafeContext<RichTextEditorContext>(
    'RichTextEditor was not found in tree',
)
