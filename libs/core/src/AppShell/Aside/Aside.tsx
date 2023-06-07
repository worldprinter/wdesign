import React, { forwardRef } from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import type { ForwardRefWithStaticComponents } from '@worldprinter/wdesign-utils'

import type { HorizontalSectionSharedProps } from '../HorizontalSection/HorizontalSection'
import { HorizontalSection } from '../HorizontalSection/HorizontalSection'
import { Section } from '../HorizontalSection/Section/Section'

export type AsideProps = {
    /** Aside content */
    children: React.ReactNode
} & HorizontalSectionSharedProps &
    React.ComponentPropsWithRef<'nav'>

type AsideComponent = ForwardRefWithStaticComponents<AsideProps, { Section: typeof Section }>

const defaultProps: Partial<AsideProps> = {
    fixed: false,
    position: { top: 0, right: 0 },
    hiddenBreakpoint: 'md',
    hidden: false,
}

export const Aside: AsideComponent = forwardRef<HTMLElement, AsideProps>((props: AsideProps, ref) => {
    const _props = useComponentDefaultProps('Aside', defaultProps, props)
    return (
        <HorizontalSection
            section='aside'
            __staticSelector='Aside'
            ref={ref}
            {..._props}
        />
    )
}) as any

Aside.Section = Section
Aside.displayName = '@worldprinter/wdesign-core/Aside'
