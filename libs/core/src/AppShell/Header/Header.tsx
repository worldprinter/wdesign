import React, { forwardRef } from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import type { VerticalSectionSharedProps } from '../VerticalSection/VerticalSection'
import { VerticalSection } from '../VerticalSection/VerticalSection'

export type HeaderProps = {
    /** Header content */
    children: React.ReactNode
} & VerticalSectionSharedProps &
    React.ComponentPropsWithoutRef<'nav'>

const defaultProps: Partial<HeaderProps> = {
    fixed: false,
    position: { top: 0, left: 0, right: 0 },
}

export const Header = forwardRef<HTMLElement, HeaderProps>((props: HeaderProps, ref) => {
    const _props = useComponentDefaultProps('Header', defaultProps, props)
    return (
        <VerticalSection
            section='header'
            __staticSelector='Header'
            {..._props}
            ref={ref}
        />
    )
})

Header.displayName = '@worldprinter/wdesign-core/Header'
