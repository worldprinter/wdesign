import type { EmotionServer } from '@emotion/server/create-instance'
import htmlReactParser from 'html-react-parser'
import React from 'react'

import { getSSRStyles } from './get-ssr-styles'

type ServerStylesProps = {
    html: string
    server: EmotionServer
}

export function ServerStyles({ html, server }: ServerStylesProps): any {
    const styles = getSSRStyles(html, server)
    return <>{htmlReactParser(styles)}</>
}
