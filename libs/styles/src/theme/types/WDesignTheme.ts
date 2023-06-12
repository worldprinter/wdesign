import type { CSSProperties } from 'react'

import type { CSSObject } from '../../tss'
import type { VariantInput, VariantOutput } from '../functions/fns/variant/variant'
import type { ColorScheme } from './ColorScheme'
import type { DeepPartial } from './DeepPartial'
import type { WDesignThemeColors } from './WDesignColor'
import type { WDesignGradient } from './WDesignGradient'
import type { WDesignNumberSize, WDesignSize, WDesignSizes } from './WDesignSize'

export type LoaderType = 'bars' | 'oval' | 'dots'
export type WDesignThemeOther = Record<string, any>
export type WDesignThemeComponents = Record<string, ThemeComponent>

export type HeadingStyle = {
    fontSize: string
    fontWeight: CSSProperties['fontWeight']
    lineHeight: CSSProperties['lineHeight']
}

type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type WDesignPrimaryShade = {
    light: Shade
    dark: Shade
}

type WDesignFocusRingStyles = {
    styles(theme: WDesignThemeBase): CSSObject
    resetStyles(theme: WDesignThemeBase): CSSObject
    inputStyles(theme: WDesignThemeBase): CSSObject
}

type WDesignThemeFunctions = {
    fontStyles(): any
    focusStyles(selector?: string): any
    cover(offset?: number | string): any
    themeColor(color: string, shade?: number, primaryFallback?: boolean, useSplittedShade?: boolean): string
    rgba(color: string, alpha: number): string
    linearGradient(deg: number, ...colors: string[]): string
    radialGradient(...colors: string[]): string
    gradient(gradient?: WDesignGradient): string
    smallerThan(breakpoint: WDesignNumberSize): string
    largerThan(breakpoint: WDesignNumberSize): string
    lighten(color: string, alpha: number): string
    darken(color: string, alpha: number): string
    radius(size?: WDesignNumberSize | (string & {})): string | number
    variant(payload: VariantInput): VariantOutput
    primaryShade(colorScheme?: ColorScheme): Shade
    hover(hoverStyle: CSSObject): any
    primaryColor(colorScheme?: ColorScheme): string
    placeholderStyles(): any
    dimmed(): string
}

export type WDesignTheme = {
    dir: 'ltr' | 'rtl'
    primaryShade: Shade | WDesignPrimaryShade
    focusRing: 'auto' | 'always' | 'never'
    defaultRadius: WDesignNumberSize | (string & {})
    loader: LoaderType
    colorScheme: ColorScheme
    white: string
    black: string
    colors: WDesignThemeColors
    fontFamily: CSSProperties['fontFamily']
    lineHeight: CSSProperties['lineHeight']
    transitionTimingFunction: CSSProperties['transitionTimingFunction']
    fontFamilyMonospace: CSSProperties['fontFamily']
    primaryColor: keyof WDesignThemeColors
    respectReducedMotion: boolean
    cursorType: 'default' | 'pointer'
    defaultGradient: WDesignGradient

    fontSizes: WDesignSizes
    radius: WDesignSizes
    spacing: WDesignSizes
    breakpoints: WDesignSizes
    shadows: Record<WDesignSize, string>

    headings: {
        fontFamily: CSSProperties['fontFamily']
        fontWeight: CSSProperties['fontWeight']
        sizes: {
            h1: HeadingStyle
            h2: HeadingStyle
            h3: HeadingStyle
            h4: HeadingStyle
            h5: HeadingStyle
            h6: HeadingStyle
        }
    }

    fn: WDesignThemeFunctions
    other: WDesignThemeOther
    activeStyles: CSSObject
    datesLocale: string
    components: WDesignThemeComponents
    globalStyles: (theme: WDesignTheme) => CSSObject
    focusRingStyles: WDesignFocusRingStyles
}

export type ContextStylesParams = {
    variant?: string
    size?: string | number
}

type ThemeComponent = {
    defaultProps?: Record<string, any> | ((theme: WDesignTheme) => Record<string, any>)
    classNames?: Record<string, string>
    styles?:
        | Record<string, CSSObject>
        | ((theme: WDesignTheme, params: any, context: ContextStylesParams) => Record<string, CSSObject>)
    variants?: Record<
        PropertyKey,
        (theme: WDesignTheme, params: any, context: ContextStylesParams) => Record<string, CSSObject>
    >
    sizes?: Record<
        PropertyKey,
        (theme: WDesignTheme, params: any, context: ContextStylesParams) => Record<string, CSSObject>
    >
}

export type WDesignThemeBase = Omit<WDesignTheme, 'fn'>

export type WDesignThemeOverride = DeepPartial<Omit<WDesignThemeBase, 'other' | 'components'>> &
    Partial<Pick<WDesignThemeBase, 'other' | 'components'>>
