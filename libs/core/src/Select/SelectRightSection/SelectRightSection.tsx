import React from 'react'

import type { WDesignSize } from '@worldprinter/wdesign-styles'

import { CloseButton } from '../../CloseButton'
import { ChevronIcon } from './ChevronIcon'

export type SelectRightSectionProps = {
    shouldClear: boolean
    clearButtonProps?: React.ComponentPropsWithoutRef<'button'>
    onClear?: () => void
    size: WDesignSize
    error?: any
    // eslint-disable-next-line react/no-unused-prop-types
    disabled?: boolean
}

export function SelectRightSection({ shouldClear, clearButtonProps, onClear, size, error }: SelectRightSectionProps) {
    return shouldClear ? (
        <CloseButton
            {...clearButtonProps}
            variant='transparent'
            onClick={onClear}
            size={size}
            onMouseDown={(event) => event.preventDefault()}
        />
    ) : (
        <ChevronIcon
            error={error}
            size={size}
        />
    )
}

SelectRightSection.displayName = '@worldprinter/wdesign-core/SelectRightSection'
