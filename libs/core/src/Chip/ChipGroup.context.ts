import type React from 'react'
import { createContext, useContext } from 'react'

type ChipGroupContextValue = {
    isChipSelected(value: string): boolean
    onChange(event: React.ChangeEvent<HTMLInputElement>): void
    multiple: boolean
}

const ChipGroupContext = createContext<ChipGroupContextValue>(null)

export const ChipGroupProvider = ChipGroupContext.Provider
export const useChipGroup = () => useContext(ChipGroupContext)
