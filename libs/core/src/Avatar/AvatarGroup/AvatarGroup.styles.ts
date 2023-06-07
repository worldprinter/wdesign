import type { MantineNumberSize } from '@worldprinter/wdesign-styles'
import { createStyles, getSize } from '@worldprinter/wdesign-styles'

type AvatarGroupStylesParams = {
    spacing: MantineNumberSize
}

export default createStyles((theme, { spacing }: AvatarGroupStylesParams) => ({
    root: {
        display: 'flex',
        paddingLeft: getSize({ size: spacing, sizes: theme.spacing }),
    },
}))
