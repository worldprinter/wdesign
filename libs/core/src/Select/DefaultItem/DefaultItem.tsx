import React, { forwardRef } from 'react'

export type SelectItemProps = {
    label: React.ReactNode
    value?: string
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'value'>

export const DefaultItem = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ label, value, ...others }: SelectItemProps, ref) => (
        <div
            ref={ref}
            {...others}
        >
            {label || value}
        </div>
    ),
)

DefaultItem.displayName = '@worldprinter/wdesign-core/DefaultItem'
