/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react'

import { useUncontrolled } from '@worldprinter/wdesign-hooks'
import type { DefaultProps, Selectors, Variants, WDesignColor, WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { rem, useComponentDefaultProps } from '@worldprinter/wdesign-styles'
import { createPolymorphicComponent } from '@worldprinter/wdesign-utils'

import { ChevronIcon } from '../Accordion'
import { Collapse } from '../Collapse'
import { Text } from '../Text'
import { UnstyledButton } from '../UnstyledButton'
import type { NavLinkStylesParams } from './NavLink.styles'
import useStyles from './NavLink.styles'

export type NavLinkStylesNames = Selectors<typeof useStyles>

export type NavLinkProps = {
    /** Main link content */
    label?: React.ReactNode

    /** Secondary link description */
    description?: React.ReactNode

    /** Icon displayed on the left side of the label */
    icon?: React.ReactNode

    /** Section displayed on the right side of the label */
    rightSection?: React.ReactNode

    /** Determines whether link should have active styles */
    active?: boolean

    /** Key of theme.colors, active link color */
    color?: WDesignColor

    /** Active link variant */
    variant?: Variants<'filled' | 'light' | 'subtle'>

    /** If prop is set then label and description will not wrap on the next line */
    noWrap?: boolean

    /** Child links */
    children?: React.ReactNode

    /** Controlled nested items collapse state */
    opened?: boolean

    /** Uncontrolled nested items collapse initial state */
    defaultOpened?: boolean

    /** Called when open state changes */
    onChange?(opened: boolean): void

    /** If set to true, right section will not rotate when collapse is opened */
    disableRightSectionRotation?: boolean

    /** Key of theme.spacing or any valid CSS value to set collapsed links padding-left */
    childrenOffset?: WDesignNumberSize

    /** Adds disabled styles to root element */
    disabled?: boolean
} & DefaultProps<NavLinkStylesNames, NavLinkStylesParams>

const defaultProps: Partial<NavLinkProps> = {
    variant: 'light',
    childrenOffset: 'lg',
}

export const _NavLink = forwardRef<HTMLButtonElement, NavLinkProps>((props, ref) => {
    const {
        label,
        description,
        icon,
        rightSection,
        className,
        classNames,
        styles,
        unstyled,
        active,
        color,
        variant,
        noWrap,
        children,
        opened,
        defaultOpened,
        onChange,
        disableRightSectionRotation,
        childrenOffset,
        disabled,
        // @ts-expect-error
        onClick,
        ...others
    } = useComponentDefaultProps('NavLink', defaultProps, props)

    const { classes, cx } = useStyles(
        { color, noWrap, childrenOffset, alignIcon: description ? 'top' : 'center' },
        { name: 'NavLink', classNames, styles, unstyled, variant },
    )

    const [_opened, setOpened] = useUncontrolled({
        value: opened,
        defaultValue: defaultOpened,
        finalValue: false,
        onChange,
    })

    const withChildren = !!children

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (withChildren) {
            event.preventDefault()
            onClick?.(event)
            setOpened(!_opened)
        } else {
            onClick?.(event)
        }
    }

    return (
        <>
            <UnstyledButton
                ref={ref}
                className={cx(classes.root, className)}
                data-active={active || undefined}
                onClick={handleClick}
                unstyled={unstyled}
                data-expanded={_opened || undefined}
                data-disabled={disabled || undefined}
                disabled={disabled}
                {...others}
            >
                {icon && <span className={classes.icon}>{icon}</span>}
                <span className={classes.body}>
                    <Text
                        component='span'
                        size='sm'
                        className={classes.label}
                    >
                        {label}
                    </Text>
                    <Text
                        component='span'
                        color='dimmed'
                        size='xs'
                        data-active={active || undefined}
                        className={classes.description}
                    >
                        {description}
                    </Text>
                </span>
                {(withChildren || rightSection) && (
                    <span
                        className={classes.rightSection}
                        data-rotate={(_opened && !disableRightSectionRotation) || undefined}
                    >
                        {withChildren
                            ? rightSection || (
                                  <ChevronIcon
                                      width={rem(14)}
                                      height={rem(14)}
                                      style={{ transform: 'rotate(-90deg)' }}
                                  />
                              )
                            : rightSection}
                    </span>
                )}
            </UnstyledButton>
            <Collapse in={_opened}>
                <div className={classes.children}>{children}</div>
            </Collapse>
        </>
    )
})

_NavLink.displayName = '@worldprinter/wdesign-core/NavLink'

export const NavLink = createPolymorphicComponent<'button', NavLinkProps>(_NavLink)
