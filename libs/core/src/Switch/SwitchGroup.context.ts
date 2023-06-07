import { createContext, useContext } from 'react'

import { MantineSize } from '@worldprinter/wdesign-styles'

interface SwitchGroupContextValue {
    value: string[]
    onChange(event: React.ChangeEvent<HTMLInputElement>): void
    size: MantineSize
}

const SwitchGroupContext = createContext<SwitchGroupContextValue>(null)
export const SwitchGroupProvider = SwitchGroupContext.Provider
export const useSwitchGroupContext = () => useContext(SwitchGroupContext)
