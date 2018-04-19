import { FeatureCollection, GeometryObject } from 'geojson';
import DataSchema from '../../Type/DataSchema';

/**
 * Internal data object for imported geo data.
 * Aggregates a data schema and some example data (FeatureCollection).
 */
interface Data {

  /**
   * Schema of imported geo-data describing the properties / attributes
   *
   * @type {DataSchema}
   */
  schema: DataSchema;

  /**
   * Example features of imported geo-data
   */
  exampleFeatures: FeatureCollection<GeometryObject>;
}

export default Data;
