import React from 'react'

import { DefaultProps, useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import { AccordionStylesParams } from './Accordion.types'
import { AccordionControl, AccordionControlStylesNames } from './AccordionControl/AccordionControl'
import { AccordionItem, AccordionItemStylesNames } from './AccordionItem/AccordionItem'
import { AccordionPanel, AccordionPanelStylesNames } from './AccordionPanel/AccordionPanel'
import { AccordionProvider, AccordionProviderProps } from './AccordionProvider'
import { ChevronIcon } from './ChevronIcon'

export type AccordionStylesNames = AccordionItemStylesNames | AccordionPanelStylesNames | AccordionControlStylesNames

export interface AccordionProps<Multiple extends boolean = false>
    extends AccordionProviderProps<Multiple>,
        DefaultProps<AccordionStylesNames, AccordionStylesParams>,
        Omit<React.ComponentPropsWithoutRef<'div'>, keyof AccordionProviderProps<Multiple>> {}

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
