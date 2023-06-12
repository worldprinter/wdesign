import { Global } from '@emotion/react'
import React from 'react'

import type { WDesignTheme } from './types'

export function GlobalStyles({ theme }: { theme: WDesignTheme }) {
    return (
        <Global
            styles={{
                '*, *::before, *::after': {
                    boxSizing: 'border-box',
                },

                html: {
                    colorScheme: theme.colorScheme === 'dark' ? 'dark' : 'light',
                },

                body: {
                    ...theme.fn.fontStyles(),
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                    lineHeight: theme.lineHeight,
                    fontSize: theme.fontSizes.md,
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                },
            }}
        />
    )
}
