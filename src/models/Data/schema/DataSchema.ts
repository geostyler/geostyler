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
   * @@type {String}
   * @memberOf {DataSchema}
   */
  private _title: String;

  /**
   * @private
   * @@type {String}
   * @memberOf {DataSchema}
   */
  private _type: String;

  /**
   * @private
   * @@type {SchemaProperties}
   * @memberOf {DataSchema}
   */
  private _properties: SchemaProperties;

  constructor(
    type: String,
    properties: SchemaProperties,
    title?: String,
  ) {
    this._title = title || '';
    this._type = type;
    this._properties = properties;
  }

  /**
   * Getter title
   * @return {String}
   */
  public get title(): String {
    return this._title;
  }

  /**
   * Getter type
   * @return {String}
   */
  public get type(): String {
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
   * @param {String} value
   */
  public set title(value: String) {
    this._title = value;
  }

  /**
   * Setter type
   * @param {String} value
   */
  public set type(value: String) {
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
