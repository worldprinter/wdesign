import type { EmblaCarouselType } from 'embla-carousel-react'

import type { WDesignNumberSize } from '@worldprinter/wdesign-core'

export type Embla = EmblaCarouselType
export type CarouselOrientation = 'vertical' | 'horizontal'
export type CarouselBreakpoint = {
    maxWidth?: WDesignNumberSize
    minWidth?: WDesignNumberSize
    slideSize: string | number
    slideGap?: WDesignNumberSize
}
