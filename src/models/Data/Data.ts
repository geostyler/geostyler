import { FeatureCollection, GeometryObject } from 'geojson';
import DataSchema from '../../Type/DataSchema';

/**
 * Internal data object for imported geo data.
 * Aggregates a data schema and some example data (FeatureCollection).
 *
 * @class Data
 */
class Data {

  /**
   * @private
   * @@type {DataSchema}
   * @memberOf {Data}
   */
  private _schema: DataSchema;

  /**
   * @private
   * @@type {FeatureCollection<GeometryObject>}
   * @memberOf {Data}
   */
  private _exampleFeatures: FeatureCollection<GeometryObject>;

  constructor(
    schema: DataSchema,
    exampleFeatures: FeatureCollection<GeometryObject>
  ) {
    this._schema = schema;
    this._exampleFeatures = exampleFeatures;
  }

  /**
   * Getter schema
   * @return {DataSchema}
   */
  public get schema(): DataSchema {
    return this._schema;
  }

    /**
     * Getter values
     * @return {DataValues}
     */
  public get exampleFeatures(): FeatureCollection<GeometryObject> {
    return this._exampleFeatures;
  }

  /**
   * Setter schema
   * @param {DataSchema} value
   */
  public set schema(value: DataSchema) {
    this._schema = value;
  }

  /**
   * Setter values
   * @param {DataValues} value
   */
  public set exampleFeatures(value: FeatureCollection<GeometryObject>) {
    this._exampleFeatures = value;
  }

}

export default Data;
