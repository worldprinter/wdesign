import { createContext, useContext } from 'react'

type InputWrapperContextValue = {
    offsetTop: boolean
    offsetBottom: boolean
    describedBy: string
}

const InputWrapperContext = createContext<InputWrapperContextValue>({
    offsetBottom: false,
    offsetTop: false,
    describedBy: undefined,
})

export const InputWrapperProvider = InputWrapperContext.Provider
export const useInputWrapperContext = () => useContext(InputWrapperContext)
