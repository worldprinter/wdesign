import React from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createEventHandler } from '@worldprinter/wdesign-utils'

import type { PopoverDropdownProps } from '../../Popover'
import { Popover } from '../../Popover'
import { useHoverCardContext } from '../HoverCard.context'

export type HoverCardDropdownProps = {
    /** Dropdown content */
    children?: React.ReactNode
} & PopoverDropdownProps

const defaultProps: Partial<HoverCardDropdownProps> = {}

export function HoverCardDropdown(props: HoverCardDropdownProps) {
    const { children, onMouseEnter, onMouseLeave, ...others } = useComponentDefaultProps(
        'HoverCardDropdown',
        defaultProps,
        props,
    )

    const ctx = useHoverCardContext()

    const handleMouseEnter = createEventHandler(onMouseEnter, ctx.openDropdown)
    const handleMouseLeave = createEventHandler(onMouseLeave, ctx.closeDropdown)

    return (
        <Popover.Dropdown
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...others}
        >
            {children}
        </Popover.Dropdown>
    )
}

HoverCardDropdown.displayName = '@worldprinter/wdesign-core/HoverCardDropdown'
