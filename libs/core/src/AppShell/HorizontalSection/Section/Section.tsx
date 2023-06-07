import React, { forwardRef } from 'react'

import { DefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent, packSx } from '@worldprinter/wdesign-utils'

import { Box } from '../../../Box'

export interface SectionProps extends DefaultProps {
    /** Section children */
    children: React.ReactNode

    /** Force section to take all available height */
    grow?: boolean
}

export const _Section = forwardRef<HTMLDivElement, SectionProps>(({ children, grow = false, sx, ...others }, ref) => (
    <Box
        ref={ref}
        sx={[{ flex: grow ? 1 : 0, boxSizing: 'border-box' }, ...packSx(sx)]}
        {...others}
    >
        {children}
    </Box>
))

_Section.displayName = '@worldprinter/wdesign-core/Section'

export const Section = createPolymorphicComponent<'div', SectionProps>(_Section)
