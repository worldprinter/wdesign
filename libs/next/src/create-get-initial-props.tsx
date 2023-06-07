import type { DocumentContext } from 'next/document'
import NextDocument from 'next/document'
import React from 'react'

import { createStylesServer, ServerStyles } from '@worldprinter/wdesign-ssr'
import type { EmotionCache } from '@worldprinter/wdesign-styles'

export function createGetInitialProps(cache?: EmotionCache): (ctx: DocumentContext) => any {
    const stylesServer = createStylesServer(cache)

    return async function getInitialProps(ctx: DocumentContext) {
        const initialProps = await NextDocument.getInitialProps(ctx)
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <ServerStyles
                        html={initialProps.html}
                        server={stylesServer}
                    />
                </>
            ),
        }
    }
}
