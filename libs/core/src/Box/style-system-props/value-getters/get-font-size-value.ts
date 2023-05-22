import { MantineTheme, getSize } from '@worldprint/wdesign-styles';

export function getFontSizeValue(size: any, theme: MantineTheme) {
  return getSize({ size, sizes: theme.fontSizes });
}
