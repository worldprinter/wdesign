/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { UnstyledButton } from '../../UnstyledButton'
import { usePaginationContext } from '../Pagination.context'
import useStyles from './PaginationControl.styles'

export type PaginationControlStylesNames = Selectors<typeof useStyles>

export type PaginationControlProps = {
    /** Determines whether control should have active styles */
    active?: boolean

    /** Determines whether control should have padding, true by default */
    withPadding?: boolean
} & DefaultProps &
    React.ComponentPropsWithoutRef<'button'>

const defaultProps: Partial<PaginationControlProps> = {
    withPadding: true,
}

export const PaginationControl = forwardRef<HTMLButtonElement, PaginationControlProps>((props, ref) => {
    const { active, className, disabled, withPadding, ...others } = useComponentDefaultProps(
        'PaginationControl',
        defaultProps,
        props,
    )

    const ctx = usePaginationContext()
    const { classes, cx } = useStyles({ color: ctx.color, radius: ctx.radius, withPadding }, ctx.stylesApi)

    return (
        <UnstyledButton
            {...others}
            disabled={disabled}
            data-active={active || undefined}
            data-disabled={disabled || undefined}
            ref={ref}
            className={cx(classes.control, className)}
        />
    )
})

PaginationControl.displayName = '@worldprinter/wdesign-core/PaginationControl'
