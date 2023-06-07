import React from 'react'

import type { ActionIconProps } from '@worldprinter/wdesign-core'
import { ActionIcon, Tooltip } from '@worldprinter/wdesign-core'

import type { HTMLPropsRef, MRT_TableInstance } from '..'

type Props<TData extends Record<string, any> = {}> = {
    table: MRT_TableInstance<TData>
} & ActionIconProps &
    HTMLPropsRef<HTMLButtonElement>

export const MRT_ToggleFiltersButton = <TData extends Record<string, any> = {}>({ table, ...rest }: Props<TData>) => {
    const {
        getState,
        options: {
            icons: { IconFilter, IconFilterOff },
            localization,
        },
        setShowColumnFilters,
    } = table
    const { showColumnFilters } = getState()

    const handleToggleShowFilters = () => {
        setShowColumnFilters(!showColumnFilters)
    }

    return (
        <Tooltip
            withinPortal
            withArrow
            label={rest?.title ?? localization.showHideFilters}
        >
            <ActionIcon
                aria-label={localization.showHideFilters}
                onClick={handleToggleShowFilters}
                size='lg'
                {...rest}
                title={undefined}
            >
                {showColumnFilters ? <IconFilterOff /> : <IconFilter />}
            </ActionIcon>
        </Tooltip>
    )
}
