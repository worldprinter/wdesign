import React, { forwardRef } from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import type { ModalBaseContentProps } from '../../ModalBase'
import { ModalBase } from '../../ModalBase'
import type { ScrollAreaComponent } from '../Drawer.context'
import { useDrawerContext } from '../Drawer.context'

export type DrawerContentProps = {
    /** Component used as scroll area, ScrollArea.Autosize by default */
    scrollAreaComponent?: ScrollAreaComponent
} & ModalBaseContentProps

const defaultProps: Partial<DrawerContentProps> = {
    shadow: 'xl',
}

export const DrawerContent = forwardRef<HTMLElement, DrawerContentProps>((props, ref) => {
    const { children, scrollAreaComponent, ...others } = useComponentDefaultProps('ModalContent', defaultProps, props)

    const ctx = useDrawerContext()

    const Scroll: React.FC<any> = scrollAreaComponent || ctx.scrollAreaComponent || ModalBase.NativeScrollArea

    return (
        <ModalBase.Content
            ref={ref}
            radius={0}
            {...others}
        >
            <Scroll style={{ height: '100vh' }}>{children}</Scroll>
        </ModalBase.Content>
    )
})
