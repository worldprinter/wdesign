import type { NotificationProps as NotificationComponentProps } from '@worldprinter/wdesign-core'

export type NotificationProps = {
    id?: string
    message: React.ReactNode
    autoClose?: boolean | number
    onClose?(props: NotificationProps): void
    onOpen?(props: NotificationProps): void
} & Omit<NotificationComponentProps, 'onClose'>

export type NotificationsContextProps = {
    notifications: NotificationProps[]
    queue: NotificationProps[]
}

export type NotificationsPositioning = ['top' | 'bottom', 'left' | 'right' | 'center']
