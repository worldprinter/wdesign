import React, { forwardRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import type { InputSharedProps, InputStylesNames, InputWrapperBaseProps, InputWrapperStylesNames } from '../Input'
import { Input, useInputProps } from '../Input'

export type InputBaseStylesNames = InputStylesNames | InputWrapperStylesNames

export type InputBaseProps = {
    /** Props passed to root element (InputWrapper component) */
    wrapperProps?: Record<string, any>

    __staticSelector?: string
} & DefaultProps<InputBaseStylesNames> &
    InputSharedProps &
    InputWrapperBaseProps

const defaultProps: Partial<InputBaseProps> = {
    size: 'sm',
    __staticSelector: 'InputBase',
}

export const _InputBase = forwardRef<HTMLInputElement, InputBaseProps>((props, ref) => {
    const { inputProps, wrapperProps, ...others } = useInputProps('InputBase', defaultProps, props)
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

_InputBase.displayName = '@worldprinter/wdesign-core/InputBase'

export const InputBase = createPolymorphicComponent<'input', InputBaseProps>(_InputBase)
