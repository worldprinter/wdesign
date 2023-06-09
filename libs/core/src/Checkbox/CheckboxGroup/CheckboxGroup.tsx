import React, { forwardRef } from 'react'

import { useUncontrolled } from '@worldprinter/wdesign-hooks'
import type { DefaultProps, WDesignSize } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import type { InputWrapperBaseProps, InputWrapperStylesNames } from '../../Input'
import { Input } from '../../Input'
import { CheckboxGroupProvider } from '../CheckboxGroup.context'

export type CheckboxGroupStylesNames = InputWrapperStylesNames

export type CheckboxGroupProps = {
    variant?: string

    /** <Checkbox /> components */
    children: React.ReactNode

    /** Value of selected checkboxes, use for controlled components */
    value?: string[]

    /** Initial selected checkboxes, use for uncontrolled components, overridden by value prop */
    defaultValue?: string[]

    /** Called when value changes */
    onChange?(value: string[]): void

    /** Controls label font-size and checkbox width and height */
    size?: WDesignSize

    /** Props added to Input.Wrapper component (root element) */
    wrapperProps?: Record<string, any>
} & DefaultProps<CheckboxGroupStylesNames> &
    InputWrapperBaseProps &
    Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'>

const defaultProps: Partial<CheckboxGroupProps> = {
    size: 'sm',
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>((props: CheckboxGroupProps, ref) => {
    const { children, value, defaultValue, onChange, size, wrapperProps, ...others } = useComponentDefaultProps(
        'CheckboxGroup',
        defaultProps,
        props,
    )

    const [_value, setValue] = useUncontrolled({
        value,
        defaultValue,
        finalValue: [],
        onChange,
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const itemValue = event.currentTarget.value
        setValue(_value.includes(itemValue) ? _value.filter((item) => item !== itemValue) : [..._value, itemValue])
    }

    return (
        <CheckboxGroupProvider value={{ value: _value, onChange: handleChange, size }}>
            <Input.Wrapper
                labelElement='div'
                size={size}
                __staticSelector='CheckboxGroup'
                ref={ref}
                {...wrapperProps}
                {...others}
            >
                {children}
            </Input.Wrapper>
        </CheckboxGroupProvider>
    )
})

CheckboxGroup.displayName = '@worldprinter/wdesign-core/CheckboxGroup'
