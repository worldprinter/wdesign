import React, { forwardRef } from 'react';
import { DefaultProps } from '@worldprint/wdesign-styles';
import { createPolymorphicComponent } from '@worldprint/wdesign-utils';
import { extractSystemStyles } from './style-system-props/extract-system-styles/extract-system-styles';
import { useSx } from './use-sx/use-sx';

export interface BoxProps extends DefaultProps {
  children?: React.ReactNode;
}

export const _Box = forwardRef<HTMLDivElement, BoxProps & { component: any }>(
  ({ className, component, style, sx, ...others }, ref) => {
    const { systemStyles, rest } = extractSystemStyles(others);
    const Element = component || 'div';
    return (
      <Element
        ref={ref}
        className={useSx(sx, systemStyles, className)}
        style={style}
        {...rest}
      />
    );
  }
);

_Box.displayName = '@worldprint/wdesign-core/Box';

export const Box = createPolymorphicComponent<'div', BoxProps>(_Box);
