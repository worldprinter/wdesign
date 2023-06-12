import type { WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { createStyles, rem } from '@worldprinter/wdesign-styles'

export type OverlayStylesParams = {
    color: string
    opacity: number
    blur: number | string
    radius: WDesignNumberSize
    gradient: string
    fixed: boolean
    zIndex: any
}

export default createStyles(
    (theme, { color, opacity, blur, radius, gradient, fixed, zIndex }: OverlayStylesParams) => ({
        root: {
            ...theme.fn.cover(0),
            position: fixed ? 'fixed' : 'absolute',
            backgroundColor: gradient ? undefined : theme.fn.rgba(color, opacity),
            backgroundImage: gradient,
            backdropFilter: blur ? `blur(${rem(blur)})` : undefined,
            borderRadius: theme.fn.radius(radius),
            zIndex,

            '&[data-center]': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
        },
    }),
)
