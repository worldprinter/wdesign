import React, { forwardRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import { Box } from '../Box'
import useStyles from './Center.styles'

export type CenterProps = {
    variant?: string

    /** Content that should be centered vertically and horizontally */
    children: React.ReactNode

    /** Set to true to use inline-flex instead of flex */
    inline?: boolean
} & DefaultProps

export const _Center = forwardRef<HTMLDivElement, CenterProps>((props, ref) => {
    const { inline, className, unstyled, variant, ...others } = useComponentDefaultProps('Center', {}, props)
    const { classes, cx } = useStyles({ inline }, { name: 'Center', unstyled, variant })
    return (
        <Box
            ref={ref}
            className={cx(classes.root, className)}
            {...others}
        />
    )
})

_Center.displayName = '@worldprinter/wdesign-core/Center'

export const Center = createPolymorphicComponent<'div', CenterProps>(_Center)
