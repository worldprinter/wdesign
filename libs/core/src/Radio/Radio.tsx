import React, { forwardRef } from 'react'

import { useId } from '@worldprinter/wdesign-hooks'
import type { DefaultProps, Selectors, WDesignColor, WDesignSize } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import type { ForwardRefWithStaticComponents } from '@worldprinter/wdesign-utils'

import { extractSystemStyles } from '../Box'
import type { InlineInputStylesNames } from '../InlineInput'
import { InlineInput } from '../InlineInput'
import type { RadioStylesParams } from './Radio.styles'
import useStyles from './Radio.styles'
import { useRadioGroupContext } from './RadioGroup.context'
import { RadioGroup } from './RadioGroup/RadioGroup'
import { RadioIcon } from './RadioIcon'

export type RadioStylesNames = Selectors<typeof useStyles> | InlineInputStylesNames

export type RadioProps = {
    variant?: string

    /** Radio label */
    label?: React.ReactNode

    /** Active radio color from theme.colors */
    color?: WDesignColor

    /** Predefined label fontSize, radio width, height and border-radius */
    size?: WDesignSize

    /** Replace default icon */
    icon?: React.FC<React.ComponentPropsWithoutRef<'svg'>>

    /** Animation duration in ms */
    transitionDuration?: number

    /** Props spread to root element */
    wrapperProps?: Record<string, any>

    /** Position of label */
    labelPosition?: 'left' | 'right'

    /** description, displayed after label */
    description?: React.ReactNode

    /** Displays error message after input */
    error?: React.ReactNode
} & DefaultProps<RadioStylesNames, RadioStylesParams> &
    Omit<React.ComponentPropsWithRef<'input'>, 'size'>

const defaultProps: Partial<RadioProps> = {
    icon: RadioIcon,
    transitionDuration: 100,
    size: 'sm',
    labelPosition: 'right',
}

type RadioComponent = ForwardRefWithStaticComponents<RadioProps, { Group: typeof RadioGroup }>

export const Radio: RadioComponent = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
    const {
        className,
        style,
        id,
        label,
        size,
        title,
        disabled,
        color,
        classNames,
        styles,
        sx,
        icon: Icon,
        transitionDuration,
        wrapperProps,
        unstyled,
        labelPosition,
        description,
        error,
        variant,
        ...others
    } = useComponentDefaultProps('Radio', defaultProps, props)
    const ctx = useRadioGroupContext()

    const contextSize = ctx?.size ?? size
    const componentSize = props.size ? size : contextSize

    const { classes } = useStyles(
        { color, transitionDuration, labelPosition, error: !!error },
        {
            name: 'Radio',
            classNames,
            styles,
            unstyled,
            variant,
            size: componentSize,
        },
    )

    const { systemStyles, rest } = extractSystemStyles(others)
    const uuid = useId(id)

    const contextProps = ctx
        ? {
              checked: ctx.value === rest.value,
              name: rest.name ?? ctx.name,
              onChange: ctx.onChange,
          }
        : {}

    return (
        <InlineInput
            className={className}
            sx={sx}
            style={style}
            id={uuid}
            size={componentSize}
            labelPosition={labelPosition}
            label={label}
            description={description}
            error={error}
            disabled={disabled}
            __staticSelector='Radio'
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
                    ref={ref}
                    className={classes.radio}
                    type='radio'
                    id={uuid}
                    disabled={disabled}
                    {...rest}
                    {...contextProps}
                />
                <Icon
                    className={classes.icon}
                    aria-hidden
                />
            </div>
        </InlineInput>
    )
}) as any

Radio.displayName = '@worldprinter/wdesign-core/Radio'
Radio.Group = RadioGroup
