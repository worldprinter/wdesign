import React, { cloneElement } from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-core'
import { upperFirst } from '@worldprinter/wdesign-hooks'
import { isElement } from '@worldprinter/wdesign-utils'

import type { DropzoneContextValue } from './Dropzone.context'
import { useDropzoneContext } from './Dropzone.context'

export type DropzoneStatusProps = {
    // eslint-disable-next-line react/no-unused-prop-types
    children: React.ReactNode
}

function createDropzoneStatus(status: keyof DropzoneContextValue) {
    const Component = (props: DropzoneStatusProps): JSX.Element => {
        const { children, ...others } = useComponentDefaultProps(`Dropzone${upperFirst(status)}`, {}, props)

        const ctx = useDropzoneContext()
        const _children = isElement(children) ? children : <span>{children}</span>

        if (ctx[status]) {
            return cloneElement(_children, others)
        }

        return null
    }

    Component.displayName = `@worldprinter/wdesign-dropzone/${upperFirst(status)}`

    return Component
}

export const DropzoneAccept = createDropzoneStatus('accept')
export const DropzoneReject = createDropzoneStatus('reject')
export const DropzoneIdle = createDropzoneStatus('idle')

export type DropzoneAcceptProps = DropzoneStatusProps
export type DropzoneRejectProps = DropzoneStatusProps
export type DropzoneIdleProps = DropzoneStatusProps
