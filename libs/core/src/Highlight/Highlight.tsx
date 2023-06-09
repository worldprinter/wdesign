import React, { forwardRef } from 'react'

import type { CSSObject, WDesignColor, WDesignTheme } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import { Mark } from '../Mark/Mark'
import type { TextProps } from '../Text/Text'
import { Text } from '../Text/Text'
import { highlighter } from './highlighter/highlighter'

export type HighlightProps = {
    /** Substring or an array of substrings to highlight in children */
    highlight: string | string[]

    /** Color from theme that is used for highlighting */
    highlightColor?: WDesignColor

    /** Styles applied to highlighted part */
    highlightStyles?: CSSObject | ((theme: WDesignTheme) => CSSObject)

    /** Full string part of which will be highlighted */
    children: string
} & TextProps

const defaultProps: Partial<HighlightProps> = {
    highlightColor: 'yellow',
}

export const _Highlight = forwardRef<HTMLDivElement, HighlightProps>((props, ref) => {
    const { children, highlight, highlightColor, highlightStyles, unstyled, ...others } = useComponentDefaultProps(
        'Highlight',
        defaultProps,
        props,
    )
    const highlightChunks = highlighter(children, highlight)

    return (
        <Text
            unstyled={unstyled}
            ref={ref}
            __staticSelector='Highlight'
            {...others}
        >
            {highlightChunks.map(({ chunk, highlighted }, i) =>
                highlighted ? (
                    <Mark
                        unstyled={unstyled}
                        key={i}
                        color={highlightColor}
                        sx={highlightStyles}
                        data-highlight={chunk}
                    >
                        {chunk}
                    </Mark>
                ) : (
                    <span key={i}>{chunk}</span>
                ),
            )}
        </Text>
    )
})

_Highlight.displayName = '@worldprinter/wdesign-core/Highlight'

export const Highlight = createPolymorphicComponent<'div', HighlightProps>(_Highlight)
