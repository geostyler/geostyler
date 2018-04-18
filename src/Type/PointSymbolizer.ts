import IconSymbolizer from './IconSymbolizer';
import TextSymbolizer from './TextSymbolizer';

/**
 * PointSymbolizer
 *
 */
type PointSymbolizer = {
  spacing?: number,
  avoidEdges?: boolean,
  icon?: IconSymbolizer,
  text?: TextSymbolizer
};

export default PointSymbolizer;
