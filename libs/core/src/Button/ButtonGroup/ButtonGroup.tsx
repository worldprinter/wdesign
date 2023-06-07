/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../../Box'
import type { ButtonGroupStylesParams } from './ButtonGroup.styles'
import useStyles from './ButtonGroup.styles'

export type ButtonGroupProps = {
    /** <Button /> components */
    children?: React.ReactNode

    /** Switch between vertical and horizontal orientation */
    orientation?: 'vertical' | 'horizontal'

    /** Child <Button /> border width */
    buttonBorderWidth?: number | string
} & DefaultProps<never, ButtonGroupStylesParams> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<ButtonGroupProps> = {
    orientation: 'horizontal',
    buttonBorderWidth: 1,
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
    const { className, orientation, buttonBorderWidth, unstyled, ...others } = useComponentDefaultProps(
        'ButtonGroup',
        defaultProps,
        props,
    )
    const { classes, cx } = useStyles({ orientation, buttonBorderWidth }, { name: 'ButtonGroup', unstyled })
    return (
        <Box
            className={cx(classes.root, className)}
            ref={ref}
            {...others}
        />
    )
})

ButtonGroup.displayName = '@worldprinter/wdesign-core/ButtonGroup'
