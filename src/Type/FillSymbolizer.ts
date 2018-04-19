/**
 * FillSymbolizer
 *
 */
type FillSymbolizer = {
  visibility?: boolean,
  antialias?: boolean,
  opacity?: number,
  color?: string,
  outlineColor?: string,
  translate?: [number, number],
  translateAnchor?: 'map' | 'viewport',
  fillPattern?: string
};

export default FillSymbolizer;
