import React from 'react'

import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import type { ModalBaseSettings } from '../../ModalBase'
import { ModalBase, ModalBaseDefaultProps } from '../../ModalBase'
import type { MantineTransition } from '../../Transition'
import type { ScrollAreaComponent } from '../Drawer.context'
import { DrawerProvider } from '../Drawer.context'
import useStyles from './DrawerRoot.styles'

export type DrawerPosition = 'bottom' | 'left' | 'right' | 'top'

export type DrawerRootProps = {
    /** Scroll area component, ScrollArea.Autosize by default */
    scrollAreaComponent?: ScrollAreaComponent

    /** Side of the screen where drawer will be opened, 'left' by default */
    position?: 'bottom' | 'left' | 'right' | 'top'
} & ModalBaseSettings

const transitions: Record<DrawerPosition, MantineTransition> = {
    top: 'slide-down',
    bottom: 'slide-up',
    left: 'slide-right',
    right: 'slide-left',
}

const rtlTransitions: Record<DrawerPosition, MantineTransition> = {
    top: 'slide-down',
    bottom: 'slide-up',
    right: 'slide-right',
    left: 'slide-left',
}

const defaultProps: Partial<DrawerRootProps> = {
    ...ModalBaseDefaultProps,
    position: 'left',
}

export function DrawerRoot(props: DrawerRootProps) {
    const { classNames, variant, size, scrollAreaComponent, position, transitionProps, ...others } =
        useComponentDefaultProps('DrawerRoot', defaultProps, props)

    const { classes, cx, theme } = useStyles({ position }, { name: 'Drawer', variant, size })

    const drawerTransition = (theme.dir === 'rtl' ? rtlTransitions : transitions)[position]

    return (
        <DrawerProvider value={{ scrollAreaComponent }}>
            <ModalBase
                __staticSelector='Drawer'
                size={size}
                variant={variant}
                transitionProps={{ transition: drawerTransition, duration: 200, ...transitionProps }}
                classNames={{
                    ...classNames,
                    content: cx(classes.content, classNames?.content),
                    inner: cx(classes.inner, classNames?.inner),
                }}
                {...others}
            />
        </DrawerProvider>
    )
}
