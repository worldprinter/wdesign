import React, { forwardRef } from 'react';
import {
  DefaultProps,
  MantineNumberSize,
  useComponentDefaultProps,
} from '@worldprint/wdesign-styles';
import { createPolymorphicComponent } from '@worldprint/wdesign-utils';
import { Box } from '../Box';
import useStyles, {
  BackgroundImageStylesParams,
} from './BackgroundImage.styles';

export interface BackgroundImageProps
  extends DefaultProps<never, BackgroundImageStylesParams>,
    React.ComponentPropsWithoutRef<'div'> {
  variant?: string;

  /** Image url */
  src: string;

  /** Key of theme.radius or any valid CSS value to set border-radius, 0 by default */
  radius?: MantineNumberSize;
}

const defaultProps: Partial<BackgroundImageProps> = {
  radius: 0,
};

export const _BackgroundImage = forwardRef<
  HTMLDivElement,
  BackgroundImageProps
>((props, ref) => {
  const { src, radius, variant, unstyled, className, ...others } =
    useComponentDefaultProps('BackgroundImage', defaultProps, props);

  const { classes, cx } = useStyles(
    { radius, src },
    { name: 'BackgroundImage', variant, unstyled }
  );

  return <Box {...others} ref={ref} className={cx(classes.root, className)} />;
});

_BackgroundImage.displayName = '@worldprint/wdesign-core/BackgroundImage';

export const BackgroundImage = createPolymorphicComponent<
  'div',
  BackgroundImageProps
>(_BackgroundImage);
