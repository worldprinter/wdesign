import type { EmotionServer } from '@emotion/server/types/create-instance'

import { getSSRStyles } from '@worldprinter/wdesign-ssr'

export function injectStyles(markup: string, stylesServer: EmotionServer) {
    return markup.replace('__MANTINE_STYLES__', `${getSSRStyles(markup, stylesServer)}`)
}
