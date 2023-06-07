import { largerThan, smallerThan } from './breakpoints/breakpoints'
import { cover } from './cover/cover'
import { darken } from './darken/darken'
import { dimmed } from './dimmed/dimmed'
import { focusStyles } from './focus-styles/focus-styles'
import { fontStyles } from './font-styles/font-styles'
import { gradient, linearGradient, radialGradient } from './gradient/gradient'
import { hover } from './hover/hover'
import { lighten } from './lighten/lighten'
import { placeholderStyles } from './placeholder-styles/placeholder-styles'
import { primaryColor } from './primary-color/primary-color'
import { primaryShade } from './primary-shade/primary-shade'
import { radius } from './radius/radius'
import { rgba } from './rgba/rgba'
import { themeColor } from './theme-color/theme-color'
import { variant } from './variant/variant'

export const fns = {
    fontStyles,
    themeColor,
    focusStyles,
    linearGradient,
    radialGradient,
    smallerThan,
    largerThan,
    rgba,
    cover,
    darken,
    lighten,
    radius,
    variant,
    primaryShade,
    hover,
    gradient,
    primaryColor,
    placeholderStyles,
    dimmed,
}
