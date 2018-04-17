import DataSchema from './schema/DataSchema';
import ExampleFeatures from './example/ExampleFeatures';

/**
 * Internal data object for imported geo data.
 * Aggregates a data schema and some example data (features).
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
   * @@type {ExampleFeatures}
   * @memberOf {Data}
   */
  private _exampleFeatures: ExampleFeatures;

  constructor(
    schema: DataSchema,
    exampleFeatures: ExampleFeatures
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
  public get exampleFeatures(): ExampleFeatures {
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
  public set exampleFeatures(value: ExampleFeatures) {
    this._exampleFeatures = value;
  }

}

export default Data;
