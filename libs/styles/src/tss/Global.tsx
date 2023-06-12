import { css, Global as EmotionGlobal } from '@emotion/react'
import React from 'react'

import type { WDesignTheme } from '../theme/types'
import { useWDesignTheme } from '../theme/WDesignProvider'
import type { CSSObject } from './types'

type EmotionStyles = CSSObject | CSSObject[]

type GlobalStylesProps = {
    styles: EmotionStyles | ((theme: WDesignTheme) => EmotionStyles)
}

export function Global({ styles }: GlobalStylesProps) {
    const theme = useWDesignTheme()
    return <EmotionGlobal styles={css((typeof styles === 'function' ? styles(theme) : styles) as any)} />
}
