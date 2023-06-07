import type { MantineNumberSize, MantineSize, MantineTheme } from '@worldprinter/wdesign-styles'
import { createStyles, getSize, MANTINE_SIZES } from '@worldprinter/wdesign-styles'

export type GridStylesParams = {
    gutter: MantineNumberSize
    gutterXs: MantineNumberSize
    gutterSm: MantineNumberSize
    gutterMd: MantineNumberSize
    gutterLg: MantineNumberSize
    gutterXl: MantineNumberSize
    justify?: React.CSSProperties['justifyContent']
    align?: React.CSSProperties['alignContent']
}

function getGutterStyles(gutters: Record<MantineSize, MantineNumberSize>, theme: MantineTheme) {
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
