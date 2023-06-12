import type { DocumentContext, DocumentInitialProps } from 'next/document'
import React from 'react'

import { createStylesServer, ServerStyles } from '@worldprinter/wdesign-ssr'
import type { EmotionCache } from '@worldprinter/wdesign-styles'

export function createGetInitialProps(
    /**
     * Next.js Document.getInitialProps
     * @see https://nextjs.org/docs/advanced-features/custom-document
     */
    NextInitialProps: (ctx: DocumentContext) => Promise<DocumentInitialProps>,
    cache?: EmotionCache,
): (ctx: DocumentContext) => any {
    const stylesServer = createStylesServer(cache)

    return async function getInitialProps(ctx: DocumentContext) {
        const initialProps = await NextInitialProps(ctx)
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
