import React, { forwardRef, useEffect } from 'react'

import type { DefaultProps, Selectors } from '@worldprinter/wdesign-styles'
import { useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../../Box'
import { useModalBaseContext } from '../ModalBase.context'
import useStyles from './ModalBaseTitle.styles'

export type ModalBaseTitleStylesNames = Selectors<typeof useStyles>

export type ModalBaseTitleProps = {} & DefaultProps & React.ComponentPropsWithoutRef<'h2'>

const defaultProps: Partial<ModalBaseTitleProps> = {}

export const ModalBaseTitle = forwardRef<HTMLHeadingElement, ModalBaseTitleProps>((props, ref) => {
    const ctx = useModalBaseContext()
    const { className, ...others } = useComponentDefaultProps(`${ctx.__staticSelector}Title`, defaultProps, props)

    const { classes, cx } = useStyles(null, ctx.stylesApi)

    useEffect(() => {
        ctx.setTitleMounted(true)
        return () => ctx.setTitleMounted(false)
    }, [])

    return (
        <Box
            component='h2'
            id={ctx.getTitleId()}
            className={cx(classes.title, className)}
            ref={ref}
            {...others}
        />
    )
})
