import React from 'react'

import type { DefaultProps, Selectors, WDesignColor, WDesignNumberSize } from '@worldprinter/wdesign-core'
import { Center, Group, Highlight, Text, UnstyledButton } from '@worldprinter/wdesign-core'

import type { SpotlightAction } from '../types'
import useStyles from './DefaultAction.styles'

export type DefaultActionStylesNames = Selectors<typeof useStyles>

export type DefaultActionProps = {
    action: SpotlightAction
    hovered: boolean
    onTrigger(): void
    highlightQuery: boolean
    highlightColor: WDesignColor
    query: string
    radius: WDesignNumberSize
} & DefaultProps<DefaultActionStylesNames> &
    React.ComponentPropsWithoutRef<'button'>

export function DefaultAction({
    action,
    styles,
    classNames,
    hovered,
    onTrigger,
    highlightQuery,
    highlightColor,
    query,
    radius,
    ...others
}: DefaultActionProps) {
    const { classes } = useStyles({ radius }, { styles, classNames, name: 'Spotlight' })

    return (
        <UnstyledButton
            className={classes.action}
            data-hovered={hovered || undefined}
            tabIndex={-1}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onTrigger}
            {...others}
        >
            <Group noWrap>
                {action.icon && (
                    <Center
                        className={classes.actionIcon}
                        data-hovered={hovered || undefined}
                    >
                        {action.icon}
                    </Center>
                )}

                <div className={classes.actionBody}>
                    <Highlight
                        highlightColor={highlightColor}
                        className={classes.actionHighlight}
                        highlight={highlightQuery ? query : null}
                    >
                        {action.title}
                    </Highlight>

                    {action.description && (
                        <Text
                            size='xs'
                            className={classes.actionDescription}
                            data-hovered={hovered || undefined}
                        >
                            {action.description}
                        </Text>
                    )}
                </div>
            </Group>
        </UnstyledButton>
    )
}

DefaultAction.displayName = '@worldprinter/wdesign-spotlight/DefaultAction'
