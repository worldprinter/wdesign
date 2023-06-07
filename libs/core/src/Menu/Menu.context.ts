import { ClassNames, MantineNumberSize, Styles } from '@worldprinter/wdesign-styles'
import { createSafeContext } from '@worldprinter/wdesign-utils'

import type { MenuStylesNames } from './Menu'
import { MENU_ERRORS } from './Menu.errors'
import { MenuTriggerEvent } from './Menu.types'

interface MenuContext {
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
    radius: MantineNumberSize
    opened: boolean
    classNames: ClassNames<MenuStylesNames>
    styles: Styles<MenuStylesNames>
    unstyled: boolean
    variant?: string
}

export const [MenuContextProvider, useMenuContext] = createSafeContext<MenuContext>(MENU_ERRORS.context)
