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

  /**
   * Generates a symbolizer (with kind Mark with wellknownName Circle if none provided).
   * @param {SymbolizerKind} kind An optional SymbolizerKind
   */
  static generateSymbolizer(kind?: SymbolizerKind): Symbolizer {
    switch (kind) {
      case 'Mark':
        return {
          kind,
          wellKnownName: 'Circle',
          color: '#0E1058'
        } as MarkSymbolizer;
      case 'Icon':
        return {
          kind,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/128px-Parking_icon.svg.png'
        } as IconSymbolizer;
      case 'Fill':
        return {
          kind,
          color: '#0E1058'
        } as FillSymbolizer;
      case 'Line':
        return {
          kind,
          color: '#0E1058',
          width: 3
        } as LineSymbolizer;
      case 'Text':
        return {
          kind,
          label: 'Your Label',
          size: 12
        } as TextSymbolizer;
      default:
        return {
          kind: 'Mark',
          wellKnownName: 'Circle',
          color: '#0E1058'
        } as MarkSymbolizer;
    }
  }

}

export default SymbolizerUtil;
