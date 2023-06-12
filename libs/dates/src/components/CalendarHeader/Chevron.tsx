import React from 'react'

import { ChevronIcon, useWDesignTheme } from '@worldprinter/wdesign-core'

type ChevronProps = {
    direction: 'next' | 'previous'
} & React.ComponentPropsWithoutRef<'svg'>

export function Chevron({ direction, style, ...others }: ChevronProps) {
    const theme = useWDesignTheme()
    return (
        <ChevronIcon
            {...others}
            style={{
                ...style,
                transform:
                    (direction === 'next' && theme.dir === 'ltr') || (direction === 'previous' && theme.dir === 'rtl')
                        ? 'rotate(270deg)'
                        : 'rotate(90deg)',
            }}
        />
    )
}

Chevron.displayName = '@worldprinter/wdesign-dates/Chevron'
