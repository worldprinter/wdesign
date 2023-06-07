import type { ReferenceType } from '@floating-ui/react'

import type { ClassNames, MantineNumberSize, MantineShadow, Styles } from '@worldprinter/wdesign-styles'
import { createSafeContext } from '@worldprinter/wdesign-utils'

import type { ArrowPosition, FloatingPosition } from '../Floating'
import type { PortalProps } from '../Portal'
import type { TransitionOverride } from '../Transition'
import { POPOVER_ERRORS } from './Popover.errors'
import type { PopoverStylesNames, PopoverStylesParams, PopoverWidth } from './Popover.types'

type PopoverContext = {
    x: number
    y: number
    arrowX: number
    arrowY: number
    arrowRef: React.RefObject<HTMLDivElement>
    opened: boolean
    transitionProps?: TransitionOverride
    reference: (node: ReferenceType) => void
    floating: (node: HTMLElement) => void
    width?: PopoverWidth
    withArrow: boolean
    arrowSize: number
    arrowOffset: number
    arrowRadius: number
    arrowPosition: ArrowPosition
    trapFocus: boolean
    placement: FloatingPosition
    withinPortal: boolean
    portalProps?: Omit<PortalProps, 'children' | 'withinPortal'>
    closeOnEscape: boolean
    zIndex: React.CSSProperties['zIndex']
    radius?: MantineNumberSize
    shadow?: MantineShadow
    onClose?(): void
    getDropdownId(): string
    getTargetId(): string
    controlled: boolean
    onToggle(): void
    withRoles: boolean
    targetProps: Record<string, any>
    disabled: boolean
    returnFocus: boolean
    classNames: ClassNames<PopoverStylesNames>
    styles: Styles<PopoverStylesNames, PopoverStylesParams>
    unstyled: boolean
    __staticSelector: string
    variant: string
    keepMounted: boolean
}

export const [PopoverContextProvider, usePopoverContext] = createSafeContext<PopoverContext>(POPOVER_ERRORS.context)
