import React, { forwardRef } from 'react'

import { rem, useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import type { ModalBaseContentProps } from '../../ModalBase'
import { ModalBase } from '../../ModalBase'
import type { ScrollAreaComponent } from '../Modal.context'
import { useModalContext } from '../Modal.context'

export type ModalContentProps = {
    /** Component used as scroll area, ScrollArea.Autosize by default */
    scrollAreaComponent?: ScrollAreaComponent
} & ModalBaseContentProps

const defaultProps: Partial<ModalContentProps> = {
    shadow: 'xl',
}

export const ModalContent = forwardRef<HTMLElement, ModalContentProps>((props, ref) => {
    const { children, scrollAreaComponent, ...others } = useComponentDefaultProps('ModalContent', defaultProps, props)

    const ctx = useModalContext()
    const Scroll: React.FC<any> = scrollAreaComponent || ctx.scrollAreaComponent || ModalBase.NativeScrollArea

    return (
        <ModalBase.Content
            ref={ref}
            radius={ctx.radius}
            {...others}
        >
            <Scroll style={{ maxHeight: `calc(100vh - (${rem(ctx.yOffset)} * 2))` }}>{children}</Scroll>
        </ModalBase.Content>
    )
})
