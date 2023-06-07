import React from 'react'

import type { ActionIconProps } from '@worldprinter/wdesign-core'
import { ActionIcon, Menu, Tooltip } from '@worldprinter/wdesign-core'

import type { HTMLPropsRef, MRT_TableInstance } from '..'
import { MRT_ShowHideColumnsMenu } from '../menus/MRT_ShowHideColumnsMenu'

type Props<TData extends Record<string, any> = {}> = {
    table: MRT_TableInstance<TData>
} & ActionIconProps &
    HTMLPropsRef<HTMLButtonElement>

export const MRT_ShowHideColumnsButton = <TData extends Record<string, any> = {}>({ table, ...rest }: Props<TData>) => {
    const {
        options: {
            icons: { IconColumns },
            localization,
        },
    } = table

    return (
        <Menu
            closeOnItemClick={false}
            withinPortal
        >
            <Tooltip
                withinPortal
                withArrow
                label={rest?.title ?? localization.showHideColumns}
            >
                <Menu.Target>
                    <ActionIcon
                        aria-label={localization.showHideColumns}
                        size='lg'
                        {...rest}
                        title={undefined}
                    >
                        <IconColumns />
                    </ActionIcon>
                </Menu.Target>
            </Tooltip>
            <MRT_ShowHideColumnsMenu table={table} />
        </Menu>
    )
}
