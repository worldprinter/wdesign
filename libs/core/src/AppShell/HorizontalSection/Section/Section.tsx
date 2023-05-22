import React, { forwardRef } from 'react';
import { DefaultProps } from '@worldprint/wdesign-styles';
import { createPolymorphicComponent, packSx } from '@worldprint/wdesign-utils';
import { Box } from '../../../Box';

export interface SectionProps extends DefaultProps {
  /** Section children */
  children: React.ReactNode;

  /** Force section to take all available height */
  grow?: boolean;
}

export const _Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, grow = false, sx, ...others }, ref) => (
    <Box
      ref={ref}
      sx={[{ flex: grow ? 1 : 0, boxSizing: 'border-box' }, ...packSx(sx)]}
      {...others}
    >
      {children}
    </Box>
  )
);

_Section.displayName = '@worldprint/wdesign-core/Section';

export const Section = createPolymorphicComponent<'div', SectionProps>(
  _Section
);
