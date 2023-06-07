import React from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { ModalBase, ModalBaseCloseButtonProps, ModalBaseDefaultProps, ModalBaseOverlayProps } from '../ModalBase'
import { ModalContent } from './ModalContent/ModalContent'
import { ModalRoot, ModalRootProps } from './ModalRoot/ModalRoot'

export interface ModalProps extends Omit<ModalRootProps, 'title'> {
    /** Modal title */
    title?: React.ReactNode

    /** Determines whether overlay should be rendered, true by default */
    withOverlay?: boolean

    /** Props added to Overlay component, use configure opacity, background color, styles and other properties */
    overlayProps?: ModalBaseOverlayProps

    /** Modal content */
    children?: React.ReactNode

    /** Determines whether close button should be rendered, true by default */
    withCloseButton?: boolean

    /** Props added to close button */
    closeButtonProps?: ModalBaseCloseButtonProps
}

const defaultProps: Partial<ModalProps> = {
    ...ModalBaseDefaultProps,
    transitionProps: { duration: 200, transition: 'pop' },
    withOverlay: true,
    withCloseButton: true,
}

export function Modal(props: ModalProps) {
    const { title, withOverlay, overlayProps, withCloseButton, closeButtonProps, children, ...others } =
        useComponentDefaultProps('Modal', defaultProps, props)

    const hasHeader = !!title || withCloseButton

    return (
        <ModalRoot {...others}>
            {withOverlay && <ModalBase.Overlay {...overlayProps} />}
            <ModalContent>
                {hasHeader && (
                    <ModalBase.Header>
                        {title && <ModalBase.Title>{title}</ModalBase.Title>}
                        {withCloseButton && <ModalBase.CloseButton {...closeButtonProps} />}
                    </ModalBase.Header>
                )}

                <ModalBase.Body>{children}</ModalBase.Body>
            </ModalContent>
        </ModalRoot>
    )
}

Modal.Root = ModalRoot
Modal.CloseButton = ModalBase.CloseButton
Modal.Overlay = ModalBase.Overlay
Modal.Content = ModalContent
Modal.Header = ModalBase.Header
Modal.Title = ModalBase.Title
Modal.Body = ModalBase.Body
Modal.NativeScrollArea = ModalBase.NativeScrollArea
