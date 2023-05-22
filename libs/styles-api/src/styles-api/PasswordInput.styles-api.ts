import type { PasswordInputStylesNames } from '@worldprint/wdesign-core';
import { TextInput } from './TextInput.styles-api';

export const PasswordInput: Record<PasswordInputStylesNames, string> = {
  ...TextInput,
  visibilityToggle: 'Visibility toggle button',
  innerInput: 'Actual input element',
};
