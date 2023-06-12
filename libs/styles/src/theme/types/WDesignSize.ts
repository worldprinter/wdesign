export type WDesignSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {})
export type WDesignNumberSize = WDesignSize | number | (string & {})
export type WDesignSizes = Record<WDesignSize, string>
