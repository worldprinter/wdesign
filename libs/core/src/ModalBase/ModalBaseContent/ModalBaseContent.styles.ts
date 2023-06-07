import { createStyles } from '@worldprinter/wdesign-styles'

type ModalBaseContentStylesParams = {
    zIndex: number
}

export default createStyles((_theme, { zIndex }: ModalBaseContentStylesParams) => ({
    inner: {
        position: 'fixed',
        width: '100%',
        top: 0,
        bottom: 0,
        maxHeight: '100%',
        zIndex,
        pointerEvents: 'none',
    },

    content: {
        pointerEvents: 'all',
    },
}))
