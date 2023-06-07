/* eslint-disable react/no-unused-prop-types */
import type React from 'react'

export type StepCompletedProps = {
    /** Label content */
    children: React.ReactNode
}

export function StepCompleted(
    // Props should be kept for ts integration
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    props: StepCompletedProps,
) {
    return null
}

StepCompleted.displayName = '@worldprinter/wdesign-core/StepCompleted'
