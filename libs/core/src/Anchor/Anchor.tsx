import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@worldprint/wdesign-styles';
import { createPolymorphicComponent } from '@worldprint/wdesign-utils';
import { Text, TextProps } from '../Text/Text';
import useStyles from './Anchor.styles';

export interface AnchorProps extends Omit<TextProps, 'variant'> {
  variant?: string;
  children?: React.ReactNode;
}

const defaultProps: Partial<AnchorProps> = {
  underline: true,
};

export const _Anchor = forwardRef<
  HTMLAnchorElement,
  AnchorProps & { component: any }
>((props, ref) => {
  const {
    component,
    className,
    unstyled,
    variant,
    size,
    color,
    underline,
    ...others
  } = useComponentDefaultProps(
    'Anchor',
    defaultProps as AnchorProps & { component: any },
    props
  );

  const { classes, cx } = useStyles(
    { color, underline },
    { name: 'Anchor', unstyled, variant, size }
  );
  const buttonProps = component === 'button' ? { type: 'button' } : null;

  return (
    <Text
      component={component || 'a'}
      ref={ref}
      className={cx(classes.root, className)}
      size={size}
      {...buttonProps}
      {...others}
    />
  );
});

_Anchor.displayName = '@worldprint/wdesign-core/Anchor';

export const Anchor = createPolymorphicComponent<'a', AnchorProps>(_Anchor);
