import { MantineSize } from '@worldprinter/wdesign-styles';
import { createContext, useContext } from 'react';

interface RadioGroupContextValue {
  size: MantineSize;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  name: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue>(null);
export const RadioGroupProvider = RadioGroupContext.Provider;
export const useRadioGroupContext = () => useContext(RadioGroupContext);
