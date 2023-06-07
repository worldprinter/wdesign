import React, { forwardRef } from 'react'

import type { DefaultProps, MantineSize } from '@worldprinter/wdesign-styles'

import type { InputSharedProps, InputStylesNames, InputWrapperBaseProps, InputWrapperStylesNames } from '../Input'
import { Input, useInputProps } from '../Input'

export type TextInputStylesNames = InputStylesNames | InputWrapperStylesNames

export type TextInputProps = {
    /** Input element type */
    type?: React.HTMLInputTypeAttribute

    /** Props passed to root element (InputWrapper component) */
    wrapperProps?: Record<string, any>

    /** Input size */
    size?: MantineSize

    __staticSelector?: string
} & DefaultProps<TextInputStylesNames> &
    InputSharedProps &
    InputWrapperBaseProps &
    Omit<React.ComponentPropsWithoutRef<'input'>, 'size'>

const defaultProps: Partial<TextInputProps> = {
    type: 'text',
    size: 'sm',
    __staticSelector: 'TextInput',
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    const { inputProps, wrapperProps, ...others } = useInputProps('TextInput', defaultProps, props)
    return (
        <Input.Wrapper {...wrapperProps}>
            <Input
                {...inputProps}
                {...others}
                ref={ref}
            />
        </Input.Wrapper>
    )
})

TextInput.displayName = '@worldprinter/wdesign-core/TextInput'
