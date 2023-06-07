import { useId } from '@worldprinter/wdesign-hooks'
import { DefaultProps, MantineStyleSystemProps, useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { extractSystemStyles } from '../Box'
import { InputSharedProps } from './Input'
import { InputWrapperBaseProps } from './InputWrapper/InputWrapper'

interface BaseProps extends InputWrapperBaseProps, InputSharedProps, DefaultProps {
    __staticSelector?: string
    id?: string
}

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
        } as typeof wrapperProps & MantineStyleSystemProps,
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
