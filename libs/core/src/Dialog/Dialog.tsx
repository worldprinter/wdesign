import React, { forwardRef } from 'react'

import type { DefaultProps, Selectors } from '@worldprinter/wdesign-styles'
import { getDefaultZIndex, useComponentDefaultProps, useWDesignTheme } from '@worldprinter/wdesign-styles'

import { Affix } from '../Affix'
import { CloseButton } from '../CloseButton'
import type { PaperProps } from '../Paper'
import { Paper } from '../Paper'
import type { WDesignTransition } from '../Transition'
import { Transition } from '../Transition'
import useStyles from './Dialog.styles'

export type DialogStylesNames = Selectors<typeof useStyles>

export type DialogProps = {
    variant?: string

    /** If set dialog will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
    keepMounted?: boolean

    /** Display close button at the top right corner */
    withCloseButton?: boolean

    /** Called when close button is clicked */
    onClose?(): void

    /** Dialog position (fixed in viewport) */
    position?: {
        top?: string | number
        left?: string | number
        bottom?: string | number
        right?: string | number
    }

    /** Dialog content */
    children?: React.ReactNode

    /** Dialog container z-index */
    zIndex?: React.CSSProperties['zIndex']

    /** Opened state */
    opened: boolean

    /** Appear/disappear transition */
    transition?: WDesignTransition

    /** Duration in ms of modal transitions, set to 0 to disable all animations */
    transitionDuration?: number

    /** Transition timing function, defaults to theme.transitionTimingFunction */
    transitionTimingFunction?: string

    /** Dialog width */
    size?: string | number
} & DefaultProps<DialogStylesNames> &
    Omit<PaperProps, 'classNames' | 'styles'>

const defaultProps: Partial<DialogProps> = {
    shadow: 'md',
    p: 'md',
    withBorder: false,
    size: 'md',
    transition: 'pop-top-right',
    transitionDuration: 200,
}

export function DialogBody(props: DialogProps) {
    const {
        withCloseButton,
        onClose,
        position,
        shadow,
        children,
        className,
        style,
        classNames,
        styles,
        opened,
        withBorder,
        size,
        transition,
        transitionDuration,
        transitionTimingFunction,
        unstyled,
        variant,
        keepMounted,
        ...others
    } = useComponentDefaultProps('Dialog', defaultProps, props)

    const { classes, cx } = useStyles(null, {
        classNames,
        styles,
        unstyled,
        name: 'Dialog',
        variant,
        size,
    })

    return (
        <Transition
            keepMounted={keepMounted}
            mounted={opened}
            transition={transition}
            duration={transitionDuration}
            timingFunction={transitionTimingFunction}
        >
            {(transitionStyles) => (
                <Paper
                    className={cx(classes.root, className)}
                    style={{ ...style, ...transitionStyles }}
                    shadow={shadow}
                    withBorder={withBorder}
                    unstyled={unstyled}
                    {...others}
                >
                    {withCloseButton && (
                        <CloseButton
                            onClick={onClose}
                            className={classes.closeButton}
                        />
                    )}
                    {children}
                </Paper>
            )}
        </Transition>
    )
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
    ({ zIndex = getDefaultZIndex('modal'), ...props }: DialogProps, ref) => {
        const theme = useWDesignTheme()

        return (
            <Affix
                zIndex={zIndex}
                position={
                    props.position || {
                        bottom: theme.spacing.xl,
                        right: theme.spacing.xl,
                    }
                }
                ref={ref}
            >
                <DialogBody {...props} />
            </Affix>
        )
    },
)

Dialog.displayName = '@worldprinter/wdesign-core/Dialog'
