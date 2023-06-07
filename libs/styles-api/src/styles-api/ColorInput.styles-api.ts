import { ColorInputStylesNames } from '@worldprinter/wdesign-core'

import { ColorPicker } from './ColorPicker.styles-api'
import { Input } from './Input.styles-api'
import { InputWrapper } from './InputWrapper.styles-api'
import { Popover } from './Popover.styles-api'

export const ColorInput: Record<ColorInputStylesNames, string> = {
    ...Input,
    ...InputWrapper,
    ...ColorPicker,
    ...Popover,
}
