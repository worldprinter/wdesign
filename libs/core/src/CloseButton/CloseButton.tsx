import React, { forwardRef } from 'react'

import { rem, useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import type { ActionIconProps } from '../ActionIcon/ActionIcon'
import { ActionIcon } from '../ActionIcon/ActionIcon'
import { CloseIcon } from './CloseIcon'

export type CloseButtonProps = {
    /** Width and height of X icon */
    iconSize?: number | string
} & Omit<ActionIconProps, 'children'> &
    Omit<React.ComponentPropsWithoutRef<'button'>, 'color'>

const iconSizes = {
    xs: rem(12),
    sm: rem(16),
    md: rem(20),
    lg: rem(28),
    xl: rem(34),
}

const defaultProps: Partial<CloseButtonProps> = {
    size: 'sm',
}

export const _CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
    const { iconSize, size, children, ...others } = useComponentDefaultProps('CloseButton', defaultProps, props)
    const _iconSize = rem(iconSize || iconSizes[size])
    return (
        <ActionIcon
            ref={ref}
            __staticSelector='CloseButton'
            size={size}
            {...others}
        >
            {children || (
                <CloseIcon
                    width={_iconSize}
                    height={_iconSize}
                />
            )}
        </ActionIcon>
    )
})

_CloseButton.displayName = '@worldprinter/wdesign-core/CloseButton'

export const CloseButton = createPolymorphicComponent<'button', CloseButtonProps>(_CloseButton)
