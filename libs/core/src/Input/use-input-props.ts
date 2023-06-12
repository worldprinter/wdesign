import { useId } from '@worldprinter/wdesign-hooks'
import type { DefaultProps, WDesignStyleSystemProps } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { extractSystemStyles } from '../Box'
import type { InputSharedProps } from './Input'
import type { InputWrapperBaseProps } from './InputWrapper/InputWrapper'

type BaseProps = {
    __staticSelector?: string
    id?: string
} & InputWrapperBaseProps &
    InputSharedProps &
    DefaultProps

export function useInputProps<T extends BaseProps, U extends Partial<T>>(component: string, defaultProps: U, props: T) {
    const {
        label,
        description,
        error,
        required,
        classNames,
        styles,
        className,
        unstyled,
        __staticSelector,
        sx,
        errorProps,
        labelProps,
        descriptionProps,
        wrapperProps: _wrapperProps,
        id,
        size,
        style,
        inputContainer,
        inputWrapperOrder,
        withAsterisk,
        variant,
        ...others
    } = useComponentDefaultProps<T>(component, defaultProps, props)

    const uid = useId(id)

    const { systemStyles, rest } = extractSystemStyles(others)

    const wrapperProps = {
        label,
        description,
        error,
        required,
        classNames,
        className,
        __staticSelector,
        sx,
        errorProps,
        labelProps,
        descriptionProps,
        unstyled,
        styles,
        id: uid,
        size,
        style,
        inputContainer,
        inputWrapperOrder,
        withAsterisk,
        variant,
        ..._wrapperProps,
    }

    return {
        ...rest,
        classNames,
        styles,
        unstyled,
        wrapperProps: {
            ...wrapperProps,
            ...systemStyles,
        } as typeof wrapperProps & WDesignStyleSystemProps,
        inputProps: {
            required,
            classNames,
            styles,
            unstyled,
            id: uid,
            size,
            __staticSelector,
            error,
            variant,
        },
    }
}
