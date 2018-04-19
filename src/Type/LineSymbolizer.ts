/**
 * LineSymbolizer
 *
 */
type LineSymbolizer = {
  visibility?: boolean,
  cap?: 'butt' | 'round' | 'square',
  join?: 'bevel' | 'round' | 'miter',
  miterLimit?: number,
  roundLimit?: number,
  type?: string,
  opacity?: number,
  color?: string,
  translate?: [number, number],
  translateAnchor?: 'map' | 'viewport',
  width?: number,
  gapWidth?: number,
  offset?: number,
  blur?: number,
  dasharray?: number[],
  pattern?: string,
  gradient?: any[]
};

export default LineSymbolizer;
