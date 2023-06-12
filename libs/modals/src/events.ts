import { createUseExternalEvents } from '@worldprinter/wdesign-utils'

import type { ModalSettings, OpenConfirmModal, OpenContextModal, WDesignModal, WDesignModals } from './context'

type ModalsEvents = {
    openModal(payload: ModalSettings): void
    closeModal(id: string): void
    closeContextModal<TKey extends WDesignModal>(id: TKey): void
    closeAllModals(): void
    openConfirmModal(payload: OpenConfirmModal): void
    openContextModal<TKey extends WDesignModal>(
        payload: OpenContextModal<Parameters<WDesignModals[TKey]>[0]['innerProps']> & { modal: TKey },
    ): void
}

export const [useModalsEvents, createEvent] = createUseExternalEvents<ModalsEvents>('wdesign-modals')

export const openModal = createEvent('openModal')
export const closeModal = createEvent('closeModal')
export const closeContextModal: ModalsEvents['closeContextModal'] = <TKey extends WDesignModal>(id: TKey) =>
    createEvent('closeContextModal')(id)
export const closeAllModals = createEvent('closeAllModals')
export const openConfirmModal = createEvent('openConfirmModal')
export const openContextModal: ModalsEvents['openContextModal'] = <TKey extends WDesignModal>(
    payload: OpenContextModal<Parameters<WDesignModals[TKey]>[0]['innerProps']> & { modal: TKey },
) => createEvent('openContextModal')(payload)

export const modals = {
    open: openModal,
    close: closeModal,
    closeAll: closeAllModals,
    openConfirmModal,
    openContextModal,
}
