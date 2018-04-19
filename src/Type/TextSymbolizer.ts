/**
 * TextSymbolizer
 *
 */
type TextSymbolizer = {
  pitchAlignment?: 'map' | 'viewport' | 'auto',
  rotationAlignment?: 'map' | 'viewport' | 'auto',
  field?: string,
  font?: string[],
  size?: number,
  maxWidth?: number,
  lineHeight?: number,
  letterSpacing?: number,
  justify?: 'left' | 'center' | 'right',
  anchor?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  maxAngle?: number,
  rotate?: number,
  padding?: number,
  keepUpright?: boolean,
  transform?: 'none' | 'uppercase' | 'lowercase',
  offset?: [number, number],
  allowOverlap?: boolean,
  ignorePlacement?: boolean,
  optional?: boolean,
  visibility?: 'visible' | 'none',
  opacity?: number,
  color?: string,
  haloColor?: string,
  haloWidth?: number,
  haloBlur?: number,
  translate?: [number, number],
  translateAnchor?: 'map' | 'viewport'
};

export default TextSymbolizer;
