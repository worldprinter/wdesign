import React from 'react'

import type { DefaultProps, Selectors } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Collapse } from '../../Collapse'
import { useAccordionContext } from '../Accordion.context'
import { useAccordionItemContext } from '../AccordionItem.context'
import useStyles from './AccordionPanel.styles'

export type AccordionPanelStylesNames = Selectors<typeof useStyles>

export type AccordionPanelProps = {
    /** Panel content */
    children?: React.ReactNode
} & DefaultProps &
    Omit<React.ComponentPropsWithoutRef<'div'>, 'onTransitionEnd'>

const defaultProps: Partial<AccordionPanelProps> = {}

export function AccordionPanel(props: AccordionPanelProps) {
    const { children, className, ...others } = useComponentDefaultProps('AccordionPanel', defaultProps, props)

    const ctx = useAccordionContext()
    const { value } = useAccordionItemContext()
    const { classNames, styles, unstyled } = useAccordionContext()
    const { classes, cx } = useStyles(
        { radius: ctx.radius },
        { name: 'Accordion', classNames, styles, unstyled, variant: ctx.variant },
    )

    return (
        <Collapse
            {...others}
            className={cx(classes.panel, className)}
            in={ctx.isItemActive(value)}
            transitionDuration={ctx.transitionDuration}
            role='region'
            id={ctx.getRegionId(value)}
            aria-labelledby={ctx.getControlId(value)}
        >
            <div className={classes.content}>{children}</div>
        </Collapse>
    )
}

AccordionPanel.displayName = '@worldprinter/wdesign-core/AccordionPanel'
