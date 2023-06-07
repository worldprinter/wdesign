import type { IStorageProperties } from '../use-local-storage/create-storage'
import { createStorage } from '../use-local-storage/create-storage'

export function useSessionStorage<T = string>(props: IStorageProperties<T>) {
    return createStorage<T>('sessionStorage', 'use-session-storage')(props)
}
