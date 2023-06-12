import type { WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { createStyles } from '@worldprinter/wdesign-styles'

export type BackgroundImageStylesParams = {
    radius: WDesignNumberSize
    src: string
}

export default createStyles((theme, { radius, src }: BackgroundImageStylesParams) => ({
    root: {
        ...theme.fn.focusStyles(),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'block',
        width: '100%',
        border: 0,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        backgroundImage: `url(${src})`,
        borderRadius: theme.fn.radius(radius),
    },
}))
