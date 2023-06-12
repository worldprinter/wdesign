import type { ClassNames, Styles, WDesignColor, WDesignNumberSize } from '@worldprinter/wdesign-styles'
import { createSafeContext } from '@worldprinter/wdesign-utils'

import type { PaginationStylesNames } from './PaginationRoot/PaginationRoot'

type PaginationContext = {
    total: number
    range: (number | 'dots')[]
    active: number
    disabled: boolean
    color: WDesignColor
    radius: WDesignNumberSize
    getItemProps?(page: number): Record<string, any>
    onChange(page: number): void
    onNext(): void
    onPrevious(): void
    onFirst(): void
    onLast(): void
    stylesApi: {
        name: string
        classNames?: ClassNames<PaginationStylesNames>
        styles?: Styles<PaginationStylesNames>
        unstyled?: boolean
        variant?: string
        size?: WDesignNumberSize
    }
}

export const [PaginationProvider, usePaginationContext] = createSafeContext<PaginationContext>(
    'Pagination.Root component was not found in tree',
)
