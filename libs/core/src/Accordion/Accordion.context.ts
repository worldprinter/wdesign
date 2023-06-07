import type { ClassNames, MantineNumberSize, Styles } from '@worldprinter/wdesign-styles'
import { createSafeContext } from '@worldprinter/wdesign-utils'

import type { AccordionStylesNames } from './Accordion'
import { ACCORDION_ERRORS } from './Accordion.errors'
import type { AccordionChevronPosition, AccordionHeadingOrder, AccordionVariant } from './Accordion.types'

type AccordionContext = {
    loop: boolean
    transitionDuration: number
    disableChevronRotation: boolean
    chevronPosition: AccordionChevronPosition
    chevronSize: number | string
    order: AccordionHeadingOrder
    chevron: React.ReactNode
    variant: AccordionVariant
    radius: MantineNumberSize
    onChange(value: string): void
    isItemActive(value: string): boolean
    getControlId(value: string): string
    getRegionId(value: string): string
    classNames: ClassNames<AccordionStylesNames>
    styles: Styles<AccordionStylesNames>
    unstyled: boolean
}

export const [AccordionContextProvider, useAccordionContext] = createSafeContext<AccordionContext>(
    ACCORDION_ERRORS.context,
)
