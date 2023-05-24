import { MantineTheme, getSize } from '@worldprinter/wdesign-styles';

export function getFontSizeValue(size: any, theme: MantineTheme) {
  return getSize({ size, sizes: theme.fontSizes });
}
