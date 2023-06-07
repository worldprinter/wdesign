import React, { forwardRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import { Box } from '../Box'
import useStyles from './UnstyledButton.styles'

export type UnstyledButtonProps = {
    variant?: string
    children?: React.ReactNode
} & DefaultProps

export const _UnstyledButton = forwardRef<HTMLDivElement, UnstyledButtonProps & { component?: any }>((props, ref) => {
    const {
        className,
        component = 'button',
        unstyled,
        variant,
        ...others
    } = useComponentDefaultProps('UnstyledButton', {}, props)

    const { classes, cx } = useStyles(null, {
        name: 'UnstyledButton',
        unstyled,
        variant,
    })

    return (
        <Box
            component={component}
            ref={ref}
            className={cx(classes.root, className)}
            type={component === 'button' ? 'button' : undefined}
            {...others}
        />
    )
})

_UnstyledButton.displayName = '@worldprinter/wdesign-core/UnstyledButton'

export const UnstyledButton = createPolymorphicComponent<'button', UnstyledButtonProps>(_UnstyledButton)
