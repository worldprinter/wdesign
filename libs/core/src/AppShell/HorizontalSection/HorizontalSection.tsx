import React, { forwardRef } from 'react'

import type { DefaultProps, WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { em, getDefaultZIndex, Global, rem } from '@worldprinter/wdesign-styles'

import { Box } from '../../Box'
import { useAppShellContext } from '../AppShell.context'
import { getSortedBreakpoints } from './get-sorted-breakpoints/get-sorted-breakpoints'
import type { HorizontalSectionPosition, HorizontalSectionWidth } from './HorizontalSection.styles'
import useStyles from './HorizontalSection.styles'

export type HorizontalSectionSharedProps = {
    variant?: string

    /** Component width with breakpoints */
    width?: HorizontalSectionWidth

    /** Component height */
    height?: string | number

    /** HorizontalSection content */
    children: React.ReactNode

    /** Determines whether the element should have border */
    withBorder?: boolean

    /** Set position to fixed */
    fixed?: boolean

    /** Position for fixed variant */
    position?: HorizontalSectionPosition

    /** Breakpoint at which component will be hidden if hidden prop is true */
    hiddenBreakpoint?: WDesignNumberSize

    /** Set to true to hide component at hiddenBreakpoint */
    hidden?: boolean

    /** z-index */
    zIndex?: React.CSSProperties['zIndex']
} & DefaultProps

export type HorizontalSectionProps = {
    section: 'navbar' | 'aside'
    __staticSelector: string
} & HorizontalSectionSharedProps &
    Omit<React.ComponentPropsWithRef<'nav'>, 'children'>

export const HorizontalSection = forwardRef<HTMLElement, HorizontalSectionProps>(
    (
        {
            width,
            height,
            fixed = false,
            position,
            zIndex,
            hiddenBreakpoint = 'md',
            hidden = false,
            withBorder = true,
            className,
            classNames,
            styles,
            children,
            section,
            __staticSelector,
            unstyled,
            variant,
            ...others
        }: HorizontalSectionProps,
        ref,
    ) => {
        const ctx = useAppShellContext()

        const { classes, cx, theme } = useStyles(
            {
                width,
                height,
                fixed: ctx.fixed || fixed,
                position,
                hiddenBreakpoint,
                zIndex: zIndex || ctx.zIndex || getDefaultZIndex('app'),
                section,
                withBorder,
                layout: ctx.layout,
            },
            { classNames, styles, name: __staticSelector, unstyled, variant },
        )

        const breakpoints = getSortedBreakpoints(width, theme).reduce((acc, [breakpoint, breakpointSize]) => {
            acc[`@media (min-width: ${em(breakpoint)})`] = {
                [`--wdesign-${section}-width`]: rem(breakpointSize),
            }

            return acc
        }, {})

        return (
            <Box
                component={section === 'navbar' ? 'nav' : 'aside'}
                ref={ref}
                data-hidden={hidden || undefined}
                className={cx(classes.root, className)}
                {...others}
            >
                {children}

                <Global
                    styles={() => ({
                        ':root': {
                            [`--wdesign-${section}-width`]: width?.base ? rem(width.base) : '0rem',
                            ...breakpoints,
                        },
                    })}
                />
            </Box>
        )
    },
)

HorizontalSection.displayName = '@worldprinter/wdesign-core/HorizontalSection'
