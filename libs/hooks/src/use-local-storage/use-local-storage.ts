import type { IStorageProperties } from './create-storage'
import { createStorage } from './create-storage'

export function useLocalStorage<T = string>(props: IStorageProperties<T>) {
    return createStorage<T>('localStorage', 'use-local-storage')(props)
}
