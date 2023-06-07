import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef } from 'react'

export function useDidUpdate(fn: EffectCallback, dependencies?: DependencyList) {
    const mounted = useRef(false)

    useEffect(
        () => () => {
            mounted.current = false
        },
        [],
    )

    useEffect(() => {
        if (mounted.current) {
            return fn()
        }

        mounted.current = true
        return undefined
    }, dependencies)
}
