import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../../Box'
import { usePaginationContext } from '../Pagination.context'
import type { PaginationIconProps } from '../Pagination.icons'
import { getIconSize, PaginationDotsIcon } from '../Pagination.icons'
import useStyles from './PaginationDots.styles'

export type PaginationDotsStylesNames = Selectors<typeof useStyles>

export type PaginationDotsProps = {
    /** Custom dots icon component, must accept svg element props and size prop */
    icon?: React.FC<PaginationIconProps>
} & DefaultProps<PaginationDotsStylesNames> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<PaginationDotsProps> = {
    icon: PaginationDotsIcon,
}

export const PaginationDots = forwardRef<HTMLDivElement, PaginationDotsProps>((props, ref) => {
    const { className, icon: Icon, ...others } = useComponentDefaultProps('PaginationDots', defaultProps, props)

    const ctx = usePaginationContext()
    const { classes, cx } = useStyles(null, ctx.stylesApi)

    return (
        <Box
            ref={ref}
            className={cx(classes.dots, className)}
            {...others}
        >
            <Icon size={getIconSize(ctx.stylesApi.size)} />
        </Box>
    )
})

PaginationDots.displayName = '@worldprinter/wdesign-core/PaginationDots'
