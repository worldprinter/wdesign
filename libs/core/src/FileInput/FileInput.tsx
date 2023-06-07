import React, { forwardRef, useEffect, useRef } from 'react'

import { useUncontrolled } from '@worldprinter/wdesign-hooks'
import type { DefaultProps, MantineSize, Selectors } from '@worldprinter/wdesign-styles'

import { CloseButton } from '../CloseButton'
import { FileButton } from '../FileButton'
import type { InputSharedProps, InputStylesNames, InputWrapperBaseProps, InputWrapperStylesNames } from '../Input'
import { Input, useInputProps } from '../Input'
import { Text } from '../Text'
import useStyles from './FileInput.styles'

export type FileInputStylesNames = InputStylesNames | InputWrapperStylesNames | Selectors<typeof useStyles>

export type FileInputProps<Multiple extends boolean = false> = {
    /** Props passed to root element (InputWrapper component) */
    wrapperProps?: Record<string, any>

    /** Called when user picks files */
    onChange?(payload: Multiple extends true ? File[] : File | null): void

    /** Controlled input value */
    value?: Multiple extends true ? File[] : File | null

    /** Uncontrolled input default value */
    defaultValue?: Multiple extends true ? File[] : File | null

    /** Input size */
    size?: MantineSize

    /** Determines whether user can pick more than one file */
    multiple?: Multiple

    /** File input accept attribute, for example, "image/png,image/jpeg" */
    accept?: string

    /** Input name attribute */
    name?: string

    /** Input form attribute */
    form?: string

    /** Current value renderer */
    valueComponent?: React.FC<{ value: null | File | File[] }>

    /** Allow to clear value */
    clearable?: boolean

    /** Props added to clear button */
    clearButtonProps?: React.ComponentPropsWithoutRef<'button'>

    /** Determines whether the user can change value */
    readOnly?: boolean

    /** Specifies that, optionally, a new file should be captured, and which device should be used to capture that new media of a type defined by the accept attribute. */
    capture?: boolean | 'user' | 'environment'

    /** Spreads props to input element used to capture files */
    fileInputProps?: React.ComponentPropsWithoutRef<'input'>
} & DefaultProps<FileInputStylesNames> &
    InputSharedProps &
    InputWrapperBaseProps &
    Omit<React.ComponentPropsWithoutRef<'button'>, 'size' | 'onChange' | 'value' | 'defaultValue'>

const DefaultValue: FileInputProps['valueComponent'] = ({ value }) => (
    <Text sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {Array.isArray(value) ? value.map((file) => file.name).join(', ') : value?.name}
    </Text>
)

const defaultProps: Partial<FileInputProps> = {
    size: 'sm',
    valueComponent: DefaultValue,
}

export const _FileInput = forwardRef<HTMLButtonElement, FileInputProps>((props, ref) => {
    const {
        inputProps,
        wrapperProps,
        placeholder,
        value,
        defaultValue,
        onChange,
        multiple,
        accept,
        name,
        form,
        classNames,
        styles,
        unstyled,
        valueComponent: ValueComponent,
        rightSection,
        clearable,
        clearButtonProps,
        readOnly,
        capture,
        fileInputProps,
        ...others
    } = useInputProps('FileInput', defaultProps, props)
    const resetRef = useRef<() => void>()
    const { classes, cx } = useStyles(null, {
        name: 'FileInput',
        classNames,
        styles,
        unstyled,
    })

    const [_value, setValue] = useUncontrolled<File | File[]>({
        value,
        defaultValue,
        onChange,
        finalValue: multiple ? [] : null,
    })

    const hasValue = Array.isArray(_value) ? _value.length !== 0 : _value !== null

    const _rightSection =
        rightSection ||
        (clearable && hasValue && !readOnly ? (
            <CloseButton
                {...clearButtonProps}
                variant='transparent'
                onClick={() => setValue(multiple ? [] : null)}
                size={inputProps.size}
                unstyled={unstyled}
            />
        ) : null)

    useEffect(() => {
        if ((Array.isArray(_value) && _value.length === 0) || _value === null) {
            resetRef.current()
        }
    }, [_value])

    return (
        <Input.Wrapper
            {...wrapperProps}
            __staticSelector='FileInput'
        >
            <FileButton
                onChange={setValue}
                multiple={multiple}
                accept={accept}
                name={name}
                form={form}
                resetRef={resetRef}
                disabled={readOnly}
                capture={capture}
                inputProps={fileInputProps}
            >
                {(fileButtonProps) => (
                    <Input
                        multiline
                        {...fileButtonProps}
                        {...inputProps}
                        {...others}
                        component='button'
                        type='button'
                        ref={ref}
                        __staticSelector='FileInput'
                        rightSection={_rightSection}
                        classNames={{ ...classNames, input: cx(classes.input, (classNames as any)?.input) }}
                    >
                        {!hasValue ? (
                            <Input.Placeholder className={classes.placeholder}>{placeholder}</Input.Placeholder>
                        ) : (
                            <ValueComponent value={_value} />
                        )}
                    </Input>
                )}
            </FileButton>
        </Input.Wrapper>
    )
})

_FileInput.displayName = '@worldprinter/wdesign-core/FileInput'

type FileInputComponent = <Multiple extends boolean = false>(
    props: FileInputProps<Multiple> & {
        ref?: React.ForwardedRef<HTMLButtonElement>
    },
) => JSX.Element

export const FileInput: FileInputComponent = _FileInput as any
