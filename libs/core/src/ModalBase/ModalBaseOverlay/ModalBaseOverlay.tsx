import React, { forwardRef } from 'react'

import type { Selectors } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import type { OverlayProps } from '../../Overlay'
import { Overlay } from '../../Overlay'
import type { TransitionOverride } from '../../Transition'
import { Transition } from '../../Transition'
import { useModalBaseContext } from '../ModalBase.context'
import useStyles from './ModalBaseOverlay.styles'

export type ModalBaseOverlayStylesNames = Selectors<typeof useStyles>

export type ModalBaseOverlayProps = {
    /** Props added to Transition component */
    transitionProps?: TransitionOverride
} & OverlayProps &
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof OverlayProps>

const defaultProps: Partial<ModalBaseOverlayProps> = {}

export const ModalBaseOverlay = forwardRef<HTMLDivElement, ModalBaseOverlayProps>((props, ref) => {
    const ctx = useModalBaseContext()

    const { onClick, transitionProps, style, className, ...others } = useComponentDefaultProps(
        `${ctx.__staticSelector}Overlay`,
        defaultProps,
        props,
    )

    const { classes, cx } = useStyles(null, ctx.stylesApi)

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(event)
        ctx.closeOnClickOutside && ctx.onClose()
    }

    return (
        <Transition
            mounted={ctx.opened}
            {...ctx.transitionProps}
            {...transitionProps}
            transition='fade'
        >
            {(transitionStyles) => (
                <Overlay
                    ref={ref}
                    onClick={handleClick}
                    fixed
                    style={{ ...style, ...transitionStyles }}
                    className={cx(classes.overlay, className)}
                    zIndex={ctx.zIndex}
                    {...others}
                />
            )}
        </Transition>
    )
})
