import type { MouseEvent } from 'react'
import React from 'react'

import { ActionIcon, Tooltip } from '@worldprinter/wdesign-core'

import type { MRT_Cell, MRT_Row, MRT_TableInstance } from '..'
import { MRT_RowActionMenu } from '../menus/MRT_RowActionMenu'
import { MRT_EditActionButtons } from './MRT_EditActionButtons'

type Props<TData extends Record<string, any> = {}> = {
    cell: MRT_Cell<TData>
    row: MRT_Row<TData>
    table: MRT_TableInstance<TData>
}

export const MRT_ToggleRowActionMenuButton = <TData extends Record<string, any> = {}>({
    cell,
    row,
    table,
}: Props<TData>) => {
    const {
        getState,
        options: {
            editingMode,
            enableEditing,
            icons: { IconEdit },
            localization,
            renderRowActionMenuItems,
            renderRowActions,
        },
        setEditingRow,
    } = table

    const { editingRow } = getState()

    const handleStartEditMode = (event: MouseEvent) => {
        event.stopPropagation()
        setEditingRow({ ...row })
    }

    return (
        <>
            {renderRowActions ? (
                <>{renderRowActions({ cell, row, table })}</>
            ) : row.id === editingRow?.id && editingMode === 'row' ? (
                <MRT_EditActionButtons
                    row={row}
                    table={table}
                />
            ) : !renderRowActionMenuItems &&
              (enableEditing instanceof Function ? enableEditing(row) : enableEditing) ? (
                <Tooltip
                    withinPortal
                    position='right'
                    withArrow
                    label={localization.edit}
                >
                    <ActionIcon
                        aria-label={localization.edit}
                        onClick={handleStartEditMode}
                    >
                        <IconEdit />
                    </ActionIcon>
                </Tooltip>
            ) : renderRowActionMenuItems ? (
                <MRT_RowActionMenu
                    handleEdit={handleStartEditMode}
                    row={row}
                    table={table}
                />
            ) : null}
        </>
    )
}
