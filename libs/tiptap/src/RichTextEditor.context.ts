import { Styles, ClassNames } from '@worldprint/wdesign-core';
import { createSafeContext } from '@worldprint/wdesign-utils';
import { Editor } from '@tiptap/react';
import { RichTextEditorLabels } from './labels';
import type { RichTextEditorStylesNames } from './RichTextEditor';

interface RichTextEditorContext {
  editor: Editor;
  labels: RichTextEditorLabels;
  withCodeHighlightStyles: boolean;
  withTypographyStyles: boolean;
  classNames: ClassNames<RichTextEditorStylesNames>;
  styles: Styles<RichTextEditorStylesNames>;
  unstyled: boolean;
  variant: string;
}

export const [RichTextEditorProvider, useRichTextEditorContext] =
  createSafeContext<RichTextEditorContext>(
    'RichTextEditor was not found in tree'
  );
