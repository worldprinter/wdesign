import { useMantineEmotionCache } from '../theme/MantineProvider'
import { defaultMantineEmotionCache } from './default-emotion-cache'

export function useEmotionCache() {
    const cache = useMantineEmotionCache()
    return cache || defaultMantineEmotionCache
}
