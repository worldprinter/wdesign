import type { FileInputStylesNames } from '@worldprint/wdesign-core';
import { Input } from './Input.styles-api';
import { InputWrapper } from './InputWrapper.styles-api';

export const FileInput: Record<FileInputStylesNames, string> = {
  ...Input,
  ...InputWrapper,
  placeholder: 'Placeholder text',
};
