import React from 'react'

import type { MantineColor } from '@worldprinter/wdesign-styles'

export interface LoaderProps extends React.ComponentPropsWithoutRef<'svg'> {
    size: number | string
    color: MantineColor
}
