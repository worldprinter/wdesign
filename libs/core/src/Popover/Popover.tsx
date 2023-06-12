/* eslint-disable react/no-unused-prop-types */

import React, { useCallback, useRef, useState } from 'react'

import { useClickOutside, useId } from '@worldprinter/wdesign-hooks'
import type { ClassNames, Styles, WDesignNumberSize, WDesignShadow } from '@worldprinter/wdesign-styles'
import { getDefaultZIndex, useComponentDefaultProps, useWDesignTheme } from '@worldprinter/wdesign-styles'

import type { ArrowPosition, FloatingAxesOffsets, FloatingPosition } from '../Floating'
import { getFloatingPosition } from '../Floating'
import type { PortalProps } from '../Portal'
import type { TransitionOverride } from '../Transition'
import { PopoverContextProvider } from './Popover.context'
import type { PopoverMiddlewares, PopoverStylesNames, PopoverStylesParams, PopoverWidth } from './Popover.types'
import { PopoverDropdown } from './PopoverDropdown/PopoverDropdown'
import { PopoverTarget } from './PopoverTarget/PopoverTarget'
import { usePopover } from './use-popover'

export type PopoverBaseProps = {
    /** Dropdown position relative to target */
    position?: FloatingPosition

    /** Default Y axis or either (main, cross, alignment) X and Y axis space between target element and dropdown  */
    offset?: number | FloatingAxesOffsets

    /** Called when dropdown position changes */
    onPositionChange?(position: FloatingPosition): void

    /** useEffect dependencies to force update dropdown position */
    positionDependencies?: any[]

    /** Called when dropdown closes */
    onClose?(): void

    /** Called when dropdown opens */
    onOpen?(): void

    /** If set dropdown will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
    keepMounted?: boolean

    /** Props added to Transition component that used to animate dropdown presence, use to configure duration and animation type, { duration: 150, transition: 'fade' } by default */
    transitionProps?: TransitionOverride

    /** Dropdown width, or 'target' to make dropdown width the same as target element */
    width?: PopoverWidth

    /** Floating ui middlewares to configure position handling */
    middlewares?: PopoverMiddlewares

    /** Determines whether component should have an arrow */
    withArrow?: boolean

    /** Arrow size */
    arrowSize?: number

    /** Arrow offset */
    arrowOffset?: number

    /** Arrow border-radius */
    arrowRadius?: number

    /** Arrow position **/
    arrowPosition?: ArrowPosition

    /** Determines whether dropdown should be rendered within Portal, defaults to false */
    withinPortal?: boolean

    /** Props to pass down to the portal when withinPortal is true */
    portalProps?: Omit<PortalProps, 'children' | 'withinPortal'>

    /** Dropdown z-index */
    zIndex?: React.CSSProperties['zIndex']

    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: WDesignNumberSize

    /** Key of theme.shadow or any other valid css box-shadow value */
    shadow?: WDesignShadow

    /** If set, popover dropdown will not render */
    disabled?: boolean

    /** Determines whether focus should be automatically returned to control when dropdown closes, false by default */
    returnFocus?: boolean
}

export type PopoverProps = {
    /** Popover.Target and Popover.Dropdown components */
    children: React.ReactNode

    /** Initial opened state for uncontrolled component */
    defaultOpened?: boolean

    /** Controls dropdown opened state */
    opened?: boolean

    /** Called with current state when dropdown opens or closes */
    onChange?(opened: boolean): void

    /** Determines whether dropdown should be closed on outside clicks, default to true */
    closeOnClickOutside?: boolean

    /** Events that trigger outside clicks */
    clickOutsideEvents?: string[]

    /** Determines whether focus should be trapped within dropdown, default to false */
    trapFocus?: boolean

    /** Determines whether dropdown should be closed when Escape key is pressed, defaults to true */
    closeOnEscape?: boolean

    /** id base to create accessibility connections */
    id?: string

    /** Determines whether dropdown and target element should have accessible roles, defaults to true */
    withRoles?: boolean

    variant?: string
    unstyled?: boolean
    classNames?: ClassNames<PopoverStylesNames>
    styles?: Styles<PopoverStylesNames, PopoverStylesParams>
    __staticSelector?: string
} & PopoverBaseProps

const defaultProps: Partial<PopoverProps> = {
    position: 'bottom',
    offset: 8,
    positionDependencies: [],
    transitionProps: { transition: 'fade', duration: 150 },
    middlewares: { flip: true, shift: true, inline: false },
    arrowSize: 7,
    arrowOffset: 5,
    arrowRadius: 0,
    arrowPosition: 'side',
    closeOnClickOutside: true,
    withinPortal: false,
    closeOnEscape: true,
    trapFocus: false,
    withRoles: true,
    returnFocus: false,
    clickOutsideEvents: ['mousedown', 'touchstart'],
    zIndex: getDefaultZIndex('popover'),
    __staticSelector: 'Popover',
    width: 'max-content',
}

export function Popover(props: PopoverProps) {
    const arrowRef = useRef<HTMLDivElement | null>(null)
    const {
        children,
        position,
        offset,
        onPositionChange,
        positionDependencies,
        opened,
        transitionProps,
        width,
        middlewares,
        withArrow,
        arrowSize,
        arrowOffset,
        arrowRadius,
        arrowPosition,
        unstyled,
        classNames,
        styles,
        closeOnClickOutside,
        withinPortal,
        portalProps,
        closeOnEscape,
        clickOutsideEvents,
        trapFocus,
        onClose,
        onOpen,
        onChange,
        zIndex,
        radius,
        shadow,
        id,
        defaultOpened,
        __staticSelector,
        withRoles,
        disabled,
        returnFocus,
        variant,
        keepMounted,
        ...others
    } = useComponentDefaultProps('Popover', defaultProps, props)

    const [targetNode, setTargetNode] = useState<HTMLElement>(null)
    const [dropdownNode, setDropdownNode] = useState<HTMLElement>(null)

    const uid = useId(id)
    const theme = useWDesignTheme()
    const popover = usePopover({
        middlewares,
        width,
        position: getFloatingPosition(theme.dir, position),
        offset: typeof offset === 'number' ? offset + (withArrow ? arrowSize / 2 : 0) : offset,
        arrowRef,
        arrowOffset,
        onPositionChange,
        positionDependencies,
        opened,
        defaultOpened,
        onChange,
        onOpen,
        onClose,
    })

    useClickOutside(() => popover.opened && closeOnClickOutside && popover.onClose(), clickOutsideEvents, [
        targetNode,
        dropdownNode,
    ])

    const reference = useCallback(
        (node: HTMLElement) => {
            setTargetNode(node)
            popover.floating.reference(node)
        },
        [popover.floating.reference],
    )

    const floating = useCallback(
        (node: HTMLElement) => {
            setDropdownNode(node)
            popover.floating.floating(node)
        },
        [popover.floating.floating],
    )

    return (
        <PopoverContextProvider
            value={{
                returnFocus,
                disabled,
                controlled: popover.controlled,
                reference,
                floating,
                x: popover.floating.x,
                y: popover.floating.y,
                arrowX: popover.floating?.middlewareData?.arrow?.x,
                arrowY: popover.floating?.middlewareData?.arrow?.y,
                opened: popover.opened,
                arrowRef,
                transitionProps,
                width,
                withArrow,
                arrowSize,
                arrowOffset,
                arrowRadius,
                arrowPosition,
                placement: popover.floating.placement,
                trapFocus,
                withinPortal,
                portalProps,
                zIndex,
                radius,
                shadow,
                closeOnEscape,
                onClose: popover.onClose,
                onToggle: popover.onToggle,
                getTargetId: () => `${uid}-target`,
                getDropdownId: () => `${uid}-dropdown`,
                withRoles,
                targetProps: others,
                __staticSelector,
                classNames,
                styles,
                unstyled,
                variant,
                keepMounted,
            }}
        >
            {children}
        </PopoverContextProvider>
    )
}

Popover.Target = PopoverTarget
Popover.Dropdown = PopoverDropdown
Popover.displayName = '@worldprinter/wdesign-core/Popover'
