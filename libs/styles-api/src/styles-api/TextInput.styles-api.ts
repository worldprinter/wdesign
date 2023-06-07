import type { TextInputStylesNames } from '@worldprinter/wdesign-core'

import { Input } from './Input.styles-api'
import { InputWrapper } from './InputWrapper.styles-api'

export const TextInput: Record<TextInputStylesNames, string> = {
    ...Input,
    ...InputWrapper,
}
