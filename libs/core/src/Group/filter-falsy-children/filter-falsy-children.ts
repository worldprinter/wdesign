import type { ReactElement, ReactNode } from 'react'
import { Children } from 'react'

export function filterFalsyChildren(children: ReactNode) {
    return (Children.toArray(children) as ReactElement[]).filter(Boolean)
}
