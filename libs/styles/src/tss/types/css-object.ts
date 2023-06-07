import type * as CSS from 'csstype'

export type CSSObject = {} & CSSPropertiesWithMultiValues & CSSPseudos & CSSOthersObject & CSSTssSpecials

export type CSSTssSpecials = {
    ref?: string
}

export type CSSProperties = CSS.PropertiesFallback<number | string>
export type CSSPropertiesWithMultiValues = {
    [K in keyof CSSProperties]: CSSProperties[K] | Array<Extract<CSSProperties[K], string>>
}

export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject }

export type ArrayCSSInterpolation = {} & Array<CSSInterpolation>

export type ComponentSelector = {
    __emotion_styles: any
}

export type Keyframes = {
    name: string
    styles: string
    anim: number
    toString: () => string
} & string

export type SerializedStyles = {
    name: string
    styles: string
    map?: string
    next?: SerializedStyles
}

export type InterpolationPrimitive =
    | null
    | undefined
    | boolean
    | number
    | string
    | ComponentSelector
    | Keyframes
    | SerializedStyles
    | CSSObject

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation

export type CSSOthersObject = {
    [propertiesName: string]: CSSInterpolation
}
