import type React from 'react'

import type { MantineColor } from '@worldprinter/wdesign-styles'

export type LoaderProps = {
    size: number | string
    color: MantineColor
} & React.ComponentPropsWithoutRef<'svg'>
