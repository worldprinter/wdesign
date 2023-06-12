import type { WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { createSafeContext } from '@worldprinter/wdesign-utils'

export type ScrollAreaComponent = React.FC<any>

type ModalContext = {
    yOffset: string | number
    radius: WDesignNumberSize
    scrollAreaComponent: ScrollAreaComponent
}

export const [ModalProvider, useModalContext] = createSafeContext<ModalContext>('Modal component was not found in tree')
