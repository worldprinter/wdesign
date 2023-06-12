import type { WDesignNumberSize } from '@worldprinter/wdesign-styles'

export type TransferListItem = {
    value: string
    label: string
    group?: string
    [key: string]: any
}

export type TransferListData = [TransferListItem[], TransferListItem[]]

export type TransferListItemComponentProps = {
    data: TransferListItem
    selected: boolean
    radius: WDesignNumberSize
}

export type TransferListItemComponent = React.FC<TransferListItemComponentProps>
