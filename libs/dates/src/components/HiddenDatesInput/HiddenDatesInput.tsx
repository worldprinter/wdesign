import React from 'react'

import type { DatePickerType, DatesRangeValue, DateValue } from '../../types'

export type HiddenDatesInputValue = DatesRangeValue | DateValue | DateValue[]

export type HiddenDatesInputProps = {
    value: HiddenDatesInputValue
    type: DatePickerType
    name: string
    form: string
}

function formatValue(value: HiddenDatesInputValue, type: DatePickerType) {
    if (type === 'range' && Array.isArray(value)) {
        const [startDate, endDate] = value
        if (!startDate) {
            return ''
        }

        if (!endDate) {
            return `${startDate.toISOString()} –`
        }

        return `${startDate.toISOString()} – ${endDate.toISOString()}`
    }

    if (type === 'multiple' && Array.isArray(value)) {
        return value.map((date) => date.toISOString()).join(', ')
    }

    if (!Array.isArray(value) && value) {
        return value.toISOString()
    }

    return ''
}

export function HiddenDatesInput({ value, type, name, form }: HiddenDatesInputProps) {
    return (
        <input
            type='hidden'
            value={formatValue(value, type)}
            name={name}
            form={form}
        />
    )
}

HiddenDatesInput.displayName = '@worldprinter/wdesign-dates/HiddenDatesInput'
