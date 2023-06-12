import type { ClassNames, Styles, WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { createSafeContext } from '@worldprinter/wdesign-utils'

import type { MenuStylesNames } from './Menu'
import { MENU_ERRORS } from './Menu.errors'
import type { MenuTriggerEvent } from './Menu.types'

type MenuContext = {
    toggleDropdown(): void
    closeDropdownImmediately(): void
    closeDropdown(): void
    openDropdown(): void
    getItemIndex(node: HTMLButtonElement): number
    setHovered(index: number): void
    hovered: number
    closeOnItemClick: boolean
    loop: boolean
    trigger: MenuTriggerEvent
    radius: WDesignNumberSize
    opened: boolean
    classNames: ClassNames<MenuStylesNames>
    styles: Styles<MenuStylesNames>
    unstyled: boolean
    variant?: string
}

export const [MenuContextProvider, useMenuContext] = createSafeContext<MenuContext>(MENU_ERRORS.context)
