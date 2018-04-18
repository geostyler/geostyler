import Data from '../../Model/Data/Data';

/**
 * Interface, which has to be implemented by all GeoStyler parser classes.
 */
interface DataParser {
  /**
   * Optional projection of the input data,
   * e.g. 'EPSG:4326'
   *
   * @type {string}
   */
  sourceProjection?: string;

  /**
   * Optional projection of the output data,
   * e.g. 'EPSG:3857'
   *
   * @type {string}
   */
  targetProjection?: string;

  /**
   * Parses the inputData and transforms it to the GeoStyler data model
   *
   * @param inputData
   */
  readData(inputData: any): Data;
}

export default DataParser;
