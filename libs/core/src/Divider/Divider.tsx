import React, { forwardRef } from 'react'

import type { DefaultProps, Variants, WDesignColor, WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { rem, useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import { Text } from '../Text'
import useStyles from './Divider.styles'

export type DividerStylesNames = 'label'

export type DividerProps = {
    /** Key of theme.colors, defaults to "gray" in light color scheme and to "dark" in dark color scheme */
    color?: WDesignColor

    /** Divider orientation */
    orientation?: 'horizontal' | 'vertical'

    /** Sets height when orientation="horizontal" and width when orientation="vertical" */
    size?: WDesignNumberSize

    /** Text inside the divider, only applicable when orientation="horizontal" */
    label?: React.ReactNode

    /** Label position, only applicable when orientation="horizontal" */
    labelPosition?: 'left' | 'center' | 'right'

    /** Props added to the label element */
    labelProps?: Record<string, any>

    /** Controls appearance */
    variant?: Variants<'solid' | 'dashed' | 'dotted'>
} & DefaultProps<DividerStylesNames> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<DividerProps> = {
    orientation: 'horizontal',
    size: 'xs',
    labelPosition: 'left',
    variant: 'solid',
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>((props: DividerProps, ref) => {
    const {
        className,
        color,
        orientation,
        size,
        label,
        labelPosition,
        labelProps,
        variant,
        styles,
        classNames,
        unstyled,
        ...others
    } = useComponentDefaultProps('Divider', defaultProps, props)

    const { classes, cx } = useStyles({ color }, { classNames, styles, unstyled, name: 'Divider', variant, size })

    const vertical = orientation === 'vertical'
    const horizontal = orientation === 'horizontal'
    const withLabel = !!label && horizontal

    const useLabelDefaultStyles = !labelProps?.color

    return (
        <Box
            ref={ref}
            className={cx(
                classes.root,
                {
                    [classes.vertical]: vertical,
                    [classes.horizontal]: horizontal,
                    [classes.withLabel]: withLabel,
                },
                className,
            )}
            role='separator'
            {...others}
        >
            {withLabel && (
                <Text
                    {...labelProps}
                    size={labelProps?.size || 'xs'}
                    mt={rem(2)}
                    className={cx(classes.label, classes[labelPosition], {
                        [classes.labelDefaultStyles]: useLabelDefaultStyles,
                    })}
                >
                    {label}
                </Text>
            )}
        </Box>
    )
})

Divider.displayName = '@worldprinter/wdesign-core/Divider'
