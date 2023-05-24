import { createSafeContext } from '@worldprinter/wdesign-utils';
import {
  MantineNumberSize,
  ClassNames,
  Styles,
} from '@worldprinter/wdesign-styles';
import type { ListStylesNames } from './List';

interface ListContextValue {
  spacing?: MantineNumberSize;
  center?: boolean;
  icon?: React.ReactNode;
  listStyleType?: string;
  withPadding?: boolean;
  size?: MantineNumberSize;
  classNames?: ClassNames<ListStylesNames>;
  styles?: Styles<ListStylesNames>;
  unstyled?: boolean;
  variant?: string;
}

export const [ListProvider, useListContext] =
  createSafeContext<ListContextValue>('List component was not found in tree');
