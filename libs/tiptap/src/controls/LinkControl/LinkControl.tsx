import { IconExternalLink, IconLink } from '@tabler/icons-react'
import React, { forwardRef, useState } from 'react'

import type { PopoverProps, Selectors } from '@worldprinter/wdesign-core'
import {
    Button,
    Popover,
    rem,
    TextInput,
    Tooltip,
    UnstyledButton,
    useComponentDefaultProps,
} from '@worldprinter/wdesign-core'
import { useDisclosure, useInputState, useWindowEvent } from '@worldprinter/wdesign-hooks'

import { useRichTextEditorContext } from '../../RichTextEditor.context'
import type { RichTextEditorControlBaseProps } from '../ControlBase/ControlBase'
import { ControlBase } from '../ControlBase/ControlBase'
import useStyles from './LinkControl.styles'

export type LinkControlStylesNames = Selectors<typeof useStyles>

export type RichTextEditorLinkControlProps = {
    /** Props added to Popover component */
    popoverProps?: Partial<PopoverProps>

    /** Determines whether external link control tooltip should be disabled */
    disableTooltips?: boolean
} & Partial<RichTextEditorControlBaseProps>

const LinkIcon: RichTextEditorControlBaseProps['icon'] = ({ size, ...others }) => (
    <IconLink
        size={size}
        stroke={1.5}
        {...others}
    />
)

const defaultProps: Partial<RichTextEditorLinkControlProps> = {}

export const LinkControl = forwardRef<HTMLButtonElement, RichTextEditorLinkControlProps>((props, ref) => {
    const { icon, popoverProps, disableTooltips, ...others } = useComponentDefaultProps(
        'RichTextEditorLinkControl',
        defaultProps,
        props,
    )

    const { editor, labels, classNames, styles, unstyled, variant } = useRichTextEditorContext()
    const { classes } = useStyles(null, {
        name: 'RichTextEditor',
        classNames,
        styles,
        unstyled,
        variant,
    })

    const [url, setUrl] = useInputState('')
    const [external, setExternal] = useState(false)
    const [opened, { open, close }] = useDisclosure(false)

    const handleOpen = () => {
        open()
        const linkData = editor?.getAttributes('link')
        setUrl(linkData?.href || '')
        setExternal(linkData?.target === '_blank')
    }

    const handleClose = () => {
        close()
        setUrl('')
        setExternal(false)
    }

    const setLink = () => {
        handleClose()
        url === ''
            ? editor.chain().focus().extendMarkRange('link').unsetLink().run()
            : editor
                  .chain()
                  .focus()
                  .extendMarkRange('link')
                  .setLink({ href: url, target: external ? '_blank' : null })
                  .run()
    }

    const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            setLink()
        }
    }

    useWindowEvent('edit-link', handleOpen, false)

    return (
        <Popover
            trapFocus
            shadow='md'
            withinPortal
            opened={opened}
            onClose={handleClose}
            offset={-44}
            zIndex={10000}
            unstyled={unstyled}
            {...popoverProps}
        >
            <Popover.Target>
                <ControlBase
                    icon={icon || LinkIcon}
                    aria-label={labels.linkControlLabel}
                    title={labels.linkControlLabel}
                    onClick={handleOpen}
                    active={editor?.isActive('link')}
                    unstyled={unstyled}
                    {...others}
                    ref={ref}
                />
            </Popover.Target>

            <Popover.Dropdown
                sx={(theme) => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                })}
            >
                <div className={classes.linkEditor}>
                    <TextInput
                        placeholder={labels.linkEditorInputPlaceholder}
                        aria-label={labels.linkEditorInputLabel}
                        type='url'
                        value={url}
                        onChange={setUrl}
                        classNames={{ input: classes.linkEditorInput }}
                        onKeyDown={handleInputKeydown}
                        unstyled={unstyled}
                        rightSection={
                            <Tooltip
                                label={external ? labels.linkEditorExternalLink : labels.linkEditorInternalLink}
                                events={{ hover: true, focus: true, touch: true }}
                                withinPortal
                                withArrow
                                disabled={disableTooltips}
                                unstyled={unstyled}
                                zIndex={10000}
                            >
                                <UnstyledButton
                                    onClick={() => setExternal((e) => !e)}
                                    data-active={external || undefined}
                                    className={classes.linkEditorExternalControl}
                                    unstyled={unstyled}
                                >
                                    <IconExternalLink
                                        size={rem(14)}
                                        stroke={1.5}
                                    />
                                </UnstyledButton>
                            </Tooltip>
                        }
                    />

                    <Button
                        variant='default'
                        onClick={setLink}
                        className={classes.linkEditorSave}
                        unstyled={unstyled}
                    >
                        {labels.linkEditorSave}
                    </Button>
                </div>
            </Popover.Dropdown>
        </Popover>
    )
})
