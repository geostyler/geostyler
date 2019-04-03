import { Data, VectorData, RasterData } from 'geostyler-data';

class DataUtil {
  static isVector = (v: Data): v is VectorData => {
    return (<VectorData> v).exampleFeatures !== undefined;
  }

  static isRaster = (r: Data): r is RasterData => {
    return (<RasterData> r).rasterBandInfo !== undefined;
  }
}

export default DataUtil;
