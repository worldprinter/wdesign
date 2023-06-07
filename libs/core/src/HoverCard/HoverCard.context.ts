import { createSafeContext } from '@worldprinter/wdesign-utils'

import { HOVER_CARD_ERRORS } from './HoverCard.errors'

type HoverCardContext = {
    openDropdown(): void
    closeDropdown(): void
}

export const [HoverCardContextProvider, useHoverCardContext] = createSafeContext<HoverCardContext>(
    HOVER_CARD_ERRORS.context,
)
