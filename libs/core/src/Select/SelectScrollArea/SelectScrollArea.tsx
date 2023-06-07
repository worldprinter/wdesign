import React, { forwardRef } from 'react'

import type { ScrollAreaProps } from '../../ScrollArea'
import { ScrollArea } from '../../ScrollArea'

export const SelectScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
    ({ style, ...others }: ScrollAreaProps, ref) => (
        <ScrollArea
            {...others}
            style={{ width: '100%', ...style }}
            viewportProps={{ tabIndex: -1 }}
            viewportRef={ref}
        >
            {others.children}
        </ScrollArea>
    ),
)

SelectScrollArea.displayName = '@worldprinter/wdesign-core/SelectScrollArea'
