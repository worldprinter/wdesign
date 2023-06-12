import type { EmotionCache } from '@emotion/cache'
import { Global, ThemeProvider } from '@emotion/react'
import React, { createContext, useContext } from 'react'

import { DEFAULT_THEME } from './default-theme'
import { GlobalStyles } from './GlobalStyles'
import { NormalizeCSS } from './NormalizeCSS'
import type { WDesignTheme, WDesignThemeOverride } from './types'
import { filterProps } from './utils/filter-props/filter-props'
import { mergeThemeWithFunctions } from './utils/merge-theme/merge-theme'
import { WDesignCssVariables } from './WDesignCssVariables'

type WDesignProviderContextType = {
    theme: WDesignTheme
    emotionCache?: EmotionCache
}

const WDesignProviderContext = createContext<WDesignProviderContextType>({
    theme: DEFAULT_THEME,
})

export function useWDesignTheme() {
    return useContext(WDesignProviderContext)?.theme || DEFAULT_THEME
}

export function useWDesignProviderStyles(component: string | string[]) {
    const theme = useWDesignTheme()

    const getStyles = (name: string) => ({
        styles: theme.components[name]?.styles || {},
        classNames: theme.components[name]?.classNames || {},
        variants: theme.components[name]?.variants,
        sizes: theme.components[name]?.sizes,
    })

    if (Array.isArray(component)) {
        return component.map(getStyles)
    }

    return [getStyles(component)]
}

export function useWDesignEmotionCache() {
    return useContext(WDesignProviderContext)?.emotionCache
}

export function useComponentDefaultProps<T extends Record<string, any>, U extends Partial<T> = {}>(
    component: string,
    defaultProps: U,
    props: T,
): T & {
    [Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]>
} {
    const theme = useWDesignTheme()
    const contextPropsPayload = theme.components[component]?.defaultProps
    const contextProps = typeof contextPropsPayload === 'function' ? contextPropsPayload(theme) : contextPropsPayload

    return { ...defaultProps, ...contextProps, ...filterProps(props) }
}

export type WDesignProviderProps = {
    theme?: WDesignThemeOverride
    emotionCache?: EmotionCache
    withNormalizeCSS?: boolean
    withGlobalStyles?: boolean
    withCSSVariables?: boolean
    children: React.ReactNode
    inherit?: boolean
}

export function WDesignProvider({
    theme,
    emotionCache,
    withNormalizeCSS = false,
    withGlobalStyles = false,
    withCSSVariables = false,
    inherit = false,
    children,
}: WDesignProviderProps) {
    const ctx = useContext(WDesignProviderContext)
    const mergedTheme = mergeThemeWithFunctions(DEFAULT_THEME, inherit ? { ...ctx.theme, ...theme } : theme)

    return (
        <ThemeProvider theme={mergedTheme}>
            <WDesignProviderContext.Provider value={{ theme: mergedTheme, emotionCache }}>
                {withNormalizeCSS && <NormalizeCSS />}
                {withGlobalStyles && <GlobalStyles theme={mergedTheme} />}
                {withCSSVariables && <WDesignCssVariables theme={mergedTheme} />}
                {typeof mergedTheme.globalStyles === 'function' && (
                    <Global styles={mergedTheme.globalStyles(mergedTheme) as any} />
                )}
                {children}
            </WDesignProviderContext.Provider>
        </ThemeProvider>
    )
}

WDesignProvider.displayName = '@worldprinter/wdesign-core/WDesignProvider'
