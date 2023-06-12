import { IconArrowsVertical, IconArrowUp, IconFilter } from '@tabler/icons-react'
import type { CSSProperties, ReactNode } from 'react'
import { type BaseSyntheticEvent } from 'react'

import {
    ActionIcon,
    Box,
    Center,
    createStyles,
    Group,
    Popover,
    type Sx,
    type WDesignTheme,
} from '@worldprinter/wdesign-core'
import { useDisclosure } from '@worldprinter/wdesign-hooks'

import type { DataTableColumn, DataTableSortProps } from './types'
import { humanize, useMediaQueryStringOrFunction } from './utils'

const useStyles = createStyles((theme) => ({
    sortableColumnHeader: {
        cursor: 'pointer',
        transition: 'background .15s ease',
        '&:hover:not(:has(button:hover))': {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
    sortableColumnHeaderGroup: {
        gap: '0.25em',
    },
    columnHeaderText: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    sortableColumnHeaderText: {
        minWidth: 0,
        flexGrow: 1,
    },
    sortableColumnHeaderIcon: {
        transition: 'transform .15s ease',
    },
    sortableColumnHeaderIconRotated: {
        transform: 'rotate3d(0, 0, 1, 180deg)',
    },
    sortableColumnHeaderUnsortedIcon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
        transition: 'color .15s ease',
        'th:hover &': {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        },
    },
}))

type DataTableHeaderCellProps<T> = {
    className?: string
    sx?: Sx
    style?: CSSProperties
    visibleMediaQuery: string | ((theme: WDesignTheme) => string) | undefined
    title: ReactNode | undefined
    sortStatus: DataTableSortProps['sortStatus']
    sortIcons: DataTableSortProps['sortIcons']
    onSortStatusChange: DataTableSortProps['onSortStatusChange']
} & Pick<DataTableColumn<T>, 'accessor' | 'sortable' | 'textAlignment' | 'width' | 'filter' | 'filtering'>

function Filter<T>({ children, isActive }: { children: DataTableColumn<T>['filter']; isActive: boolean }) {
    const [isOpen, { close, toggle }] = useDisclosure(false)

    return (
        <Popover
            withArrow
            withinPortal
            shadow='md'
            opened={isOpen}
            onClose={close}
            trapFocus
        >
            <Popover.Target>
                <ActionIcon
                    onClick={(e) => {
                        e.preventDefault()
                        toggle()
                    }}
                    variant={isActive ? 'default' : 'subtle'}
                >
                    <IconFilter size={14} />
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>{typeof children === 'function' ? children({ close }) : children}</Popover.Dropdown>
        </Popover>
    )
}

export default function DataTableHeaderCell<T>({
    className,
    sx,
    style,
    accessor,
    visibleMediaQuery,
    title,
    sortable,
    sortIcons,
    textAlignment,
    width,
    sortStatus,
    onSortStatusChange,
    filter,
    filtering,
}: DataTableHeaderCellProps<T>) {
    const { cx, classes } = useStyles()
    if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null
    const text = title ?? humanize(accessor)
    const tooltip = typeof text === 'string' ? text : undefined
    const sortAction =
        sortable && onSortStatusChange
            ? (e?: BaseSyntheticEvent) => {
                  if (e?.defaultPrevented) {
                      return
                  }
                  onSortStatusChange({
                      columnAccessor: accessor,
                      direction:
                          sortStatus?.columnAccessor === accessor
                              ? sortStatus.direction === 'asc'
                                  ? 'desc'
                                  : 'asc'
                              : sortStatus?.direction ?? 'asc',
                  })
              }
            : undefined
    return (
        <Box
            component='th'
            className={cx({ [classes.sortableColumnHeader]: sortable }, className)}
            sx={[
                {
                    '&&': { textAlign: textAlignment },
                    width,
                    minWidth: width,
                    maxWidth: width,
                },
                sx,
            ]}
            style={style}
            role={sortable ? 'button' : undefined}
            tabIndex={sortable ? 0 : undefined}
            onClick={sortAction}
            onKeyDown={(e) => e.key === 'Enter' && sortAction?.()}
        >
            <Group
                className={classes.sortableColumnHeaderGroup}
                position='apart'
                noWrap
            >
                <Box
                    className={cx(classes.columnHeaderText, classes.sortableColumnHeaderText)}
                    title={tooltip}
                >
                    {text}
                </Box>
                {sortable || sortStatus?.columnAccessor === accessor ? (
                    <>
                        {sortStatus?.columnAccessor === accessor ? (
                            <Center
                                className={cx(classes.sortableColumnHeaderIcon, {
                                    [classes.sortableColumnHeaderIconRotated]: sortStatus.direction === 'desc',
                                })}
                                role='img'
                                aria-label={`Sorted ${sortStatus.direction === 'desc' ? 'descending' : 'ascending'}`}
                            >
                                {sortIcons?.sorted || <IconArrowUp size={14} />}
                            </Center>
                        ) : (
                            <Center
                                className={classes.sortableColumnHeaderUnsortedIcon}
                                role='img'
                                aria-label='Not sorted'
                            >
                                {sortIcons?.unsorted || <IconArrowsVertical size={14} />}
                            </Center>
                        )}
                    </>
                ) : null}
                {filter ? <Filter isActive={!!filtering}>{filter}</Filter> : null}
            </Group>
        </Box>
    )
}
