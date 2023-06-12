import type { WDesignThemeBase } from '../../../types'

export function dimmed(theme: WDesignThemeBase) {
    return () => (theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6])
}
