import { ClassNames, MantineColor, MantineNumberSize, Styles } from '@worldprint/wdesign-styles';
import { createSafeContext } from '@worldprint/wdesign-utils';
import type { PaginationStylesNames } from './PaginationRoot/PaginationRoot';

interface PaginationContext {
  total: number;
  range: (number | 'dots')[];
  active: number;
  disabled: boolean;
  color: MantineColor;
  radius: MantineNumberSize;
  getItemProps?(page: number): Record<string, any>;
  onChange(page: number): void;
  onNext(): void;
  onPrevious(): void;
  onFirst(): void;
  onLast(): void;
  stylesApi: {
    name: string;
    classNames?: ClassNames<PaginationStylesNames>;
    styles?: Styles<PaginationStylesNames>;
    unstyled?: boolean;
    variant?: string;
    size?: MantineNumberSize;
  };
}

export const [PaginationProvider, usePaginationContext] = createSafeContext<PaginationContext>(
  'Pagination.Root component was not found in tree'
);
