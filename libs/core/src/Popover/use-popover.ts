import { arrow, flip, inline, limitShift, Middleware, offset, shift, size, useFloating } from '@floating-ui/react'

import { useDidUpdate, useUncontrolled } from '@worldprinter/wdesign-hooks'

import { FloatingAxesOffsets, FloatingPosition, useFloatingAutoUpdate } from '../Floating'
import { PopoverMiddlewares, PopoverWidth } from './Popover.types'

interface UsePopoverOptions {
    offset: number | FloatingAxesOffsets
    position: FloatingPosition
    positionDependencies: any[]
    onPositionChange?(position: FloatingPosition): void
    opened: boolean
    defaultOpened: boolean
    onChange(opened: boolean): void
    onClose?(): void
    onOpen?(): void
    width: PopoverWidth
    middlewares: PopoverMiddlewares
    arrowRef: React.RefObject<HTMLDivElement>
    arrowOffset: number
}

function getPopoverMiddlewares(options: UsePopoverOptions) {
    const middlewares: Middleware[] = [offset(options.offset)]

    if (options.middlewares.shift) {
        middlewares.push(shift({ limiter: limitShift() }))
    }

    if (options.middlewares.flip) {
        middlewares.push(flip())
    }

    if (options.middlewares.inline) {
        middlewares.push(inline())
    }

    middlewares.push(arrow({ element: options.arrowRef, padding: options.arrowOffset }))

    return middlewares
}

export function usePopover(options: UsePopoverOptions) {
    const [_opened, setOpened] = useUncontrolled({
        value: options.opened,
        defaultValue: options.defaultOpened,
        finalValue: false,
        onChange: options.onChange,
    })

    const onClose = () => {
        options.onClose?.()
        setOpened(false)
    }

    const onToggle = () => {
        if (_opened) {
            options.onClose?.()
            setOpened(false)
        } else {
            options.onOpen?.()
            setOpened(true)
        }
    }

    const floating = useFloating({
        placement: options.position,
        middleware: [
            ...getPopoverMiddlewares(options),
            ...(options.width === 'target'
                ? [
                      size({
                          apply({ rects }) {
                              Object.assign(floating.refs.floating.current?.style ?? {}, {
                                  width: `${rects.reference.width}px`,
                              })
                          },
                      }),
                  ]
                : []),
        ],
    })

    useFloatingAutoUpdate({
        opened: options.opened,
        position: options.position,
        positionDependencies: options.positionDependencies,
        floating,
    })

    useDidUpdate(() => {
        options.onPositionChange?.(floating.placement)
    }, [floating.placement])

    useDidUpdate(() => {
        if (!options.opened) {
            options.onClose?.()
        } else {
            options.onOpen?.()
        }
    }, [options.opened])

    return {
        floating,
        controlled: typeof options.opened === 'boolean',
        opened: _opened,
        onClose,
        onToggle,
    }
}
