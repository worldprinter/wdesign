import React, { forwardRef, useRef, useState } from 'react'

import type { UseMovePosition } from '@worldprinter/wdesign-hooks'
import { clampUseMovePosition, useDidUpdate, useMergedRef, useMove } from '@worldprinter/wdesign-hooks'
import type { DefaultProps, MantineSize, Selectors } from '@worldprinter/wdesign-styles'
import { rem } from '@worldprinter/wdesign-styles'

import { Box } from '../../Box'
import type { ThumbStylesNames } from '../Thumb/Thumb'
import { Thumb } from '../Thumb/Thumb'
import useStyles from './ColorSlider.styles'

export type ColorSliderStylesNames = Exclude<Selectors<typeof useStyles>, 'sliderThumb'> | ThumbStylesNames

export type BaseColorSliderProps = {
    variant?: string
    value: number
    onChange(value: number): void
    onChangeEnd(value: number): void
    size?: MantineSize
    focusable?: boolean
    __staticSelector?: string
} & DefaultProps<ColorSliderStylesNames> &
    Omit<React.ComponentPropsWithoutRef<'div'>, 'value' | 'onChange'>

export type ColorSliderProps = {
    maxValue: number
    overlays: React.CSSProperties[]
    round: boolean
    thumbColor?: string
} & BaseColorSliderProps

export const ColorSlider = forwardRef<HTMLDivElement, ColorSliderProps>(
    (
        {
            value,
            onChange,
            onChangeEnd,
            maxValue,
            round,
            size = 'md',
            thumbColor = 'transparent',
            __staticSelector = 'ColorSlider',
            focusable = true,
            overlays,
            classNames,
            styles,
            className,
            unstyled,
            variant,
            ...others
        }: ColorSliderProps,
        ref,
    ) => {
        const { classes, cx } = useStyles(null, {
            classNames,
            styles,
            name: __staticSelector,
            unstyled,
            variant,
            size,
        })

        const [position, setPosition] = useState({ y: 0, x: value / maxValue })
        const positionRef = useRef(position)
        const getChangeValue = (val: number) => (round ? Math.round(val * maxValue) : val * maxValue)
        const { ref: sliderRef } = useMove(
            ({ x, y }) => {
                positionRef.current = { x, y }
                onChange(getChangeValue(x))
            },
            {
                onScrubEnd: () => {
                    const { x } = positionRef.current
                    onChangeEnd(getChangeValue(x))
                },
            },
        )

        useDidUpdate(() => {
            setPosition({ y: 0, x: value / maxValue })
        }, [value])

        const handleArrow = (event: React.KeyboardEvent<HTMLDivElement>, pos: UseMovePosition) => {
            event.preventDefault()
            const _position = clampUseMovePosition(pos)
            onChange(getChangeValue(_position.x))
            onChangeEnd(getChangeValue(_position.x))
        }

        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            switch (event.key) {
                case 'ArrowRight': {
                    handleArrow(event, { x: position.x + 0.05, y: position.y })
                    break
                }

                case 'ArrowLeft': {
                    handleArrow(event, { x: position.x - 0.05, y: position.y })
                    break
                }
            }
        }

        const layers = overlays.map((overlay, index) => (
            <div
                className={classes.sliderOverlay}
                style={overlay}
                key={index}
            />
        ))

        return (
            <Box
                {...others}
                ref={useMergedRef(sliderRef, ref)}
                className={cx(classes.slider, className)}
                role='slider'
                aria-valuenow={value}
                aria-valuemax={maxValue}
                aria-valuemin={0}
                tabIndex={focusable ? 0 : -1}
                onKeyDown={handleKeyDown}
            >
                {layers}

                <Thumb
                    __staticSelector={__staticSelector}
                    classNames={classNames}
                    styles={styles}
                    position={position}
                    style={{ top: rem(1), backgroundColor: thumbColor }}
                    className={classes.sliderThumb}
                    size={size}
                />
            </Box>
        )
    },
)

ColorSlider.displayName = '@worldprinter/wdesign-core/ColorSlider'
