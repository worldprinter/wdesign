import React from 'react'

import { useDisclosure } from '@worldprinter/wdesign-hooks'
import type { ClassNames, Styles } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { useDelayedHover } from '../Floating'
import type { PopoverBaseProps, PopoverStylesNames, PopoverStylesParams } from '../Popover'
import { Popover } from '../Popover'
import { HoverCardContextProvider } from './HoverCard.context'
import { HoverCardDropdown } from './HoverCardDropdown/HoverCardDropdown'
import { HoverCardTarget } from './HoverCardTarget/HoverCardTarget'

export type HoverCardProps = {
    variant?: string

    /** HoverCard.Target and HoverCard.Dropdown components */
    children?: React.ReactNode

    /** Initial opened state */
    initiallyOpened?: boolean

    /** Called when dropdown is opened */
    onOpen?(): void

    /** Called when dropdown is closed */
    onClose?(): void

    /** Open delay in ms */
    openDelay?: number

    /** Close delay in ms */
    closeDelay?: number

    unstyled?: boolean
    classNames?: ClassNames<PopoverStylesNames>
    styles?: Styles<PopoverStylesNames, PopoverStylesParams>
} & PopoverBaseProps

const defaultProps: Partial<HoverCardProps> = {
    openDelay: 0,
    closeDelay: 150,
    initiallyOpened: false,
}

export function HoverCard(props: HoverCardProps) {
    const { children, onOpen, onClose, openDelay, closeDelay, initiallyOpened, ...others } = useComponentDefaultProps(
        'HoverCard',
        defaultProps,
        props,
    )
    const [opened, { open, close }] = useDisclosure(initiallyOpened, { onClose, onOpen })
    const { openDropdown, closeDropdown } = useDelayedHover({ open, close, openDelay, closeDelay })

    return (
        <HoverCardContextProvider value={{ openDropdown, closeDropdown }}>
            <Popover
                opened={opened}
                __staticSelector='HoverCard'
                {...others}
            >
                {children}
            </Popover>
        </HoverCardContextProvider>
    )
}

HoverCard.displayName = '@worldprinter/wdesign-core/HoverCard'
HoverCard.Target = HoverCardTarget
HoverCard.Dropdown = HoverCardDropdown
