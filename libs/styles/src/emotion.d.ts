import type { WDesignTheme } from './index'

import '@emotion/react'

declare module '@emotion/react' {
    export type Theme = WDesignTheme
}
