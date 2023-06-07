import React, { forwardRef } from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import type { VerticalSectionSharedProps } from '../VerticalSection/VerticalSection'
import { VerticalSection } from '../VerticalSection/VerticalSection'

export type FooterProps = {
    /** Footer content */
    children: React.ReactNode
} & VerticalSectionSharedProps &
    React.ComponentPropsWithoutRef<'nav'>

const defaultProps: Partial<FooterProps> = {
    fixed: false,
    position: { bottom: 0, left: 0, right: 0 },
}

export const Footer = forwardRef<HTMLElement, FooterProps>((props: FooterProps, ref) => {
    const _props = useComponentDefaultProps('Footer', defaultProps, props)
    return (
        <VerticalSection
            section='footer'
            __staticSelector='Footer'
            {..._props}
            ref={ref}
        />
    )
})

Footer.displayName = '@worldprinter/wdesign-core/Footer'
