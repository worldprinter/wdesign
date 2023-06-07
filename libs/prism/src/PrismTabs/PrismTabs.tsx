import React from 'react'

import type { TabsPanelProps, TabsProps } from '@worldprinter/wdesign-core'
import { Tabs } from '@worldprinter/wdesign-core'

import type { PrismProps } from '../Prism/Prism'
import { Prism } from '../Prism/Prism'
import useStyles from './PrismTabs.styles'

export function PrismTabs(props: TabsProps) {
    const { classes } = useStyles({ radius: props.radius })
    return (
        <Tabs
            {...props}
            variant='outline'
            classNames={{ tab: classes.tab }}
            translate='no'
        />
    )
}

export function PrismPanel({
    language,
    children,
    radius,
    noCopy,
    copyLabel,
    copiedLabel,
    withLineNumbers,
    highlightLines,
    scrollAreaComponent,
    trim,
    getPrismTheme,
    colorScheme,
    variant,
    ...others
}: PrismProps & TabsPanelProps) {
    const { classes } = useStyles({ radius })

    return (
        <Tabs.Panel {...others}>
            <Prism
                language={language}
                classNames={{ root: classes.prism, code: classes.code }}
                radius={radius}
                noCopy={noCopy}
                copyLabel={copyLabel}
                copiedLabel={copiedLabel}
                withLineNumbers={withLineNumbers}
                highlightLines={highlightLines}
                scrollAreaComponent={scrollAreaComponent}
                trim={trim}
                getPrismTheme={getPrismTheme}
                colorScheme={colorScheme}
                variant={variant}
            >
                {children}
            </Prism>
        </Tabs.Panel>
    )
}
