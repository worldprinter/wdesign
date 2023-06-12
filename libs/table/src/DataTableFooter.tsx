import type { CSSProperties } from 'react'
import { forwardRef, type ForwardedRef } from 'react'

import { Box, createStyles, type CSSObject, type WDesignTheme } from '@worldprinter/wdesign-core'

import DataTableFooterCell from './DataTableFooterCell'
import DataTableFooterSelectorPlaceholderCell from './DataTableFooterSelectorPlaceholderCell'
import type { DataTableColumn } from './types'

const useStyles = createStyles(
    (
        theme,
        { scrollDiff, borderColor }: { scrollDiff: number; borderColor: string | ((theme: WDesignTheme) => string) },
    ) => {
        const relative = scrollDiff < 0
        const borderColorValue = typeof borderColor === 'function' ? borderColor(theme) : borderColor

        return {
            root: {
                zIndex: 2,
                position: relative ? 'relative' : 'sticky',
                bottom: relative ? scrollDiff : -1,
                background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                '&& tr th': {
                    borderTopColor: borderColorValue,
                },
            },
            relative: {
                position: 'relative',
            },
            textSelectionDisabled: {
                userSelect: 'none',
            },
        }
    },
)

type DataTableFooterProps<T> = {
    borderColor: string | ((theme: WDesignTheme) => string)
    className?: string
    style?: CSSObject
    columns: DataTableColumn<T>[]
    selectionVisible: boolean
    leftShadowVisible: boolean
    scrollDiff: number
}

export default forwardRef(function DataTableFooter<T>(
    {
        className,
        style,
        borderColor,
        columns,
        selectionVisible,
        leftShadowVisible,
        scrollDiff,
    }: DataTableFooterProps<T>,
    ref: ForwardedRef<HTMLTableSectionElement>,
) {
    const { cx, classes } = useStyles({ scrollDiff, borderColor })

    return (
        <Box
            component='tfoot'
            ref={ref}
            className={cx(classes.root, className)}
            style={style as CSSProperties}
        >
            <tr>
                {selectionVisible && <DataTableFooterSelectorPlaceholderCell shadowVisible={leftShadowVisible} />}
                {columns.map(
                    ({
                        accessor,
                        hidden,
                        visibleMediaQuery,
                        textAlignment,
                        width,
                        footer,
                        footerClassName,
                        footerStyle,
                        footerSx,
                        noWrap,
                        ellipsis,
                    }) =>
                        hidden ? null : (
                            <DataTableFooterCell<T>
                                key={accessor}
                                className={footerClassName}
                                style={footerStyle}
                                sx={footerSx}
                                visibleMediaQuery={visibleMediaQuery}
                                textAlignment={textAlignment}
                                width={width}
                                title={footer}
                                noWrap={noWrap}
                                ellipsis={ellipsis}
                            />
                        ),
                )}
            </tr>
        </Box>
    )
}) as <T>(props: DataTableFooterProps<T> & { ref: ForwardedRef<HTMLTableSectionElement> }) => JSX.Element
