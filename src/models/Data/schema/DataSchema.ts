import SchemaProperties from './SchemaProperties';

/**
 * Class represents the schema of imported geo-data, to have information about available
 * properties and data ranges.
 * Comparable to a DescribeFeatureType response for an OGC WFS.
 * This is modelled as JSON schema:
 *
 *  {
 *    "title": "Person",
 *    "type": "object",
 *    "properties": {
 *      "firstName": {
 *        "type": "string"
 *      },
 *      "lastName": {
 *        "type": "string"
 *      },
 *      "age": {
 *        "description": "Age in years",
 *        "type": "integer",
 *        "minimum": 0
 *      }
 *   }
 * }
 *
 * @class DataSchema
 */
class DataSchema {

  /**
   * @private
   * @@type {string}
   * @memberOf {DataSchema}
   */
  private _title: string;

  /**
   * @private
   * @@type {string}
   * @memberOf {DataSchema}
   */
  private _type: string;

  /**
   * @private
   * @@type {SchemaProperties}
   * @memberOf {DataSchema}
   */
  private _properties: SchemaProperties;

  constructor(
    type: string,
    properties: SchemaProperties,
    title?: string,
  ) {
    this._title = title || '';
    this._type = type;
    this._properties = properties;
  }

  /**
   * Getter title
   * @return {string}
   */
  public get title(): string {
    return this._title;
  }

  /**
   * Getter type
   * @return {string}
   */
  public get type(): string {
    return this._type;
  }

  /**
   * Getter properties
   * @return {SchemaProperties}
   */
  public get properties(): SchemaProperties {
    return this._properties;
  }

  /**
   * Setter title
   * @param {string} value
   */
  public set title(value: string) {
    this._title = value;
  }

  /**
   * Setter type
   * @param {string} value
   */
  public set type(value: string) {
    this._type = value;
  }

  /**
   * Setter properties
   * @param {SchemaProperties} value
   */
  public set properties(value: SchemaProperties) {
    this._properties = value;
  }

}

export default DataSchema;
