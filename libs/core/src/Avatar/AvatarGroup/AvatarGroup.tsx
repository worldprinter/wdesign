import React, { forwardRef } from 'react'

import type { DefaultProps, MantineNumberSize } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../../Box'
import { AvatarGroupProvider } from './AvatarGroup.context'
import useStyles from './AvatarGroup.styles'

export type AvatarGroupProps = {
    variant?: string

    /** Avatar components */
    children: React.ReactNode

    /** Negative space between Avatars */
    spacing?: MantineNumberSize
} & DefaultProps &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<AvatarGroupProps> = {}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>((props, ref) => {
    const {
        children,
        spacing = 'sm',
        unstyled,
        className,
        variant,
        ...others
    } = useComponentDefaultProps('AvatarGroup', defaultProps, props)
    const { classes, cx } = useStyles({ spacing }, { name: 'AvatarGroup', unstyled, variant })

    return (
        <AvatarGroupProvider spacing={spacing}>
            <Box
                ref={ref}
                className={cx(classes.root, className)}
                {...others}
            >
                {children}
            </Box>
        </AvatarGroupProvider>
    )
})

AvatarGroup.displayName = '@worldprinter/wdesign-core/AvatarGroup'
