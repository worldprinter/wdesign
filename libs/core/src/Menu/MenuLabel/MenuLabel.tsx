import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Text } from '../../Text'
import { useMenuContext } from '../Menu.context'
import useStyles from './MenuLabel.styles'

export type MenuLabelStylesName = Selectors<typeof useStyles>

export type MenuLabelProps = {
    /** Label content */
    children?: React.ReactNode
} & DefaultProps &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<MenuLabelProps> = {}

export const MenuLabel = forwardRef<HTMLDivElement, MenuLabelProps>((props, ref) => {
    const { children, className, ...others } = useComponentDefaultProps('MenuLabel', defaultProps, props)

    const { classNames, styles, unstyled, variant } = useMenuContext()
    const { classes, cx } = useStyles(null, {
        name: 'Menu',
        classNames,
        styles,
        unstyled,
        variant,
    })

    return (
        <Text
            className={cx(classes.label, className)}
            ref={ref}
            {...others}
        >
            {children}
        </Text>
    )
})

MenuLabel.displayName = '@worldprinter/wdesign-core/MenuLabel'
