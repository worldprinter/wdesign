import React, { forwardRef, useEffect, useState } from 'react'

import type {
    DefaultProps,
    MantineColor,
    MantineGradient,
    MantineNumberSize,
    Selectors,
    Variants,
} from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import { Box } from '../Box'
import type { AvatarStylesParams } from './Avatar.styles'
import useStyles from './Avatar.styles'
import { AvatarGroup } from './AvatarGroup/AvatarGroup'
import { useAvatarGroupContext } from './AvatarGroup/AvatarGroup.context'
import { AvatarPlaceholderIcon } from './AvatarPlaceholderIcon'

export type AvatarStylesNames = Selectors<typeof useStyles>

export type AvatarProps = {
    /** Image url */
    src?: string | null

    /** Image alt text or title for placeholder variant */
    alt?: string

    /** Avatar width and height */
    size?: MantineNumberSize

    /** Key of theme.radius or any valid CSS value to set border-radius, "xl" by default */
    radius?: MantineNumberSize

    /** Key of theme.colors */
    color?: MantineColor

    /** Controls appearance */
    variant?: Variants<'filled' | 'light' | 'gradient' | 'outline'>

    /** Gradient input, only used when variant="gradient", theme.defaultGradient by default */
    gradient?: MantineGradient

    /** <img /> element attributes */
    imageProps?: Record<string, any>

    /** Custom placeholder */
    children?: React.ReactNode
} & DefaultProps<AvatarStylesNames, AvatarStylesParams>

const defaultProps: Partial<AvatarProps> = {
    size: 'md',
    color: 'gray',
    variant: 'light',
}

export const _Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
    const {
        className,
        size,
        src,
        alt,
        radius,
        children,
        color,
        variant,
        gradient,
        classNames,
        styles,
        imageProps,
        unstyled,
        ...others
    } = useComponentDefaultProps('Avatar', defaultProps, props)

    const ctx = useAvatarGroupContext()
    const [error, setError] = useState(!src)

    const { classes, cx } = useStyles(
        {
            color,
            radius,
            withinGroup: ctx.withinGroup,
            spacing: ctx.spacing,
            gradient,
        },
        { classNames, styles, unstyled, name: 'Avatar', variant, size },
    )

    useEffect(() => {
        !src ? setError(true) : setError(false)
    }, [src])

    return (
        <Box
            component='div'
            className={cx(classes.root, className)}
            ref={ref}
            {...others}
        >
            {error ? (
                <div
                    className={classes.placeholder}
                    title={alt}
                >
                    {children || <AvatarPlaceholderIcon className={classes.placeholderIcon} />}
                </div>
            ) : (
                <img
                    {...imageProps}
                    className={classes.image}
                    src={src}
                    alt={alt}
                    onError={() => setError(true)}
                />
            )}
        </Box>
    )
}) as any

_Avatar.displayName = '@worldprinter/wdesign-core/Avatar'
_Avatar.Group = AvatarGroup

export const Avatar = createPolymorphicComponent<'div', AvatarProps, { Group: typeof AvatarGroup }>(_Avatar)
