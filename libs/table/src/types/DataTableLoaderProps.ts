import type { ReactNode } from 'react'

import type { DefaultWDesignColor, WDesignNumberSize, WDesignTheme } from '@worldprinter/wdesign-core'

export type DataTableLoaderProps = {
    /**
     * Loader background blur (in pixels)
     */
    loaderBackgroundBlur?: number
} & (
    | {
          loaderSize?: never
          loaderVariant?: never
          loaderColor?: never

          /**
           * Custom loader component to use instead of default one
           */
          customLoader?: ReactNode
      }
    | {
          /**
           * Loader size; defaults to `lg`
           */
          loaderSize?: WDesignNumberSize

          /**
           * Loader variant
           */
          loaderVariant?: WDesignTheme['loader']

          /**
           * Loader color
           */
          loaderColor?: DefaultWDesignColor

          customLoader?: never
      }
)
