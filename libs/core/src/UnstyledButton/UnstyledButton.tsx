import React, { forwardRef } from 'react';
import { DefaultProps, useComponentDefaultProps } from '@worldprint/wdesign-styles';
import { createPolymorphicComponent } from '@worldprint/wdesign-utils';
import { Box } from '../Box';
import useStyles from './UnstyledButton.styles';

export interface UnstyledButtonProps extends DefaultProps {
  variant?: string;
  children?: React.ReactNode;
}

export const _UnstyledButton = forwardRef<
  HTMLDivElement,
  UnstyledButtonProps & { component?: any }
>((props, ref) => {
  const {
    className,
    component = 'button',
    unstyled,
    variant,
    ...others
  } = useComponentDefaultProps('UnstyledButton', {}, props);

  const { classes, cx } = useStyles(null, {
    name: 'UnstyledButton',
    unstyled,
    variant,
  });

  return (
    <Box
      component={component}
      ref={ref}
      className={cx(classes.root, className)}
      type={component === 'button' ? 'button' : undefined}
      {...others}
    />
  );
});

_UnstyledButton.displayName = '@worldprint/wdesign-core/UnstyledButton';

export const UnstyledButton = createPolymorphicComponent<
  'button',
  UnstyledButtonProps
>(_UnstyledButton);
