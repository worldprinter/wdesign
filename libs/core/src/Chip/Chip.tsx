import React, { forwardRef } from 'react'

import { useId, useUncontrolled } from '@worldprinter/wdesign-hooks'
import type { DefaultProps, Selectors, Variants, WDesignColor, WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import type { ForwardRefWithStaticComponents } from '@worldprinter/wdesign-utils'

import { Box, extractSystemStyles } from '../Box'
import { CheckIcon } from '../Checkbox'
import type { ChipStylesParams } from './Chip.styles'
import useStyles from './Chip.styles'
import { useChipGroup } from './ChipGroup.context'
import { ChipGroup } from './ChipGroup/ChipGroup'

export type ChipStylesNames = Selectors<typeof useStyles>

export type ChipProps = {
    /** Key of theme.radius or any valid CSS value to set border-radius, "xl" by default */
    radius?: WDesignNumberSize

    /** Predefined chip size */
    size?: WDesignNumberSize

    /** Chip input type */
    type?: 'radio' | 'checkbox'

    /** Controls chip appearance, defaults to filled with dark theme and to outline in light theme */
    variant?: Variants<'outline' | 'filled' | 'light'>

    /** Chip label */
    children: React.ReactNode

    /** Checked state for controlled component */
    checked?: boolean

    /** Default value for uncontrolled component */
    defaultChecked?: boolean

    /** Calls when checked state changes */
    onChange?(checked: boolean): void

    /** Active color from theme, defaults to theme.primaryColor */
    color?: WDesignColor

    /** Static id to bind input with label */
    id?: string

    /** Props spread to wrapper element */
    wrapperProps?: Record<string, any>
} & DefaultProps<ChipStylesNames, ChipStylesParams> &
    Omit<React.ComponentPropsWithRef<'input'>, 'size' | 'onChange'>

const defaultProps: Partial<ChipProps> = {
    type: 'checkbox',
    size: 'sm',
    radius: 'xl',
    variant: 'outline',
}

type ChipComponent = ForwardRefWithStaticComponents<ChipProps, { Group: typeof ChipGroup }>

export const Chip: ChipComponent = forwardRef<HTMLInputElement, ChipProps>((props, ref) => {
    const {
        radius,
        type,
        size,
        variant,
        disabled,
        id,
        color,
        children,
        className,
        classNames,
        style,
        styles,
        checked,
        defaultChecked,
        onChange,
        sx,
        wrapperProps,
        value,
        unstyled,
        ...others
    } = useComponentDefaultProps('Chip', defaultProps, props)

    const ctx = useChipGroup()
    const uuid = useId(id)
    const { systemStyles, rest } = extractSystemStyles(others)
    const { classes, cx } = useStyles({ radius, color }, { classNames, styles, unstyled, name: 'Chip', variant, size })

    const [_value, setValue] = useUncontrolled({
        value: checked,
        defaultValue: defaultChecked,
        finalValue: false,
        onChange,
    })

    const contextProps = ctx
        ? {
              checked: ctx.isChipSelected(value as string),
              onChange: ctx.onChange,
              type: ctx.multiple ? 'checkbox' : 'radio',
          }
        : {}

    const _checked = contextProps.checked || _value

    return (
        <Box
            className={cx(classes.root, className)}
            style={style}
            sx={sx}
            {...systemStyles}
            {...wrapperProps}
        >
            <input
                type={type}
                className={classes.input}
                checked={_checked}
                onChange={(event) => setValue(event.currentTarget.checked)}
                id={uuid}
                disabled={disabled}
                ref={ref}
                value={value}
                {...contextProps}
                {...rest}
            />
            <label
                htmlFor={uuid}
                data-checked={_checked || undefined}
                data-disabled={disabled || undefined}
                className={classes.label}
            >
                {_checked && (
                    <span className={classes.iconWrapper}>
                        <CheckIcon className={classes.checkIcon} />
                    </span>
                )}
                {children}
            </label>
        </Box>
    )
}) as any

Chip.displayName = '@worldprinter/wdesign-core/Chip'
Chip.Group = ChipGroup
