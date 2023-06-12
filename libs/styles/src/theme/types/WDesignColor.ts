import type { Tuple } from './Tuple'

export type DefaultWDesignColor =
    | 'dark'
    | 'gray'
    | 'red'
    | 'pink'
    | 'grape'
    | 'violet'
    | 'indigo'
    | 'blue'
    | 'cyan'
    | 'green'
    | 'lime'
    | 'yellow'
    | 'orange'
    | 'teal'
    | (string & {})

export type WDesignThemeColorsOverride = {}

export type WDesignThemeColors = WDesignThemeColorsOverride extends {
    colors: Record<infer CustomColors, Tuple<string, 10>>
}
    ? Record<CustomColors, Tuple<string, 10>>
    : Record<DefaultWDesignColor, Tuple<string, 10>>

export type WDesignColor = keyof WDesignThemeColors
