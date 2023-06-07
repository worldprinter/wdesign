import React, { createContext, useContext } from 'react'

import type { ColorScheme } from './types'

type ColorSchemeContextProps = {
    colorScheme: ColorScheme
    toggleColorScheme(colorScheme?: ColorScheme): void
}

const ColorSchemeContext = createContext<ColorSchemeContextProps>(null)

export function useMantineColorScheme() {
    const ctx = useContext(ColorSchemeContext)

    if (!ctx) {
        throw new Error(
            'useMantineColorScheme hook was called outside of context, make sure your app is wrapped with ColorSchemeProvider component',
        )
    }

    return ctx
}

type ColorSchemeProviderProps = {
    children: React.ReactNode
} & ColorSchemeContextProps

export function ColorSchemeProvider({ colorScheme, toggleColorScheme, children }: ColorSchemeProviderProps) {
    return (
        <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>{children}</ColorSchemeContext.Provider>
    )
}

ColorSchemeProvider.displayName = '@worldprinter/wdesign-core/ColorSchemeProvider'
