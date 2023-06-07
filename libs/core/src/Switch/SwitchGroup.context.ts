import { createContext, useContext } from 'react'

import type { MantineSize } from '@worldprinter/wdesign-styles'

type SwitchGroupContextValue = {
    value: string[]
    onChange(event: React.ChangeEvent<HTMLInputElement>): void
    size: MantineSize
}

const SwitchGroupContext = createContext<SwitchGroupContextValue>(null)
export const SwitchGroupProvider = SwitchGroupContext.Provider
export const useSwitchGroupContext = () => useContext(SwitchGroupContext)
