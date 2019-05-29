import {
  Symbolizer,
  MarkSymbolizer,
  IconSymbolizer,
  FontIconSymbolizer,
  SymbolizerKind,
  TextSymbolizer,
  LineSymbolizer,
  FillSymbolizer,
  RasterSymbolizer
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

  static fontIconSymbolizer: FontIconSymbolizer = {
    kind: 'FontIcon'
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

  static rasterSymbolizer: RasterSymbolizer = {
    kind: 'Raster'
  };

  static defaultSymbolizer: Symbolizer = SymbolizerUtil.markSymbolizer;

  /**
   * Generates a symbolizer (with kind Mark with wellknownName Circle if none provided).
   * @param {SymbolizerKind} kind An optional SymbolizerKind
   * @param {object} values Optional values
   */
  static generateSymbolizer(kind?: SymbolizerKind, values?: object): Symbolizer {
    switch (kind) {
      case 'Mark':
        return {
          ...SymbolizerUtil.markSymbolizer,
          ...values
        };
      case 'Icon':
        return {
          ...SymbolizerUtil.iconSymbolizer,
          ...values
        };
      case 'FontIcon':
        return {
          ...SymbolizerUtil.fontIconSymbolizer,
          ...values
        };
      case 'Fill':
        return {
          ...SymbolizerUtil.fillSymbolizer,
          ...values
        };
      case 'Line':
        return {
          ...SymbolizerUtil.lineSymbolizer,
          ...values
        };
      case 'Text':
        return {
          ...SymbolizerUtil.textSymbolizer,
          ...values
        };
      case 'Raster':
        return {
          ...SymbolizerUtil.rasterSymbolizer,
          ...values
        };
      default:
        return {
          ...SymbolizerUtil.defaultSymbolizer,
          ...values
          };
    }
  }

}

export default SymbolizerUtil;
