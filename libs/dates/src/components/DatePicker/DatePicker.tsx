import React, { forwardRef } from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-core'

import { useDatesState } from '../../hooks'
import type { CalendarLevel, DatePickerType, PickerBaseProps } from '../../types'
import type { CalendarBaseProps, CalendarSettings, CalendarSystemProps } from '../Calendar'
import { Calendar } from '../Calendar'
import type { DecadeLevelBaseSettings } from '../DecadeLevel'
import type { MonthLevelBaseSettings } from '../MonthLevel'
import type { YearLevelBaseSettings } from '../YearLevel'

export type DatePickerBaseProps<Type extends DatePickerType = 'default'> = {
    /** Max level that user can go up to (decade, year, month), defaults to decade */
    maxLevel?: CalendarLevel

    /** Initial level displayed to the user (decade, year, month), used for uncontrolled component */
    defaultLevel?: CalendarLevel

    /** Current level displayed to the user (decade, year, month), used for controlled component */
    level?: CalendarLevel

    /** Called when level changes */
    onLevelChange?(level: CalendarLevel): void
} & PickerBaseProps<Type> &
    DecadeLevelBaseSettings &
    YearLevelBaseSettings &
    MonthLevelBaseSettings &
    CalendarBaseProps &
    CalendarSettings

export type DatePickerProps<Type extends DatePickerType = 'default'> = {} & DatePickerBaseProps<Type> &
    CalendarSystemProps

const defaultProps: Partial<DatePickerProps> = {
    type: 'default',
    numberOfColumns: 1,
}

type DatePickerComponent = (<Type extends DatePickerType = 'default'>(props: DatePickerProps<Type>) => JSX.Element) & {
    displayName?: string
}

export const DatePicker: DatePickerComponent = forwardRef(
    <Type extends DatePickerType = 'default'>(
        props: DatePickerProps<Type>,
        ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
        const {
            type,
            defaultValue,
            value,
            onChange,
            __staticSelector,
            getDayProps,
            allowSingleDateInRange,
            allowDeselect,
            onMouseLeave,
            onMonthSelect,
            numberOfColumns,
            ...others
        } = useComponentDefaultProps('DatePicker', defaultProps, props as any)

        const { onDateChange, onRootMouseLeave, onHoveredDateChange, getControlProps } = useDatesState<Type>({
            type,
            level: 'day',
            allowDeselect,
            allowSingleDateInRange,
            value,
            defaultValue,
            onChange,
            onMouseLeave,
        })

        return (
            <Calendar
                ref={ref}
                minLevel='month'
                __staticSelector={__staticSelector || 'DatePicker'}
                onMouseLeave={onRootMouseLeave}
                hideOutsideDates={numberOfColumns !== 1}
                numberOfColumns={numberOfColumns}
                __onDayMouseEnter={(_event, date) => onHoveredDateChange(date)}
                __onDayClick={(_event, date) => onDateChange(date)}
                getDayProps={(date) => ({
                    ...getControlProps(date),
                    ...getDayProps?.(date),
                })}
                {...others}
            />
        )
    },
)

DatePicker.displayName = '@worldprinter/wdesign-dates/DatePicker'
