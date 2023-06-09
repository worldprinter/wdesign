import React, { createContext, useContext } from 'react'

import type { WDesignNumberSize } from '@worldprinter/wdesign-styles'

type ContextValue = {
    spacing: WDesignNumberSize
}

const AvatarGroupContext = createContext<ContextValue>(null)

type AvatarGroupProviderProps = {
    children: React.ReactNode
} & ContextValue

export function AvatarGroupProvider({ spacing, children }: AvatarGroupProviderProps) {
    return <AvatarGroupContext.Provider value={{ spacing }}>{children}</AvatarGroupContext.Provider>
}

export function useAvatarGroupContext() {
    const ctx = useContext(AvatarGroupContext)

    if (ctx) {
        return { ...ctx, withinGroup: true }
    }

    return { spacing: null, withinGroup: false }
}
