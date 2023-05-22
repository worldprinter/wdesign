import { MantineNumberSize, Styles, ClassNames } from '@worldprint/wdesign-core';
import { createSafeContext } from '@worldprint/wdesign-utils';
import { CAROUSEL_ERRORS } from './Carousel.errors';
import { CarouselOrientation, Embla, CarouselBreakpoint } from './types';
import type { CarouselStylesNames } from './Carousel';

interface CarouselContext {
  embla: Embla;
  slideSize: string | number;
  slideGap: MantineNumberSize;
  orientation: CarouselOrientation;
  includeGapInSize: boolean;
  breakpoints: CarouselBreakpoint[];
  classNames: ClassNames<CarouselStylesNames>;
  styles: Styles<CarouselStylesNames>;
  unstyled: boolean;
  variant: string;
}

export const [CarouselProvider, useCarouselContext] = createSafeContext<CarouselContext>(
  CAROUSEL_ERRORS.context
);
