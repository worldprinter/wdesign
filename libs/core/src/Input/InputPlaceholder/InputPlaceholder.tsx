import React, { forwardRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { packSx } from '@worldprinter/wdesign-utils'

import { Box } from '../../Box'

export type InputPlaceholderProps = {} & DefaultProps & React.ComponentPropsWithoutRef<'span'>

const defaultProps: Partial<InputPlaceholderProps> = {}

export const InputPlaceholder = forwardRef<HTMLSpanElement, InputPlaceholderProps>((props, ref) => {
    const { sx, ...others } = useComponentDefaultProps('InputPlaceholder', defaultProps, props)
    return (
        <Box
            component='span'
            sx={[(theme) => theme.fn.placeholderStyles(), ...packSx(sx)]}
            ref={ref}
            {...others}
        />
    )
})

InputPlaceholder.displayName = '@worldprinter/wdesign-core/InputPlaceholder'
