import React, { forwardRef, useEffect, useState } from 'react'

import { useElementSize } from '@worldprinter/wdesign-hooks'
import type { DefaultProps, Selectors } from '@worldprinter/wdesign-styles'
import { rem, useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Anchor } from '../Anchor'
import { Box } from '../Box'
import type { SpoilerStylesParams } from './Spoiler.styles'
import useStyles from './Spoiler.styles'

export type SpoilerStylesNames = Selectors<typeof useStyles>

export type SpoilerProps = {
    variant?: string

    /** Max height of visible content, when this point is reached spoiler appears */
    maxHeight: number

    /** Label for close spoiler action */
    hideLabel: React.ReactNode

    /** Label for open spoiler action */
    showLabel: React.ReactNode

    /** Get ref of spoiler toggle button */
    controlRef?: React.ForwardedRef<HTMLButtonElement>

    /** Initial spoiler state, true to wrap content in spoiler, false to show content without spoiler, opened state will be updated on mount */
    initialState?: boolean

    /** Spoiler reveal transition duration in ms, 0 or null to turn off animation */
    transitionDuration?: number
} & DefaultProps<SpoilerStylesNames, SpoilerStylesParams> &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<SpoilerProps> = {
    maxHeight: 100,
    transitionDuration: 200,
    initialState: false,
}

export const Spoiler = forwardRef<HTMLDivElement, SpoilerProps>((props, ref) => {
    const {
        className,
        children,
        maxHeight,
        hideLabel,
        showLabel,
        transitionDuration,
        controlRef,
        initialState,
        classNames,
        styles,
        unstyled,
        variant,
        ...others
    } = useComponentDefaultProps('Spoiler', defaultProps, props)

    const { classes, cx } = useStyles(
        { transitionDuration },
        { name: 'Spoiler', classNames, styles, unstyled, variant },
    )

    const [show, setShowState] = useState(initialState)
    const [spoiler, setSpoilerState] = useState(initialState)
    const { ref: contentRef, height } = useElementSize()

    const spoilerMoreContent = show ? hideLabel : showLabel

    useEffect(() => {
        setSpoilerState(maxHeight < height)
    }, [height, maxHeight, children])

    return (
        <Box
            className={cx(classes.root, className)}
            ref={ref}
            {...others}
        >
            <div
                className={classes.content}
                style={{
                    maxHeight: !show ? rem(maxHeight) : height ? rem(height) : undefined,
                }}
            >
                <div ref={contentRef}>{children}</div>
            </div>

            {spoiler && (
                <Anchor
                    component='button'
                    ref={controlRef}
                    onClick={() => setShowState((opened) => !opened)}
                    className={classes.control}
                >
                    {spoilerMoreContent}
                </Anchor>
            )}
        </Box>
    )
})

Spoiler.displayName = '@worldprinter/wdesign-core/Spoiler'
