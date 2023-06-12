import type React from 'react'

import type { WDesignColor } from '@worldprinter/wdesign-styles'

export type LoaderProps = {
    size: number | string
    color: WDesignColor
} & React.ComponentPropsWithoutRef<'svg'>
