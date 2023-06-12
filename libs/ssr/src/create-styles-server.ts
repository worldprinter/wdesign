import type { EmotionCache } from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'

import { defaultWDesignEmotionCache } from '@worldprinter/wdesign-styles'

export function createStylesServer(cache?: EmotionCache) {
    return createEmotionServer(cache || defaultWDesignEmotionCache)
}
