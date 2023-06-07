import React, { forwardRef } from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-core'

import { useDatesState } from '../../hooks'
import type { DatePickerType, PickerBaseProps } from '../../types'
import type { CalendarBaseProps, CalendarSystemProps } from '../Calendar'
import { Calendar } from '../Calendar'
import type { DecadeLevelBaseSettings } from '../DecadeLevel'

export type YearPickerBaseProps<Type extends DatePickerType = 'default'> = {} & PickerBaseProps<Type> &
    DecadeLevelBaseSettings &
    Omit<CalendarBaseProps, 'onNextYear' | 'onPreviousYear' | 'onNextMonth' | 'onPreviousMonth'>

export type YearPickerProps<Type extends DatePickerType = 'default'> = {} & YearPickerBaseProps<Type> &
    CalendarSystemProps

const defaultProps: Partial<YearPickerProps> = {
    type: 'default',
}

type YearPickerComponent = (<Type extends DatePickerType = 'default'>(props: YearPickerProps<Type>) => JSX.Element) & {
    displayName?: string
}

export const YearPicker: YearPickerComponent = forwardRef(
    <Type extends DatePickerType = 'default'>(
        props: YearPickerProps<Type>,
        ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
        const {
            type,
            defaultValue,
            value,
            onChange,
            __staticSelector,
            getYearControlProps,
            allowSingleDateInRange,
            allowDeselect,
            onMouseLeave,
            onYearSelect,
            ...others
        } = useComponentDefaultProps('YearPicker', defaultProps, props as any)

        const { onDateChange, onRootMouseLeave, onHoveredDateChange, getControlProps } = useDatesState<Type>({
            type,
            level: 'year',
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
                minLevel='decade'
                __updateDateOnYearSelect={false}
                __staticSelector={__staticSelector || 'YearPicker'}
                onMouseLeave={onRootMouseLeave}
                onYearMouseEnter={(_event, date) => onHoveredDateChange(date)}
                onYearSelect={(date) => {
                    onDateChange(date)
                    onYearSelect?.(date)
                }}
                getYearControlProps={(date) => ({
                    ...getControlProps(date),
                    ...getYearControlProps?.(date),
                })}
                {...others}
            />
        )
    },
)

YearPicker.displayName = '@worldprinter/wdesign-dates/YearPicker'
