import React, { forwardRef } from 'react'

import type { DefaultProps, WDesignColor } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import useStyles from './Mark.styles'

export type MarkProps = {
    variant?: string

    /** Background color from theme.colors */
    color?: WDesignColor
} & DefaultProps &
    React.ComponentPropsWithoutRef<'mark'>

const defaultProps: Partial<MarkProps> = {
    color: 'yellow',
}

export const Mark = forwardRef<HTMLElement, MarkProps>((props, ref) => {
    const { color, className, unstyled, variant, ...others } = useComponentDefaultProps('Mark', defaultProps, props)

    const { classes, cx } = useStyles({ color }, { unstyled, name: 'Mark', variant })
    return (
        <Box
            component='mark'
            ref={ref}
            className={cx(classes.root, className)}
            {...others}
        />
    )
})

Mark.displayName = '@worldprinter/wdesign-core/Mark'
