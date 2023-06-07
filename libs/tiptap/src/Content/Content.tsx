import { EditorContent } from '@tiptap/react'
import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors } from '@worldprinter/wdesign-core'
import { Box, TypographyStylesProvider, useComponentDefaultProps } from '@worldprinter/wdesign-core'

import { useRichTextEditorContext } from '../RichTextEditor.context'
import useStyles from './Content.styles'

export type ContentStylesNames = Selectors<typeof useStyles>

export type RichTextEditorContentProps = {} & DefaultProps & React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<RichTextEditorContentProps> = {}

export const Content = forwardRef<HTMLDivElement, RichTextEditorContentProps>((props, ref) => {
    const { className, ...others } = useComponentDefaultProps('RichTextEditorContent', defaultProps, props)

    const { editor, withCodeHighlightStyles, withTypographyStyles, classNames, styles, unstyled, variant } =
        useRichTextEditorContext()

    const { classes, cx } = useStyles(
        { withCodeHighlightStyles, withTypographyStyles },
        { name: 'RichTextEditor', classNames, styles, unstyled, variant },
    )

    return (
        <TypographyStylesProvider
            className={cx(classes.typographyStylesProvider, className)}
            unstyled={!withTypographyStyles || unstyled}
            ref={ref}
        >
            <Box
                component={EditorContent}
                editor={editor}
                className={classes.content}
                {...others}
            />
        </TypographyStylesProvider>
    )
})

Content.displayName = '@worldprinter/wdesign-tiptap/Content'
