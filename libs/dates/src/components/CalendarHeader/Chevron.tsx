import React from 'react';
import { ChevronIcon, useMantineTheme } from '@worldprint/wdesign-core';

interface ChevronProps extends React.ComponentPropsWithoutRef<'svg'> {
  direction: 'next' | 'previous';
}

export function Chevron({ direction, style, ...others }: ChevronProps) {
  const theme = useMantineTheme();
  return (
    <ChevronIcon
      {...others}
      style={{
        ...style,
        transform:
          (direction === 'next' && theme.dir === 'ltr') ||
          (direction === 'previous' && theme.dir === 'rtl')
            ? 'rotate(270deg)'
            : 'rotate(90deg)',
      }}
    />
  );
}

Chevron.displayName = '@worldprint/wdesign-dates/Chevron';
