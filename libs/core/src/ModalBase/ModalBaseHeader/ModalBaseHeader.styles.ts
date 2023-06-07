import type { MantineNumberSize } from '@worldprinter/wdesign-styles'
import { createStyles, getSize, rem } from '@worldprinter/wdesign-styles'

type ModalBaseHeaderStylesParams = {
    padding: MantineNumberSize
}

export default createStyles((theme, { padding }: ModalBaseHeaderStylesParams) => {
    const paddingValue = getSize({ size: padding, sizes: theme.spacing })
    return {
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: paddingValue,
            paddingRight: `calc(${paddingValue} - ${rem(5)})`,
            position: 'sticky',
            top: 0,
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            zIndex: 1000,
        },
    }
})
