import { useWDesignEmotionCache } from '../theme/WDesignProvider'
import { defaultWDesignEmotionCache } from './default-emotion-cache'

export function useEmotionCache() {
    const cache = useWDesignEmotionCache()
    return cache || defaultWDesignEmotionCache
}
