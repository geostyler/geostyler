/**
 * Class represents a single property of an object according to JSON schema.
 * Like:
 *
 *   {
 *     "type": "Number",
 *     "minimum": 0
 *   }
 *
 *
 * @class SchemaProperty
 */

type SchemaProperty = {

  /**
   * The data type of the described property / attribute
   * @type {string}
   */
  type: string;

  /**
   * The minimum value of the described property / attribute.
   * Only applies for type='number'
   * @type {number}
   */
  minimum?: number;

  /**
   * The data type of the described property / attribute#
   * Only applies for type='number'
   * @type {number}
   */
  maximum?: number;
};

export default SchemaProperty;
