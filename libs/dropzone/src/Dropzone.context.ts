import { createSafeContext } from '@worldprinter/wdesign-utils'

export type DropzoneContextValue = {
    idle: boolean
    accept: boolean
    reject: boolean
}

export const [DropzoneProvider, useDropzoneContext] = createSafeContext<DropzoneContextValue>(
    'Dropzone component was not found in tree',
)
