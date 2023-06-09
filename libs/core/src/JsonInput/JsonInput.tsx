import React, { forwardRef, useState } from 'react'

import { useUncontrolled } from '@worldprinter/wdesign-hooks'
import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import type { TextareaProps } from '../Textarea'
import { Textarea } from '../Textarea'
import type { TextInputStylesNames } from '../TextInput'
import useStyles from './JsonInput.styles'
import { validateJson } from './validate-json/validate-json'

export type JsonInputStylesNames = TextInputStylesNames

export type JsonInputProps = {
    /** Value for controlled input */
    value?: string

    /** Default value for uncontrolled input */
    defaultValue?: string

    /** Called when value changes */
    onChange?(value: string): void

    /** Format JSON on blur */
    formatOnBlur?: boolean

    /** Error message shown when JSON is not valid */
    validationError?: React.ReactNode

    /** Function to serialize value into a string, used for value formatting, JSON.stringify by default */
    serialize?: typeof JSON.stringify

    /** Function to deserialize string value, used for value formatting and input JSON validation, must throw error if string cannot be processed, JSON.parse by default */
    deserialize?: typeof JSON.parse
} & DefaultProps<JsonInputStylesNames> &
    Omit<TextareaProps, 'onChange'>

const defaultProps: Partial<JsonInputProps> = {
    formatOnBlur: false,
    size: 'sm',
    serialize: JSON.stringify,
    deserialize: JSON.parse,
}

export const JsonInput = forwardRef<HTMLTextAreaElement, JsonInputProps>((props, ref) => {
    const {
        value,
        defaultValue,
        onChange,
        onFocus,
        onBlur,
        error,
        formatOnBlur,
        size,
        validationError,
        classNames,
        unstyled,
        readOnly,
        variant,
        serialize,
        deserialize,
        ...others
    } = useComponentDefaultProps('JsonInput', defaultProps, props)

    const { classes, cx } = useStyles(null, { name: 'JsonInput', unstyled, size, variant })
    const [_value, setValue] = useUncontrolled({
        value,
        defaultValue,
        finalValue: '',
        onChange,
    })

    const [valid, setValid] = useState(validateJson(_value, deserialize))

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        typeof onFocus === 'function' && onFocus(event)
        setValid(true)
    }

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        typeof onBlur === 'function' && onBlur(event)
        const isValid = validateJson(event.currentTarget.value, deserialize)
        formatOnBlur &&
            !readOnly &&
            isValid &&
            event.currentTarget.value.trim() !== '' &&
            setValue(serialize(deserialize(event.currentTarget.value), null, 2))
        setValid(isValid)
    }

    return (
        <Textarea
            value={_value}
            onChange={(event) => setValue(event.currentTarget.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={valid ? error : validationError || true}
            __staticSelector='JsonInput'
            classNames={{ ...classNames, input: cx(classes.input, classNames?.input) }}
            autoComplete='off'
            ref={ref}
            unstyled={unstyled}
            readOnly={readOnly}
            size={size}
            variant={variant}
            {...others}
        />
    )
})

JsonInput.displayName = '@worldprinter/wdesign-core/JsonInput'
