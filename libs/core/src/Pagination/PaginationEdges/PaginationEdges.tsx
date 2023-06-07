import React, { forwardRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import { usePaginationContext } from '../Pagination.context'
import type { PaginationIconProps } from '../Pagination.icons'
import {
    getIconSize,
    PaginationFirstIcon,
    PaginationLastIcon,
    PaginationNextIcon,
    PaginationPreviousIcon,
} from '../Pagination.icons'
import { PaginationControl } from '../PaginationControl/PaginationControl'
import useStyles from './PaginationEdges.styles'

export type CreateEdgeComponent = {
    icon: React.FC<PaginationIconProps>
    name: string
    action: 'onNext' | 'onPrevious' | 'onFirst' | 'onLast'
    type: 'next' | 'previous'
}

export type PaginationEdgeProps = {
    icon?: React.FC<PaginationIconProps>
} & DefaultProps

export function createEdgeComponent({ icon, name, action, type }: CreateEdgeComponent) {
    const defaultProps: Partial<PaginationEdgeProps> = { icon }

    const Component = forwardRef<HTMLButtonElement, PaginationEdgeProps>((props, ref) => {
        const { icon: Icon, ...others } = useComponentDefaultProps(name, defaultProps, props)
        const { classes } = useStyles()
        const ctx = usePaginationContext()
        const disabled = type === 'next' ? ctx.active === ctx.total : ctx.active === 1

        return (
            <PaginationControl
                disabled={ctx.disabled || disabled}
                ref={ref}
                onClick={ctx[action]}
                withPadding={false}
                {...others}
            >
                <Icon
                    className={classes.icon}
                    size={getIconSize(ctx.stylesApi.size)}
                />
            </PaginationControl>
        )
    })

    Component.displayName = `@worldprinter/wdesign-core/${name}`
    return createPolymorphicComponent<'button', PaginationEdgeProps>(Component)
}

export const PaginationNext = createEdgeComponent({
    icon: PaginationNextIcon,
    name: 'PaginationNext',
    action: 'onNext',
    type: 'next',
})

export const PaginationPrevious = createEdgeComponent({
    icon: PaginationPreviousIcon,
    name: 'PaginationPrevious',
    action: 'onPrevious',
    type: 'previous',
})

export const PaginationFirst = createEdgeComponent({
    icon: PaginationFirstIcon,
    name: 'PaginationFirst',
    action: 'onFirst',
    type: 'previous',
})

export const PaginationLast = createEdgeComponent({
    icon: PaginationLastIcon,
    name: 'PaginationLast',
    action: 'onLast',
    type: 'next',
})
