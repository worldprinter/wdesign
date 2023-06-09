import { attachFunctions } from '../../functions/attach-functions'
import { getBreakpointValue } from '../../functions/fns/breakpoints/breakpoints'
import type { WDesignTheme, WDesignThemeBase, WDesignThemeOverride } from '../../types'

export function mergeTheme(currentTheme: WDesignThemeBase, themeOverride?: WDesignThemeOverride): WDesignThemeBase {
    if (!themeOverride) {
        return currentTheme
    }

    // @ts-ignore
    const result: WDesignThemeBase = Object.keys(currentTheme).reduce((acc, key) => {
        if (key === 'headings' && themeOverride.headings) {
            const sizes = themeOverride.headings.sizes
                ? Object.keys(currentTheme.headings.sizes).reduce((headingsAcc, h) => {
                      // eslint-disable-next-line no-param-reassign
                      headingsAcc[h] = {
                          ...currentTheme.headings.sizes[h],
                          ...themeOverride.headings.sizes[h],
                      }
                      return headingsAcc
                  }, {} as WDesignThemeBase['headings']['sizes'])
                : currentTheme.headings.sizes
            return {
                ...acc,
                headings: {
                    ...currentTheme.headings,
                    ...themeOverride.headings,
                    sizes,
                },
            }
        }

        if (key === 'breakpoints' && themeOverride.breakpoints) {
            const mergedBreakpoints = { ...currentTheme.breakpoints, ...themeOverride.breakpoints }

            return {
                ...acc,
                breakpoints: Object.fromEntries(
                    Object.entries(mergedBreakpoints).sort(
                        (a, b) => getBreakpointValue(a[1]) - getBreakpointValue(b[1]),
                    ),
                ),
            }
        }

        acc[key] =
            typeof themeOverride[key] === 'object'
                ? { ...currentTheme[key], ...themeOverride[key] }
                : typeof themeOverride[key] === 'number' ||
                  typeof themeOverride[key] === 'boolean' ||
                  typeof themeOverride[key] === 'function'
                ? themeOverride[key]
                : themeOverride[key] || currentTheme[key]
        return acc
    }, {} as WDesignThemeBase)

    if (themeOverride?.fontFamily && !themeOverride?.headings?.fontFamily) {
        result.headings.fontFamily = themeOverride.fontFamily as string
    }

    if (!(result.primaryColor in result.colors)) {
        throw new Error(
            'WDesignProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://wdesign.dev/theming/colors/#primary-color',
        )
    }

    return result
}

export function mergeThemeWithFunctions(
    currentTheme: WDesignThemeBase,
    themeOverride?: WDesignThemeOverride,
): WDesignTheme {
    return attachFunctions(mergeTheme(currentTheme, themeOverride))
}
