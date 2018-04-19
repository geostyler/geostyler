/**
 * IconSymbolizer
 *
 */
type IconSymbolizer = {
  visibility?: boolean,
  allowOverlap?: boolean,
  ignorePlacement?: boolean,
  optional?: boolean,
  rotationAlignment?: 'map' | 'viewport' | 'auto',
  size?: number,
  textFit?: 'none' | 'width' | 'height' | 'both',
  textFitPadding?: [number, number, number, number],
  image?: string,
  rotate?: number,
  padding?: number,
  keepUpright?: boolean,
  offset?: [number, number],
  anchor?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  pitchAlignment?: 'map' | 'viewport' | 'auto',
  opacity?: number,
  color?: string,
  haloColor?: string,
  haloWidth?: number,
  haloBlur?: number,
  translate?: [number, number],
  translateAnchor?: 'map' | 'viewport',
};

export default IconSymbolizer;
