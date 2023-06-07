import type { CSSInterpolation } from './css-object'

export type CSS = {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): string
    (...args: CSSInterpolation[]): string
}
