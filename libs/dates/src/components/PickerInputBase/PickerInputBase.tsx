import React, { forwardRef } from 'react'

import type {
    DefaultProps,
    InputSharedProps,
    InputStylesNames,
    InputWrapperBaseProps,
    InputWrapperStylesNames,
    ModalProps,
    PopoverProps,
    Selectors,
} from '@worldprinter/wdesign-core'
import { CloseButton, Input, Modal, Popover, useInputProps } from '@worldprinter/wdesign-core'
import type { useDisclosure } from '@worldprinter/wdesign-hooks'

import type { DatePickerType } from '../../types'
import type { CalendarStylesNames } from '../Calendar'
import type { HiddenDatesInputValue } from '../HiddenDatesInput'
import { HiddenDatesInput } from '../HiddenDatesInput'
import useStyles from './PickerInputBase.styles'

export type PickerInputBaseStylesNames =
    | CalendarStylesNames
    | InputStylesNames
    | InputWrapperStylesNames
    | Selectors<typeof useStyles>

export type DateInputSharedProps = {
    /** Determines whether dropdown should be closed when date is selected, not applicable when type="multiple", true by default */
    closeOnChange?: boolean

    /** Type of dropdown, defaults to popover */
    dropdownType?: 'popover' | 'modal'

    /** Props added to Popover component */
    popoverProps?: Partial<Omit<PopoverProps, 'children'>>

    /** Props added to Modal component */
    modalProps?: Partial<Omit<ModalProps, 'children'>>

    /** Determines whether input value can be cleared, adds clear button to right section, false by default */
    clearable?: boolean

    /** Props added to clear button */
    clearButtonProps?: React.ComponentPropsWithoutRef<'button'>

    /** Determines whether the user can modify the value */
    readOnly?: boolean

    /** Determines whether dates value should be sorted before onChange call, only applicable when type="multiple", true by default */
    sortDates?: boolean

    /** Separator between range value */
    labelSeparator?: string
} & DefaultProps<PickerInputBaseStylesNames> &
    InputSharedProps &
    InputWrapperBaseProps &
    Omit<React.ComponentPropsWithRef<'button'>, 'defaultValue' | 'value' | 'onChange' | 'type'>

export type PickerInputBaseProps = {
    __staticSelector: string
    children: React.ReactNode
    formattedValue: string
    dropdownHandlers: ReturnType<typeof useDisclosure>[1]
    dropdownOpened: boolean
    onClear(): void
    shouldClear: boolean
    value: HiddenDatesInputValue
    type: DatePickerType
} & DateInputSharedProps

const defaultProps: Partial<PickerInputBaseProps> = {}

export const PickerInputBase = forwardRef<HTMLButtonElement, PickerInputBaseProps>((props, ref) => {
    const {
        inputProps,
        wrapperProps,
        placeholder,
        classNames,
        styles,
        unstyled,
        popoverProps,
        modalProps,
        dropdownType,
        children,
        formattedValue,
        dropdownHandlers,
        dropdownOpened,
        onClick,
        clearable,
        onClear,
        clearButtonProps,
        rightSection,
        shouldClear,
        readOnly,
        disabled,
        value,
        name,
        form,
        type,
        ...others
    } = useInputProps('PickerInputBase', defaultProps, props)

    const { classes, cx } = useStyles(null, {
        name: inputProps.__staticSelector,
        classNames,
        styles,
        unstyled,
        variant: inputProps.variant,
        size: inputProps.size,
    })

    const _rightSection =
        rightSection ||
        (clearable && shouldClear && !readOnly && !disabled ? (
            <CloseButton
                variant='transparent'
                onClick={onClear}
                unstyled={unstyled}
                size={inputProps.size}
                {...clearButtonProps}
            />
        ) : null)

    const handleClose = () => {
        const isInvalidRangeValue = type === 'range' && value[0] && !value[1]
        if (isInvalidRangeValue) {
            onClear()
        }

        dropdownHandlers.close()
    }

    return (
        <>
            {dropdownType === 'modal' && !readOnly && (
                <Modal
                    opened={dropdownOpened}
                    onClose={handleClose}
                    withCloseButton={false}
                    size='auto'
                    data-dates-modal
                    unstyled={unstyled}
                    {...modalProps}
                >
                    {children}
                </Modal>
            )}

            <Input.Wrapper {...wrapperProps}>
                <Popover
                    position='bottom-start'
                    opened={dropdownOpened}
                    onClose={handleClose}
                    disabled={dropdownType === 'modal' || readOnly}
                    trapFocus
                    returnFocus
                    unstyled={unstyled}
                    {...popoverProps}
                >
                    <Popover.Target>
                        <Input
                            data-dates-input
                            data-read-only={readOnly || undefined}
                            disabled={disabled}
                            component='button'
                            type='button'
                            multiline
                            onClick={(event) => {
                                onClick?.(event)
                                dropdownHandlers.toggle()
                            }}
                            rightSection={_rightSection}
                            {...inputProps}
                            ref={ref}
                            classNames={{
                                ...classNames,
                                input: cx(classes.input, (classNames as any)?.input),
                            }}
                            {...others}
                        >
                            {formattedValue || (
                                <Input.Placeholder className={classes.placeholder}>{placeholder}</Input.Placeholder>
                            )}
                        </Input>
                    </Popover.Target>

                    <Popover.Dropdown data-dates-dropdown>{children}</Popover.Dropdown>
                </Popover>
            </Input.Wrapper>
            <HiddenDatesInput
                value={value}
                name={name}
                form={form}
                type={type}
            />
        </>
    )
})

PickerInputBase.displayName = '@worldprinter/wdesign-dates/PickerInputBase'
