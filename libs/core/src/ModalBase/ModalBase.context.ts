import type { ClassNames, Styles, WDesignNumberSize, WDesignShadow } from '@worldprinter/wdesign-styles'
import { createSafeContext } from '@worldprinter/wdesign-utils'

import type { TransitionOverride } from '../Transition'
import type { ModalBaseStylesNames } from './ModalBase'

type ModalBaseContext = {
    __staticSelector: string
    opened: boolean
    onClose(): void
    closeOnClickOutside: boolean
    transitionProps: TransitionOverride
    zIndex: number
    padding: WDesignNumberSize
    id: string
    getTitleId(): string
    getBodyId(): string
    titleMounted: boolean
    bodyMounted: boolean
    setTitleMounted(mounted: boolean): void
    setBodyMounted(mounted: boolean): void
    trapFocus: boolean
    closeOnEscape: boolean
    shadow: WDesignShadow
    stylesApi: {
        name: string
        size: WDesignNumberSize
        variant: string
        classNames: ClassNames<ModalBaseStylesNames>
        styles: Styles<ModalBaseStylesNames>
        unstyled: boolean
    }
}

export const [ModalBaseProvider, useModalBaseContext] = createSafeContext<ModalBaseContext>(
    'ModalBase component was not found in tree',
)
