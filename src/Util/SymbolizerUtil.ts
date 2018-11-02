import {
  Symbolizer,
  MarkSymbolizer,
  IconSymbolizer,
  SymbolizerKind,
  TextSymbolizer,
  LineSymbolizer,
  FillSymbolizer
} from 'geostyler-style';

/**
 * @class SymbolizerUtil
 */
class SymbolizerUtil {

  static markSymbolizer: MarkSymbolizer = {
    kind: 'Mark',
    wellKnownName: 'Circle',
    color: '#0E1058'
  };

  static iconSymbolizer: IconSymbolizer = {
    kind: 'Icon',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/128px-Parking_icon.svg.png'
  };

  static fillSymbolizer: FillSymbolizer = {
    kind: 'Fill',
    color: '#0E1058'
  };

  static lineSymbolizer: LineSymbolizer = {
    kind: 'Line',
    color: '#0E1058',
    width: 3
  };

  static textSymbolizer: TextSymbolizer = {
    kind: 'Text',
    label: 'Your Label',
    size: 12
  };

  static defaultSymbolizer: Symbolizer = SymbolizerUtil.markSymbolizer;

  /**
   * Generates a symbolizer (with kind Mark with wellknownName Circle if none provided).
   * @param {SymbolizerKind} kind An optional SymbolizerKind
   */
  static generateSymbolizer(kind?: SymbolizerKind): Symbolizer {
    switch (kind) {
      case 'Mark':
        return SymbolizerUtil.markSymbolizer;
      case 'Icon':
        return SymbolizerUtil.iconSymbolizer;
      case 'Fill':
        return SymbolizerUtil.fillSymbolizer;
      case 'Line':
        return SymbolizerUtil.lineSymbolizer;
      case 'Text':
        return SymbolizerUtil.textSymbolizer;
      default:
        return SymbolizerUtil.defaultSymbolizer;
    }
  }

}

export default SymbolizerUtil;
