import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../../Box'
import { useMenuContext } from '../Menu.context'
import useStyles from './MenuDivider.styles'

export type MenuDividerStylesNames = Selectors<typeof useStyles>

export type MenuDividerProps = {} & DefaultProps & React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<MenuDividerProps> = {}

export const MenuDivider = forwardRef<HTMLDivElement, MenuDividerProps>((props, ref) => {
    const { children, className, ...others } = useComponentDefaultProps('MenuDivider', defaultProps, props)

    const { classNames, styles, unstyled, variant } = useMenuContext()
    const { classes, cx } = useStyles(null, {
        name: 'Menu',
        classNames,
        styles,
        unstyled,
        variant,
    })
    return (
        <Box
            className={cx(classes.divider, className)}
            ref={ref}
            {...others}
        />
    )
})

MenuDivider.displayName = '@worldprinter/wdesign-core/MenuDivider'
