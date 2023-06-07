import React from 'react'

import type { ActionIconProps } from '@worldprinter/wdesign-core'
import { ActionIcon, Tooltip } from '@worldprinter/wdesign-core'

import type { HTMLPropsRef, MRT_TableInstance } from '..'

type Props<TData extends Record<string, any> = {}> = {
    table: MRT_TableInstance<TData>
} & ActionIconProps &
    HTMLPropsRef<HTMLButtonElement>

export const MRT_ToggleGlobalFilterButton = <TData extends Record<string, any> = {}>({
    table,
    ...rest
}: Props<TData>) => {
    const {
        getState,
        options: {
            icons: { IconSearch, IconCircleOff },

            localization,
        },
        refs: { searchInputRef },
        setShowGlobalFilter,
    } = table
    const { globalFilter, showGlobalFilter } = getState()

    const handleToggleSearch = () => {
        setShowGlobalFilter(!showGlobalFilter)
        setTimeout(() => searchInputRef.current?.focus(), 100)
    }

    return (
        <Tooltip
            withinPortal
            withArrow
            label={rest?.title ?? localization.showHideSearch}
        >
            <ActionIcon
                aria-label={rest?.title ?? localization.showHideSearch}
                disabled={!!globalFilter}
                onClick={handleToggleSearch}
                size='lg'
                {...rest}
                title={undefined}
            >
                {showGlobalFilter ? <IconCircleOff /> : <IconSearch />}
            </ActionIcon>
        </Tooltip>
    )
}
