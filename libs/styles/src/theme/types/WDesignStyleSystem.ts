import type { CSSProperties } from 'react'

import type { WDesignColor } from './WDesignColor'
import type { WDesignNumberSize, WDesignSize } from './WDesignSize'

export type SystemProp<Value> = Value | Partial<Record<WDesignSize | (string & {}), Value>>

export type SpacingValue = WDesignNumberSize | (string & {})

export type WDesignStyleSystemProps = {
    m?: SystemProp<SpacingValue>
    my?: SystemProp<SpacingValue>
    mx?: SystemProp<SpacingValue>
    mt?: SystemProp<SpacingValue>
    mb?: SystemProp<SpacingValue>
    ml?: SystemProp<SpacingValue>
    mr?: SystemProp<SpacingValue>

    p?: SystemProp<SpacingValue>
    py?: SystemProp<SpacingValue>
    px?: SystemProp<SpacingValue>
    pt?: SystemProp<SpacingValue>
    pb?: SystemProp<SpacingValue>
    pl?: SystemProp<SpacingValue>
    pr?: SystemProp<SpacingValue>

    bg?: SystemProp<WDesignColor>
    c?: SystemProp<WDesignColor>
    opacity?: SystemProp<CSSProperties['opacity']>

    ff?: SystemProp<CSSProperties['fontFamily']>
    fz?: SystemProp<SpacingValue>
    fw?: SystemProp<CSSProperties['fontWeight']>
    lts?: SystemProp<CSSProperties['letterSpacing']>
    ta?: SystemProp<CSSProperties['textAlign']>
    lh?: SystemProp<CSSProperties['lineHeight']>
    fs?: SystemProp<CSSProperties['fontStyle']>
    tt?: SystemProp<CSSProperties['textTransform']>
    td?: SystemProp<CSSProperties['textDecoration']>

    w?: SystemProp<CSSProperties['width']>
    miw?: SystemProp<CSSProperties['minWidth']>
    maw?: SystemProp<CSSProperties['maxWidth']>
    h?: SystemProp<CSSProperties['height']>
    mih?: SystemProp<CSSProperties['minHeight']>
    mah?: SystemProp<CSSProperties['maxHeight']>

    bgsz?: SystemProp<CSSProperties['backgroundSize']>
    bgp?: SystemProp<CSSProperties['backgroundPosition']>
    bgr?: SystemProp<CSSProperties['backgroundRepeat']>
    bga?: SystemProp<CSSProperties['backgroundAttachment']>

    pos?: SystemProp<CSSProperties['position']>
    top?: SystemProp<CSSProperties['top']>
    left?: SystemProp<CSSProperties['left']>
    bottom?: SystemProp<CSSProperties['bottom']>
    right?: SystemProp<CSSProperties['right']>
    inset?: SystemProp<CSSProperties['inset']>

    display?: SystemProp<CSSProperties['display']>
}
