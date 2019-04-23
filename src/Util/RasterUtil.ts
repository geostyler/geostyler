import { ColorMapEntry } from 'geostyler-style';

/**
 * @class RasterUtil
 */
class RasterUtil {
  /**
   * Creates a default ColorMapEntry with the the required properties.
   */
  static generateColorMapEntry = (): ColorMapEntry => {
    return {
      color: '#000'
    };
  }
}

export default RasterUtil;
