import React from 'react'

import type { MantineTheme } from '@worldprinter/wdesign-styles'

import type { SelectRightSectionProps } from './SelectRightSection'
import { SelectRightSection } from './SelectRightSection'

type GetRightSectionProps = {
    rightSection?: React.ReactNode
    rightSectionWidth?: string | number
    styles: Record<string, any>
    theme: MantineTheme
    readOnly: boolean
} & SelectRightSectionProps

export function getSelectRightSectionProps({
    styles,
    rightSection,
    rightSectionWidth,
    theme,
    ...props
}: GetRightSectionProps) {
    if (rightSection) {
        return { rightSection, rightSectionWidth, styles }
    }

    const _styles = typeof styles === 'function' ? styles(theme) : styles

    return {
        rightSection: !props.readOnly && !(props.disabled && props.shouldClear) && <SelectRightSection {...props} />,
        styles: {
            ..._styles,
            rightSection: {
                ..._styles?.rightSection,
                pointerEvents: props.shouldClear ? undefined : 'none',
            },
        },
    }
}
