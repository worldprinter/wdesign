import type { InputSharedProps, InputStylesNames, InputWrapperBaseProps, InputWrapperStylesNames } from '../Input'
import type { SelectItemsStylesNames } from './SelectItems/SelectItems'
import type { SelectPopoverStylesNames } from './SelectPopover/SelectPopover'

export type SelectItem = {
    value: string
    label?: string
    selected?: boolean
    disabled?: boolean
    group?: string
    [key: string]: any
}

export type BaseSelectStylesNames =
    | InputStylesNames
    | InputWrapperStylesNames
    | SelectItemsStylesNames
    | SelectPopoverStylesNames

export type BaseSelectProps = InputWrapperBaseProps &
    InputSharedProps &
    Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'onChange' | 'size' | 'defaultValue'>
