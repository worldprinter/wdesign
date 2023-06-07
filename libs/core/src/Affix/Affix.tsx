import React, { forwardRef } from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { getDefaultZIndex, useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { packSx } from '@worldprinter/wdesign-utils'

import { Box } from '../Box'
import type { PortalProps } from '../Portal'
import { OptionalPortal } from '../Portal'

export type AffixProps = {
    /** Element where portal should be rendered, by default new div element is created and appended to document.body */
    target?: HTMLDivElement

    /** Root element z-index property */
    zIndex?: React.CSSProperties['zIndex']

    /** Determines whether component should be rendered within portal, defaults to true */
    withinPortal?: boolean

    /** Props to pass down to the portal when withinPortal is true */
    portalProps?: Omit<PortalProps, 'children' | 'withinPortal' | 'target'>

    /** Affix position on screen, defaults to { bottom: 0, right: 0 } */
    position?: {
        top?: string | number
        left?: string | number
        bottom?: string | number
        right?: string | number
    }
} & DefaultProps &
    React.ComponentPropsWithoutRef<'div'>

const defaultProps: Partial<AffixProps> = {
    position: { bottom: 0, right: 0 },
    zIndex: getDefaultZIndex('modal'),
    withinPortal: true,
}

export const Affix = forwardRef<HTMLDivElement, AffixProps>((props: AffixProps, ref) => {
    const { target, position, zIndex, sx, withinPortal, portalProps, ...others } = useComponentDefaultProps(
        'Affix',
        defaultProps,
        props,
    )

    return (
        <OptionalPortal
            {...portalProps}
            withinPortal={withinPortal}
            target={target}
        >
            <Box
                sx={[{ position: 'fixed', zIndex, ...position }, ...packSx(sx)]}
                ref={ref}
                {...others}
            />
        </OptionalPortal>
    )
})

Affix.displayName = '@worldprinter/wdesign-core/Affix'
