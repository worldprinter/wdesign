import { createStyles } from '@worldprinter/wdesign-styles'

export type CenterStylesParams = {
    inline: boolean
}

export default createStyles((theme, { inline }: CenterStylesParams) => ({
    root: {
        display: inline ? 'inline-flex' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}))
