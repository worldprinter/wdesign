import React, { forwardRef } from 'react';
import { DefaultProps, useComponentDefaultProps } from '@worldprinter/wdesign-styles';
import { Box } from '../Box';

export type SpaceProps = DefaultProps

const defaultProps: Partial<SpaceProps> = {
  w: 0,
  h: 0,
};

export const Space = forwardRef<HTMLDivElement, SpaceProps>((props: SpaceProps, ref) => {
  const { w, h, ...others } = useComponentDefaultProps('Space', defaultProps, props);
  return <Box ref={ref} w={w} miw={w} h={h} mih={h} {...others} />;
});

Space.displayName = '@worldprinter/wdesign-core/Space';
