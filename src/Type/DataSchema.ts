import SchemaProperty from './SchemaProperty';

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
 * @type DataSchema
 */
type DataSchema = {

  /**
   * Optional title for the described entity
   *
   * @type {string}
   */
  title?: string;

  /**
   * Optional type definition for the described entity
   *
   * @type {string}
   */
  type: string;

  /**
   * Properties object describing the attributes of the described entity
   *
   * @type {[name: string]: SchemaProperty; }}
   */
  properties: { [name: string]: SchemaProperty };
};

export default DataSchema;
