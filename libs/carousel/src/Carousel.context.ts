import type { ClassNames, Styles, WDesignNumberSize } from '@worldprinter/wdesign-core'
import { createSafeContext } from '@worldprinter/wdesign-utils'

import type { CarouselStylesNames } from './Carousel'
import { CAROUSEL_ERRORS } from './Carousel.errors'
import type { CarouselBreakpoint, CarouselOrientation, Embla } from './types'

type CarouselContext = {
    embla: Embla
    slideSize: string | number
    slideGap: WDesignNumberSize
    orientation: CarouselOrientation
    includeGapInSize: boolean
    breakpoints: CarouselBreakpoint[]
    classNames: ClassNames<CarouselStylesNames>
    styles: Styles<CarouselStylesNames>
    unstyled: boolean
    variant: string
}

export const [CarouselProvider, useCarouselContext] = createSafeContext<CarouselContext>(CAROUSEL_ERRORS.context)
