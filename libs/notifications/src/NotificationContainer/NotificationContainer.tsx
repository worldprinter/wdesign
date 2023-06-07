import React, { useEffect, useRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-core'
import { Notification } from '@worldprinter/wdesign-core'

import type { NotificationProps } from '../types'
import getAutoClose from './get-auto-close/get-auto-close'

export type NotificationContainerProps = {
    notification: NotificationProps
    onHide(id: string): void
    autoClose: false | number
    innerRef: React.ForwardedRef<HTMLDivElement>
} & DefaultProps

export default function NotificationContainer({
    notification,
    autoClose,
    onHide,
    innerRef,
    ...others
}: NotificationContainerProps) {
    const { autoClose: notificationAutoClose, message, ...notificationProps } = notification
    const autoCloseTimeout = getAutoClose(autoClose, notificationAutoClose)
    const hideTimeout = useRef<number>()

    const handleHide = () => {
        onHide(notification.id)
        window.clearTimeout(hideTimeout.current)
    }

    const cancelDelayedHide = () => {
        clearTimeout(hideTimeout.current)
    }

    const handleDelayedHide = () => {
        if (typeof autoCloseTimeout === 'number') {
            hideTimeout.current = window.setTimeout(handleHide, autoCloseTimeout)
        }
    }

    useEffect(() => {
        if (typeof notification.onOpen === 'function') {
            notification.onOpen(notification)
        }
    }, [])

    useEffect(() => {
        handleDelayedHide()
        return cancelDelayedHide
    }, [autoClose, notification.autoClose])

    return (
        <Notification
            {...notificationProps}
            {...others}
            onClose={handleHide}
            onMouseEnter={cancelDelayedHide}
            onMouseLeave={handleDelayedHide}
            ref={innerRef}
        >
            {message}
        </Notification>
    )
}

NotificationContainer.displayName = '@worldprinter/wdesign-notifications/NotificationContainer'
