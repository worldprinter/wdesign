import React, { forwardRef } from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-core'

import { useDatesInput } from '../../hooks'
import type { DatePickerType } from '../../types'
import { getDefaultClampedDate } from '../../utils'
import { pickCalendarProps } from '../Calendar'
import type { DatePickerBaseProps } from '../DatePicker'
import { DatePicker } from '../DatePicker'
import type { DateInputSharedProps, PickerInputBaseStylesNames } from '../PickerInputBase'
import { PickerInputBase } from '../PickerInputBase'

export type DatePickerInputStylesNames = PickerInputBaseStylesNames

export type DatePickerInputProps<Type extends DatePickerType = 'default'> = {
    /** Dayjs format to display input value, "MMMM D, YYYY" by default  */
    valueFormat?: string
} & DateInputSharedProps &
    DatePickerBaseProps<Type>

type DatePickerInputComponent = (<Type extends DatePickerType = 'default'>(
    props: DatePickerInputProps<Type>,
) => JSX.Element) & { displayName?: string }

const defaultProps: Partial<DatePickerInputProps> = {
    type: 'default',
    valueFormat: 'MMMM D, YYYY',
    closeOnChange: true,
    sortDates: true,
    dropdownType: 'popover',
}

export const DatePickerInput: DatePickerInputComponent = forwardRef((props, ref) => {
    const {
        type,
        value,
        defaultValue,
        onChange,
        valueFormat,
        labelSeparator,
        locale,
        classNames,
        styles,
        unstyled,
        closeOnChange,
        size,
        variant,
        dropdownType,
        sortDates,
        maxDate,
        minDate,
        ...rest
    } = useComponentDefaultProps('DatePickerInput', defaultProps, props)

    const { calendarProps, others } = pickCalendarProps(rest)

    const { _value, setValue, formattedValue, dropdownHandlers, dropdownOpened, onClear, shouldClear } = useDatesInput({
        type,
        value,
        defaultValue,
        onChange,
        locale,
        format: valueFormat,
        labelSeparator,
        closeOnChange,
        sortDates,
    })

    return (
        <PickerInputBase
            formattedValue={formattedValue}
            dropdownOpened={dropdownOpened}
            dropdownHandlers={dropdownHandlers}
            classNames={classNames}
            styles={styles}
            unstyled={unstyled}
            __staticSelector='DatePickerInput'
            ref={ref}
            onClear={onClear}
            shouldClear={shouldClear}
            value={_value}
            type={type}
            size={size}
            variant={variant}
            dropdownType={dropdownType}
            {...others}
        >
            <DatePicker
                {...calendarProps}
                size={size}
                variant={variant}
                type={type}
                value={_value}
                defaultDate={
                    Array.isArray(_value)
                        ? _value[0] || getDefaultClampedDate({ maxDate, minDate })
                        : _value || getDefaultClampedDate({ maxDate, minDate })
                }
                onChange={setValue}
                locale={locale}
                classNames={classNames}
                styles={styles}
                unstyled={unstyled}
                __staticSelector='DatePickerInput'
                __stopPropagation={dropdownType === 'popover'}
                maxDate={maxDate}
                minDate={minDate}
            />
        </PickerInputBase>
    )
})

DatePickerInput.displayName = '@worldprinter/wdesign-dates/DatePickerInput'
