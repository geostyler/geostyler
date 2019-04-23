import { Data, VectorData, RasterData } from 'geostyler-data';

/**
 * @class DataUtil
 */
class DataUtil {
  /**
   * Checks if Data object is of type VectorData.
   */
  static isVector = (v: Data): v is VectorData => {
    return (<VectorData> v).exampleFeatures !== undefined;
  }

  /**
   * Checks if Data object is of type RasterData.
   */
  static isRaster = (r: Data): r is RasterData => {
    return (<RasterData> r).rasterBandInfo !== undefined;
  }
}

export default DataUtil;
