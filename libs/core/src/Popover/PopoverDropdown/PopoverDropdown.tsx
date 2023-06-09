import React from 'react'

import { useFocusReturn } from '@worldprinter/wdesign-hooks'
import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { rem, useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { closeOnEscape } from '@worldprinter/wdesign-utils'

import { Box } from '../../Box'
import { FloatingArrow } from '../../Floating'
import { FocusTrap } from '../../FocusTrap'
import { OptionalPortal } from '../../Portal'
import { Transition } from '../../Transition'
import { usePopoverContext } from '../Popover.context'
import useStyles from './PopoverDropdown.styles'

export type PopoverDropdownProps = {
    /** Dropdown content */
    children?: React.ReactNode
} & DefaultProps &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<PopoverDropdownProps> = {}

export function PopoverDropdown(props: PopoverDropdownProps) {
    const { style, className, children, onKeyDownCapture, ...others } = useComponentDefaultProps(
        'PopoverDropdown',
        defaultProps,
        props,
    )

    const ctx = usePopoverContext()
    const { classes, cx } = useStyles(
        { radius: ctx.radius, shadow: ctx.shadow },
        {
            name: ctx.__staticSelector,
            classNames: ctx.classNames,
            styles: ctx.styles,
            unstyled: ctx.unstyled,
            variant: ctx.variant,
        },
    )

    const returnFocus = useFocusReturn({
        opened: ctx.opened,
        shouldReturnFocus: ctx.returnFocus,
    })

    const accessibleProps = ctx.withRoles
        ? {
              'aria-labelledby': ctx.getTargetId(),
              id: ctx.getDropdownId(),
              role: 'dialog',
          }
        : {}

    if (ctx.disabled) {
        return null
    }

    return (
        <OptionalPortal
            {...ctx.portalProps}
            withinPortal={ctx.withinPortal}
        >
            <Transition
                mounted={ctx.opened}
                {...ctx.transitionProps}
                transition={ctx.transitionProps.transition || 'fade'}
                duration={ctx.transitionProps.duration ?? 150}
                keepMounted={ctx.keepMounted}
                exitDuration={
                    typeof ctx.transitionProps.exitDuration === 'number'
                        ? ctx.transitionProps.exitDuration
                        : ctx.transitionProps.duration
                }
            >
                {(transitionStyles) => (
                    <FocusTrap active={ctx.trapFocus}>
                        <Box
                            {...accessibleProps}
                            tabIndex={-1}
                            ref={ctx.floating}
                            style={{
                                ...style,
                                ...transitionStyles,
                                zIndex: ctx.zIndex,
                                top: ctx.y ?? 0,
                                left: ctx.x ?? 0,
                                width: ctx.width === 'target' ? undefined : rem(ctx.width),
                            }}
                            className={cx(classes.dropdown, className)}
                            onKeyDownCapture={closeOnEscape(ctx.onClose, {
                                active: ctx.closeOnEscape,
                                onTrigger: returnFocus,
                                onKeyDown: onKeyDownCapture,
                            })}
                            data-position={ctx.placement}
                            {...others}
                        >
                            {children}

                            <FloatingArrow
                                ref={ctx.arrowRef}
                                arrowX={ctx.arrowX}
                                arrowY={ctx.arrowY}
                                visible={ctx.withArrow}
                                position={ctx.placement}
                                arrowSize={ctx.arrowSize}
                                arrowRadius={ctx.arrowRadius}
                                arrowOffset={ctx.arrowOffset}
                                arrowPosition={ctx.arrowPosition}
                                className={classes.arrow}
                            />
                        </Box>
                    </FocusTrap>
                )}
            </Transition>
        </OptionalPortal>
    )
}

PopoverDropdown.displayName = '@worldprinter/wdesign-core/PopoverDropdown'
