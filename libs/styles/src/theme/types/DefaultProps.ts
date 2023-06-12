import type { CSSProperties } from 'react'

import type { CSSObject } from '../../tss'
import type { WDesignStyleSystemProps } from './WDesignStyleSystem'
import type { ContextStylesParams, WDesignTheme } from './WDesignTheme'

export type Sx = CSSObject | ((theme: WDesignTheme) => CSSObject)

export type ClassNames<StylesNames extends string> = Partial<Record<StylesNames, string>>
export type Styles<StylesNames extends string, StylesParams extends Record<string, any> = never> =
    | Partial<Record<StylesNames, CSSObject>>
    | ((
          theme: WDesignTheme,
          params: StylesParams,
          context: ContextStylesParams,
      ) => Partial<Record<StylesNames, CSSObject>>)

export type DefaultProps<
    StylesNames extends string = never,
    StylesParams extends Record<string, any> = Record<string, any>,
> = {
    className?: string
    style?: CSSProperties
    sx?: Sx | (Sx | undefined)[]
    classNames?: ClassNames<StylesNames>
    styles?: Styles<StylesNames, StylesParams>
    unstyled?: boolean
} & WDesignStyleSystemProps
