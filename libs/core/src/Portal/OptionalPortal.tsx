import React from 'react'

import type { PortalProps } from './Portal'
import { Portal } from './Portal'

export type OptionalPortalProps = {
    /** Determines if children should be rendered in Portal */
    withinPortal?: boolean
} & PortalProps

export function OptionalPortal({ withinPortal = true, children, ...others }: OptionalPortalProps) {
    if (withinPortal) {
        return <Portal {...others}>{children}</Portal>
    }

    return <>{children}</>
}

OptionalPortal.displayName = '@worldprinter/wdesign-core/OptionalPortal'
