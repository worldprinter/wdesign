import type { MantineNumberSize } from '@worldprinter/wdesign-styles'
import { createSafeContext } from '@worldprinter/wdesign-utils'

export type ScrollAreaComponent = React.FC<any>

type ModalContext = {
    yOffset: string | number
    radius: MantineNumberSize
    scrollAreaComponent: ScrollAreaComponent
}

export const [ModalProvider, useModalContext] = createSafeContext<ModalContext>('Modal component was not found in tree')
