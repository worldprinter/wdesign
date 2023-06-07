import React from 'react'

import type { ActionIconProps } from '@worldprinter/wdesign-core'
import { ActionIcon, Tooltip } from '@worldprinter/wdesign-core'

import type { HTMLPropsRef, MRT_TableInstance } from '..'

type Props<TData extends Record<string, any> = {}> = {
    table: MRT_TableInstance<TData>
} & ActionIconProps &
    HTMLPropsRef<HTMLButtonElement>

export const MRT_ToggleFullScreenButton = <TData extends Record<string, any> = {}>({
    table,
    ...rest
}: Props<TData>) => {
    const {
        getState,
        options: {
            icons: { IconMinimize, IconMaximize },
            localization,
        },
        setIsFullScreen,
    } = table
    const { isFullScreen } = getState()

    const handleToggleFullScreen = () => {
        setIsFullScreen(!isFullScreen)
    }

    return (
        <Tooltip
            withinPortal
            withArrow
            label={rest?.title ?? localization.toggleFullScreen}
        >
            <ActionIcon
                aria-label={localization.showHideFilters}
                onClick={handleToggleFullScreen}
                size='lg'
                {...rest}
                title={undefined}
            >
                {isFullScreen ? <IconMinimize /> : <IconMaximize />}
            </ActionIcon>
        </Tooltip>
    )
}
