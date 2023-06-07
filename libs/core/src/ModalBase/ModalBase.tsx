/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

import { useFocusReturn, useId, useWindowEvent } from '@worldprinter/wdesign-hooks'
import type {
    ClassNames,
    DefaultProps,
    MantineNumberSize,
    MantineShadow,
    Selectors,
    Styles,
} from '@worldprinter/wdesign-styles'
import { getDefaultZIndex, useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import type { PortalProps } from '../Portal'
import { OptionalPortal } from '../Portal'
import type { TransitionOverride } from '../Transition'
import { ModalBaseProvider } from './ModalBase.context'
import useStyles from './ModalBase.styles'
import type { ModalBaseBodyStylesNames } from './ModalBaseBody/ModalBaseBody'
import { ModalBaseBody } from './ModalBaseBody/ModalBaseBody'
import type { ModalBaseCloseButtonStylesNames } from './ModalBaseCloseButton/ModalBaseCloseButton'
import { ModalBaseCloseButton } from './ModalBaseCloseButton/ModalBaseCloseButton'
import type { ModalBaseContentStylesNames } from './ModalBaseContent/ModalBaseContent'
import { ModalBaseContent } from './ModalBaseContent/ModalBaseContent'
import type { ModalBaseHeaderStylesNames } from './ModalBaseHeader/ModalBaseHeader'
import { ModalBaseHeader } from './ModalBaseHeader/ModalBaseHeader'
import type { ModalBaseOverlayStylesNames } from './ModalBaseOverlay/ModalBaseOverlay'
import { ModalBaseOverlay } from './ModalBaseOverlay/ModalBaseOverlay'
import type { ModalBaseTitleStylesNames } from './ModalBaseTitle/ModalBaseTitle'
import { ModalBaseTitle } from './ModalBaseTitle/ModalBaseTitle'
import { NativeScrollArea } from './NativeScrollArea/NativeScrollArea'
import { useLockScroll } from './use-lock-scroll'

export type ModalBaseStylesNames =
    | Selectors<typeof useStyles>
    | ModalBaseCloseButtonStylesNames
    | ModalBaseOverlayStylesNames
    | ModalBaseContentStylesNames
    | ModalBaseHeaderStylesNames
    | ModalBaseTitleStylesNames
    | ModalBaseBodyStylesNames

export type ModalBaseSettings = {
    variant?: string
    classNames?: ClassNames<ModalBaseStylesNames>
    styles?: Styles<ModalBaseStylesNames>
    unstyled?: boolean

    /** If set modal/drawer will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
    keepMounted?: boolean

    /** Determines whether modal/drawer is opened */
    opened: boolean

    /** Called when modal/drawer is closed */
    onClose(): void

    /** Child component */
    children?: React.ReactNode

    /** Determines whether the modal/drawer should be closed when user clicks on the overlay, true by default */
    closeOnClickOutside?: boolean

    /** Props added to Transition component that used to animate overlay and body, use to configure duration and animation type, { duration: 200, transition: 'pop' } by default */
    transitionProps?: TransitionOverride

    /** Determines whether component should be rendered inside Portal, true by default */
    withinPortal?: boolean

    /** Props to pass down to the portal when withinPortal is true */
    portalProps?: Omit<PortalProps, 'children' | 'withinPortal' | 'target'>

    /** Target element or selector where Portal should be rendered, by default new element is created and appended to the document.body */
    target?: HTMLElement | string

    /** Determines whether scroll should be locked when opened={true}, defaults to true */
    lockScroll?: boolean

    /** Determines whether focus should be trapped, true by default */
    trapFocus?: boolean

    /** z-index CSS property of root element, 200 by default */
    zIndex?: number

    /** Key of theme.spacing or any valid CSS value to set content, header and footer padding, 'md' by default */
    padding?: MantineNumberSize

    /** Id used to connect modal/drawer with body and title */
    id?: string

    /** Determines whether focus should be returned to the last active element onClose is called, true by default */
    returnFocus?: boolean

    /** Determines whether onClose should be called when user presses escape key, true by default */
    closeOnEscape?: boolean

    /** Controls content width, 'md' by default */
    size?: MantineNumberSize

    /** Key of theme.shadows or any valid css box-shadow value, 'xl' by default */
    shadow?: MantineShadow
} & DefaultProps &
    React.ComponentPropsWithoutRef<'div'>

export type ModalBaseProps = {
    /** Base component name for styles and components default props */
    __staticSelector: string
} & ModalBaseSettings

export const ModalBaseDefaultProps: Partial<ModalBaseProps> = {
    closeOnClickOutside: true,
    withinPortal: true,
    lockScroll: true,
    trapFocus: true,
    returnFocus: true,
    closeOnEscape: true,
    keepMounted: false,
    zIndex: getDefaultZIndex('modal'),
    padding: 'md',
    size: 'md',
    shadow: 'xl',
}

export function ModalBase(props: ModalBaseProps) {
    const {
        opened,
        onClose,
        children,
        closeOnClickOutside,
        __staticSelector,
        transitionProps,
        withinPortal,
        portalProps,
        keepMounted,
        target,
        zIndex,
        lockScroll,
        trapFocus,
        closeOnEscape,
        returnFocus,
        padding,
        shadow,
        id,
        size,
        variant,
        classNames,
        unstyled,
        styles,
        className,
        ...others
    } = useComponentDefaultProps('ModalBase', ModalBaseDefaultProps, props)

    const { classes, cx } = useStyles(null, {
        name: __staticSelector,
        classNames,
        styles,
        unstyled,
        variant,
        size,
    })

    const _id = useId(id)
    const [titleMounted, setTitleMounted] = useState(false)
    const [bodyMounted, setBodyMounted] = useState(false)

    const transitionDuration = typeof transitionProps?.duration === 'number' ? transitionProps?.duration : 200

    const shouldLockScroll = useLockScroll({ opened, transitionDuration })

    useWindowEvent('keydown', (event) => {
        if (!trapFocus && event.key === 'Escape' && closeOnEscape) {
            onClose()
        }
    })

    useFocusReturn({ opened, shouldReturnFocus: trapFocus && returnFocus })

    return (
        <OptionalPortal
            {...portalProps}
            withinPortal={withinPortal}
            target={target}
        >
            <ModalBaseProvider
                value={{
                    __staticSelector,
                    opened,
                    onClose,
                    closeOnClickOutside,
                    transitionProps: { ...transitionProps, duration: transitionDuration, keepMounted },
                    zIndex,
                    padding,
                    id: _id,
                    getTitleId: () => `${_id}-title`,
                    getBodyId: () => `${_id}-body`,
                    titleMounted,
                    bodyMounted,
                    setTitleMounted,
                    setBodyMounted,
                    trapFocus,
                    closeOnEscape,
                    shadow,
                    stylesApi: {
                        name: __staticSelector,
                        size,
                        variant,
                        classNames,
                        styles,
                        unstyled,
                    },
                }}
            >
                <RemoveScroll enabled={shouldLockScroll && lockScroll}>
                    <Box
                        className={cx(classes.root, className)}
                        {...others}
                    >
                        {children}
                    </Box>
                </RemoveScroll>
            </ModalBaseProvider>
        </OptionalPortal>
    )
}

ModalBase.CloseButton = ModalBaseCloseButton
ModalBase.Overlay = ModalBaseOverlay
ModalBase.Content = ModalBaseContent
ModalBase.Header = ModalBaseHeader
ModalBase.Title = ModalBaseTitle
ModalBase.Body = ModalBaseBody
ModalBase.NativeScrollArea = NativeScrollArea
