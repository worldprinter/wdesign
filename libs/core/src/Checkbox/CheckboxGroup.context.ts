import { createContext, useContext } from 'react'

import type { WDesignSize } from '@worldprinter/wdesign-styles'

type CheckboxGroupContextValue = {
    value: string[]
    onChange(event: React.ChangeEvent<HTMLInputElement>): void
    size: WDesignSize
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue>(null)
export const CheckboxGroupProvider = CheckboxGroupContext.Provider
export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext)
