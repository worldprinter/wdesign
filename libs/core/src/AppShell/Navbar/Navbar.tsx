import React, { forwardRef } from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import type { ForwardRefWithStaticComponents } from '@worldprinter/wdesign-utils'

import type { HorizontalSectionSharedProps } from '../HorizontalSection/HorizontalSection'
import { HorizontalSection } from '../HorizontalSection/HorizontalSection'
import { Section } from '../HorizontalSection/Section/Section'

export type NavbarProps = {
    /** Navbar content */
    children: React.ReactNode
} & HorizontalSectionSharedProps &
    React.ComponentPropsWithRef<'nav'>

type NavbarComponent = ForwardRefWithStaticComponents<NavbarProps, { Section: typeof Section }>

const defaultProps: Partial<NavbarProps> = {
    fixed: false,
    position: { top: 0, left: 0 },
    hiddenBreakpoint: 'md',
    hidden: false,
}

export const Navbar: NavbarComponent = forwardRef<HTMLElement, NavbarProps>((props: NavbarProps, ref) => {
    const _props = useComponentDefaultProps('Navbar', defaultProps, props)
    return (
        <HorizontalSection
            section='navbar'
            __staticSelector='Navbar'
            ref={ref}
            {..._props}
        />
    )
}) as any

Navbar.Section = Section
Navbar.displayName = '@worldprinter/wdesign-core/Navbar'
