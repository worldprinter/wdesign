import React, { forwardRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import { extractSystemStyles } from './style-system-props/extract-system-styles/extract-system-styles'
import { useSx } from './use-sx/use-sx'

export type BoxProps = {
    children?: React.ReactNode
} & DefaultProps

export const _Box = forwardRef<HTMLDivElement, BoxProps & { component: any }>(
    ({ className, component, style, sx, ...others }, ref) => {
        const { systemStyles, rest } = extractSystemStyles(others)
        const Element = component || 'div'
        return (
            <Element
                ref={ref}
                className={useSx(sx, systemStyles, className)}
                style={style}
                {...rest}
            />
        )
    },
)

_Box.displayName = '@worldprinter/wdesign-core/Box'

export const Box = createPolymorphicComponent<'div', BoxProps>(_Box)
