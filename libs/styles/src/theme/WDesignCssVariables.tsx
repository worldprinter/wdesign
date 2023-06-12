import { Global } from '@emotion/react'
import React from 'react'

import type { WDesignSize, WDesignTheme } from './types'
import { em, rem } from './utils'

function assignSizeVariables(
    variables: Record<string, string>,
    sizes: Record<WDesignSize, number | string>,
    name: string,
    targetUnitConverter: typeof rem = rem,
) {
    Object.keys(sizes).forEach((size) => {
        // eslint-disable-next-line no-param-reassign
        variables[`--wdesign-${name}-${size}`] = targetUnitConverter(sizes[size])
    })
}

export function WDesignCssVariables({ theme }: { theme: WDesignTheme }) {
    const variables: Record<string, string> = {
        '--wdesign-color-white': theme.white,
        '--wdesign-color-black': theme.black,
        '--wdesign-transition-timing-function': theme.transitionTimingFunction,
        '--wdesign-line-height': `${theme.lineHeight}`,
        '--wdesign-font-family': theme.fontFamily,
        '--wdesign-font-family-monospace': theme.fontFamilyMonospace,
        '--wdesign-font-family-headings': theme.headings.fontFamily,
        '--wdesign-heading-font-weight': `${theme.headings.fontWeight}`,
    }

    assignSizeVariables(variables, theme.shadows, 'shadow')
    assignSizeVariables(variables, theme.fontSizes, 'font-size')
    assignSizeVariables(variables, theme.radius, 'radius')
    assignSizeVariables(variables, theme.spacing, 'spacing')
    assignSizeVariables(variables, theme.breakpoints, 'breakpoints', em)

    Object.keys(theme.colors).forEach((color) => {
        theme.colors[color].forEach((shade, index) => {
            variables[`--wdesign-color-${color}-${index}`] = shade
        })
    })

    const headings = theme.headings.sizes

    Object.keys(headings).forEach((heading) => {
        variables[`--wdesign-${heading}-font-size`] = headings[heading].fontSize
        variables[`--wdesign-${heading}-line-height`] = `${headings[heading].lineHeight}`
    })

    return (
        <Global
            styles={{
                ':root': variables,
            }}
        />
    )
}
