import type { NumberInputStylesNames } from '@worldprint/wdesign-core';
import { Input } from './Input.styles-api';
import { InputWrapper } from './InputWrapper.styles-api';

export const NumberInput: Record<NumberInputStylesNames, string> = {
  ...Input,
  ...InputWrapper,
  rightSection: 'Right section with up and down controls',
  control: 'Shared up and down controls styles',
  controlUp: 'Up control styles',
  controlDown: 'Down control styles',
};
