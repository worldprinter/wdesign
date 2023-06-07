import React from 'react'

import type { DefaultProps } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import type { AccordionStylesParams } from './Accordion.types'
import type { AccordionControlStylesNames } from './AccordionControl/AccordionControl'
import { AccordionControl } from './AccordionControl/AccordionControl'
import type { AccordionItemStylesNames } from './AccordionItem/AccordionItem'
import { AccordionItem } from './AccordionItem/AccordionItem'
import type { AccordionPanelStylesNames } from './AccordionPanel/AccordionPanel'
import { AccordionPanel } from './AccordionPanel/AccordionPanel'
import type { AccordionProviderProps } from './AccordionProvider'
import { AccordionProvider } from './AccordionProvider'
import { ChevronIcon } from './ChevronIcon'

export type AccordionStylesNames = AccordionItemStylesNames | AccordionPanelStylesNames | AccordionControlStylesNames

export type AccordionProps<Multiple extends boolean = false> = {} & AccordionProviderProps<Multiple> &
    DefaultProps<AccordionStylesNames, AccordionStylesParams> &
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof AccordionProviderProps<Multiple>>

const defaultProps: Partial<AccordionProps> = {
    multiple: false,
    disableChevronRotation: false,
    transitionDuration: 200,
    chevronPosition: 'right',
    variant: 'default',
    chevronSize: 24,
    chevron: <ChevronIcon />,
}

export function Accordion<Multiple extends boolean = false>(props: AccordionProps<Multiple>) {
    const {
        id,
        loop,
        children,
        multiple,
        value,
        defaultValue,
        onChange,
        transitionDuration,
        disableChevronRotation,
        chevronPosition,
        chevronSize,
        order,
        chevron,
        classNames,
        styles,
        unstyled,
        variant,
        radius,
        ...others
    } = useComponentDefaultProps<AccordionProps<Multiple>>('Accordion', defaultProps as AccordionProps<Multiple>, props)

    return (
        <AccordionProvider
            id={id}
            multiple={multiple}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            loop={loop}
            transitionDuration={transitionDuration}
            disableChevronRotation={disableChevronRotation}
            chevronPosition={chevronPosition}
            chevronSize={chevronSize}
            order={order}
            chevron={chevron}
            variant={variant}
            radius={radius}
            classNames={classNames}
            styles={styles}
            unstyled={unstyled}
        >
            <Box
                {...others}
                data-accordion
            >
                {children}
            </Box>
        </AccordionProvider>
    )
}

Accordion.Item = AccordionItem
Accordion.Control = AccordionControl
Accordion.Panel = AccordionPanel
Accordion.displayName = '@worldprinter/wdesign-core/Accordion'
