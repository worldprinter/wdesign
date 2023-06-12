import type { WDesignNumberSize, WDesignSize, WDesignTheme } from '@worldprinter/wdesign-styles'
import { createStyles, getSize, MANTINE_SIZES } from '@worldprinter/wdesign-styles'

export type GridStylesParams = {
    gutter: WDesignNumberSize
    gutterXs: WDesignNumberSize
    gutterSm: WDesignNumberSize
    gutterMd: WDesignNumberSize
    gutterLg: WDesignNumberSize
    gutterXl: WDesignNumberSize
    justify?: React.CSSProperties['justifyContent']
    align?: React.CSSProperties['alignContent']
}

function getGutterStyles(gutters: Record<WDesignSize, WDesignNumberSize>, theme: WDesignTheme) {
    return MANTINE_SIZES.reduce((acc, size) => {
        if (typeof gutters[size] !== 'undefined') {
            acc[`@media (min-width: ${theme.breakpoints[size]})`] = {
                margin: `calc(-${getSize({ size: gutters[size], sizes: theme.spacing })} / 2)`,
            }
        }

        return acc
    }, {})
}

export default createStyles(
    (theme, { justify, align, gutter, gutterXs, gutterSm, gutterMd, gutterLg, gutterXl }: GridStylesParams) => ({
        root: {
            margin: `calc(-${getSize({ size: gutter, sizes: theme.spacing })} / 2)`,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: justify,
            alignItems: align,
            ...getGutterStyles({ xs: gutterXs, sm: gutterSm, md: gutterMd, lg: gutterLg, xl: gutterXl }, theme),
        },
    }),
)
