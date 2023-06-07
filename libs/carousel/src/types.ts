import type { EmblaCarouselType } from 'embla-carousel-react'

import type { MantineNumberSize } from '@worldprinter/wdesign-core'

export type Embla = EmblaCarouselType
export type CarouselOrientation = 'vertical' | 'horizontal'
export type CarouselBreakpoint = {
    maxWidth?: MantineNumberSize
    minWidth?: MantineNumberSize
    slideSize: string | number
    slideGap?: MantineNumberSize
}
