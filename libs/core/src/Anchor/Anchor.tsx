import React, { forwardRef } from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import type { TextProps } from '../Text/Text'
import { Text } from '../Text/Text'
import useStyles from './Anchor.styles'

export type AnchorProps = {
    variant?: string
    children?: React.ReactNode
} & Omit<TextProps, 'variant'>

const defaultProps: Partial<AnchorProps> = {
    underline: true,
}

export const _Anchor = forwardRef<HTMLAnchorElement, AnchorProps & { component: any }>((props, ref) => {
    const { component, className, unstyled, variant, size, color, underline, ...others } = useComponentDefaultProps(
        'Anchor',
        defaultProps as AnchorProps & { component: any },
        props,
    )

    const { classes, cx } = useStyles({ color, underline }, { name: 'Anchor', unstyled, variant, size })
    const buttonProps = component === 'button' ? { type: 'button' } : null

    return (
        <Text
            component={component || 'a'}
            ref={ref}
            className={cx(classes.root, className)}
            size={size}
            {...buttonProps}
            {...others}
        />
    )
})

_Anchor.displayName = '@worldprinter/wdesign-core/Anchor'

export const Anchor = createPolymorphicComponent<'a', AnchorProps>(_Anchor)
