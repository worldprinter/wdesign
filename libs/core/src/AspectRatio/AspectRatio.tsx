import React, { forwardRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box/Box'
import useStyles from './AspectRatio.styles'

export type AspectRatioProps = {
    variant?: string

    /** Aspect ratio, e.g. 16 / 9, 4 / 3, 1920 / 1080 */
    ratio: number
} & DefaultProps &
    React.ComponentPropsWithoutRef<'div'>

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>((props: AspectRatioProps, ref) => {
    const { className, ratio, children, unstyled, variant, ...others } = useComponentDefaultProps(
        'AspectRatio',
        {},
        props,
    )

    const { classes, cx } = useStyles({ ratio }, { name: 'AspectRatio', unstyled, variant })

    return (
        <Box
            ref={ref}
            className={cx(classes.root, className)}
            {...others}
        >
            {children}
        </Box>
    )
})

AspectRatio.displayName = '@worldprinter/wdesign-core/AspectRatio'
