import type { Sx, WDesignStyleSystemProps, WDesignTheme } from '@worldprinter/wdesign-styles'
import { useCss, useWDesignTheme } from '@worldprinter/wdesign-styles'

import { getSystemStyles } from '../style-system-props/get-system-styles/get-system-styles'

function extractSx(sx: Sx, theme: WDesignTheme) {
    return typeof sx === 'function' ? sx(theme) : sx
}

export function useSx(sx: Sx | Sx[], systemProps: WDesignStyleSystemProps, className: string) {
    const theme = useWDesignTheme()
    const { css, cx } = useCss()

    if (Array.isArray(sx)) {
        return cx(
            className,
            css(getSystemStyles(systemProps, theme)),
            sx.map((partial) => css(extractSx(partial, theme))),
        )
    }

    return cx(className, css(extractSx(sx, theme)), css(getSystemStyles(systemProps, theme)))
}
