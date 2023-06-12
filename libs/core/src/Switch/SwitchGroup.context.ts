import { createContext, useContext } from 'react'

import type { WDesignSize } from '@worldprinter/wdesign-styles'

type SwitchGroupContextValue = {
    value: string[]
    onChange(event: React.ChangeEvent<HTMLInputElement>): void
    size: WDesignSize
}

const SwitchGroupContext = createContext<SwitchGroupContextValue>(null)
export const SwitchGroupProvider = SwitchGroupContext.Provider
export const useSwitchGroupContext = () => useContext(SwitchGroupContext)
