import React, { forwardRef, useState } from 'react'

import { useDidUpdate } from '@worldprinter/wdesign-hooks'
import type { DefaultProps, Selectors, WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { rem, useComponentDefaultProps } from '@worldprinter/wdesign-styles'

import { Box } from '../Box'
import { Text } from '../Text'
import type { ImageStylesParams } from './Image.styles'
import useStyles from './Image.styles'
import { ImageIcon } from './ImageIcon'

export type ImageStylesNames = Selectors<typeof useStyles>

export type ImageProps = {
    variant?: string

    /** Image src */
    src?: string | null

    /** Image alt text, used as title for placeholder if image was not loaded */
    alt?: string

    /** Image object-fit property */
    fit?: React.CSSProperties['objectFit']

    /** Image width, defaults to 100%, cannot exceed 100% */
    width?: number | string

    /** Image height, defaults to original image height adjusted to given width */
    height?: number | string

    /** Key of theme.radius or any valid CSS value to set border-radius, 0 by default */
    radius?: WDesignNumberSize

    /** Enable placeholder when image is loading and when image fails to load */
    withPlaceholder?: boolean

    /** Customize placeholder content */
    placeholder?: React.ReactNode

    /** Props spread to img element */
    imageProps?: React.ComponentPropsWithoutRef<'img'>

    /** Get image element ref */
    imageRef?: React.ForwardedRef<HTMLImageElement>

    /** Image figcaption, displayed below image */
    caption?: React.ReactNode
} & DefaultProps<ImageStylesNames, ImageStylesParams> &
    Omit<React.ComponentPropsWithoutRef<'div'>, 'placeholder'>

const defaultProps: Partial<ImageProps> = {
    fit: 'cover',
    width: '100%',
    height: 'auto',
    radius: 0,
}

export const Image = forwardRef<HTMLDivElement, ImageProps>((props: ImageProps, ref) => {
    const {
        className,
        alt,
        src,
        fit,
        width,
        height,
        radius,
        imageProps,
        withPlaceholder,
        placeholder,
        imageRef,
        classNames,
        styles,
        caption,
        unstyled,
        style,
        variant,
        ...others
    } = useComponentDefaultProps('Image', defaultProps, props)

    const { classes, cx } = useStyles({ radius }, { classNames, styles, unstyled, name: 'Image', variant })

    const [error, setError] = useState(!src)
    const isPlaceholder = withPlaceholder && error

    useDidUpdate(() => {
        setError(!src)
    }, [src])

    return (
        <Box
            className={cx(classes.root, className)}
            style={{ width: rem(width), ...style }}
            ref={ref}
            {...others}
        >
            <figure className={classes.figure}>
                <div className={classes.imageWrapper}>
                    <img
                        src={src}
                        alt={alt}
                        ref={imageRef}
                        {...imageProps}
                        className={cx(classes.image, imageProps?.className)}
                        onError={(event) => {
                            setError(true)
                            typeof imageProps?.onError === 'function' && imageProps.onError(event)
                        }}
                        style={{
                            objectFit: fit,
                            width: rem(width),
                            height: rem(height),
                            ...imageProps?.style,
                        }}
                    />

                    {isPlaceholder && (
                        <div
                            className={classes.placeholder}
                            title={alt}
                        >
                            {placeholder || (
                                <div>
                                    <ImageIcon
                                        width={rem(40)}
                                        height={rem(40)}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {!!caption && (
                    <Text
                        component='figcaption'
                        size='sm'
                        align='center'
                        className={classes.caption}
                    >
                        {caption}
                    </Text>
                )}
            </figure>
        </Box>
    )
})

Image.displayName = '@worldprinter/wdesign-core/Image'
