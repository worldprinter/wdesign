import type { WDesignTheme } from '@worldprinter/wdesign-styles'
import { getBreakpointValue, getSize } from '@worldprinter/wdesign-styles'

export function getSortedBreakpoints<T extends Record<string, any>>(theme: WDesignTheme, breakpoints: T[]) {
    if (breakpoints.length === 0) {
        return breakpoints
    }

    const property = 'maxWidth' in breakpoints[0] ? 'maxWidth' : 'minWidth'
    const sorted = [...breakpoints].sort(
        (a, b) =>
            getBreakpointValue(getSize({ size: b[property], sizes: theme.breakpoints })) -
            getBreakpointValue(getSize({ size: a[property], sizes: theme.breakpoints })),
    )

    return property === 'minWidth' ? sorted.reverse() : sorted
}
