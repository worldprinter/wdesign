/* eslint-disable react/no-unused-prop-types */
import type React from 'react'
import { cloneElement, forwardRef } from 'react'

import { useMergedRef } from '@worldprinter/wdesign-hooks'
import { clsx, useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { isElement } from '@worldprinter/wdesign-utils'

import { usePopoverContext } from '../Popover.context'
import { POPOVER_ERRORS } from '../Popover.errors'

export type PopoverTargetProps = {
    /** Target element */
    children: React.ReactNode

    /** Key of the prop that should be used to get element ref */
    refProp?: string

    /** Popup accessible type, 'dialog' by default */
    popupType?: string
}

const defaultProps: Partial<PopoverTargetProps> = {
    refProp: 'ref',
    popupType: 'dialog',
}

export const PopoverTarget = forwardRef<HTMLElement, PopoverTargetProps>((props, ref) => {
    const { children, refProp, popupType, ...others } = useComponentDefaultProps('PopoverTarget', defaultProps, props)

    if (!isElement(children)) {
        throw new Error(POPOVER_ERRORS.children)
    }

    const forwardedProps = others as any
    const ctx = usePopoverContext()
    const targetRef = useMergedRef(ctx.reference, (children as any).ref, ref)

    const accessibleProps = ctx.withRoles
        ? {
              'aria-haspopup': popupType,
              'aria-expanded': ctx.opened,
              'aria-controls': ctx.getDropdownId(),
              id: ctx.getTargetId(),
          }
        : {}

    return cloneElement(children, {
        ...forwardedProps,
        ...accessibleProps,
        ...ctx.targetProps,
        className: clsx(ctx.targetProps.className, forwardedProps.className, children.props.className),
        [refProp]: targetRef,
        ...(!ctx.controlled ? { onClick: ctx.onToggle } : null),
    })
})

PopoverTarget.displayName = '@worldprinter/wdesign-core/PopoverTarget'
