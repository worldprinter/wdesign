import React, { forwardRef } from 'react'

import { useId } from '@worldprinter/wdesign-hooks'
import type { DefaultProps, Selectors, WDesignColor, WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import type { ForwardRefWithStaticComponents } from '@worldprinter/wdesign-utils'

import { extractSystemStyles } from '../Box'
import type { InlineInputStylesNames } from '../InlineInput'
import { InlineInput } from '../InlineInput'
import type { CheckboxStylesParams } from './Checkbox.styles'
import useStyles from './Checkbox.styles'
import { useCheckboxGroupContext } from './CheckboxGroup.context'
import { CheckboxGroup } from './CheckboxGroup/CheckboxGroup'
import { CheckboxIcon } from './CheckboxIcon'

export type CheckboxStylesNames = Selectors<typeof useStyles> | InlineInputStylesNames

export type CheckboxProps = {
    variant?: string

    /** Key of theme.colors */
    color?: WDesignColor

    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: WDesignNumberSize

    /** Controls label font-size and checkbox width and height */
    size?: WDesignNumberSize

    /** Checkbox label */
    label?: React.ReactNode

    /** Indeterminate state of checkbox, if set, `checked` prop is ignored */
    indeterminate?: boolean

    /** Props added to the root element */
    wrapperProps?: Record<string, any>

    /** Transition duration in ms */
    transitionDuration?: number

    /** Icon rendered when checkbox has checked or indeterminate state */
    icon?: React.FC<{ indeterminate: boolean; className: string }>

    /** Position of the label */
    labelPosition?: 'left' | 'right'

    /** Description, displayed after the label */
    description?: React.ReactNode

    /** Error message displayed after the input */
    error?: React.ReactNode
} & DefaultProps<CheckboxStylesNames, CheckboxStylesParams> &
    Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'size'>

const defaultProps: Partial<CheckboxProps> = {
    size: 'sm',
    transitionDuration: 100,
    icon: CheckboxIcon,
    labelPosition: 'right',
}

type CheckboxComponent = ForwardRefWithStaticComponents<CheckboxProps, { Group: typeof CheckboxGroup }>

export const Checkbox: CheckboxComponent = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
    const {
        className,
        style,
        sx,
        checked,
        disabled,
        color,
        label,
        indeterminate,
        id,
        size,
        radius,
        wrapperProps,
        children,
        classNames,
        styles,
        transitionDuration,
        icon: Icon,
        unstyled,
        labelPosition,
        description,
        error,
        variant,
        ...others
    } = useComponentDefaultProps('Checkbox', defaultProps, props)

    const ctx = useCheckboxGroupContext()
    const uuid = useId(id)
    const { systemStyles, rest } = extractSystemStyles(others)
    const { classes } = useStyles(
        {
            radius,
            color,
            transitionDuration,
            labelPosition,
            error: !!error,
            indeterminate,
        },
        {
            name: 'Checkbox',
            classNames,
            styles,
            unstyled,
            variant,
            size: ctx?.size || size,
        },
    )

    const contextProps = ctx
        ? {
              checked: ctx.value.includes(rest.value as string),
              onChange: ctx.onChange,
          }
        : {}

    return (
        <InlineInput
            className={className}
            sx={sx}
            style={style}
            id={uuid}
            size={ctx?.size || size}
            labelPosition={labelPosition}
            label={label}
            description={description}
            error={error}
            disabled={disabled}
            __staticSelector='Checkbox'
            classNames={classNames}
            styles={styles}
            unstyled={unstyled}
            data-checked={contextProps.checked || undefined}
            variant={variant}
            {...systemStyles}
            {...wrapperProps}
        >
            <div className={classes.inner}>
                <input
                    id={uuid}
                    ref={ref}
                    type='checkbox'
                    className={classes.input}
                    checked={checked}
                    disabled={disabled}
                    {...rest}
                    {...contextProps}
                />

                <Icon
                    indeterminate={indeterminate}
                    className={classes.icon}
                />
            </div>
        </InlineInput>
    )
}) as any

Checkbox.displayName = '@worldprinter/wdesign-core/Checkbox'
Checkbox.Group = CheckboxGroup
