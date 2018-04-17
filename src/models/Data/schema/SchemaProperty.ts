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
class SchemaProperty {

  /**
   * @private
   * @@type {String}
   * @memberOf {SchemaProperty}
   */
  private _type: String;

  /**
   * @private
   * @@type {Number}
   * @memberOf {SchemaProperty}
   */
  private _minimum: Number;

  /**
   * @private
   * @@type {Number}
   * @memberOf {SchemaProperty}
   */
  private _maximum: Number;

  constructor(
    type: String,
    minimum?: Number,
    maximum?: Number
  ) {
    this._type = type;
    if (minimum && !isNaN(minimum.valueOf())) {
      this._minimum = minimum;
    }
    if (maximum && !isNaN(maximum.valueOf())) {
      this._maximum = maximum;
    }
  }

  /**
   * Getter type
   * @return {String}
   */
  public get type(): String {
    return this._type;
  }

    /**
     * Getter minimum
     * @return {Number}
     */
  public get minimum(): Number {
    return this._minimum;
  }

    /**
     * Getter maximum
     * @return {Number}
     */
  public get maximum(): Number {
    return this._maximum;
  }

    /**
     * Setter type
     * @param {String} value
     */
  public set type(value: String) {
    this._type = value;
  }

    /**
     * Setter minimum
     * @param {Number} value
     */
  public set minimum(value: Number) {
    this._minimum = value;
  }

    /**
     * Setter maximum
     * @param {Number} value
     */
  public set maximum(value: Number) {
    this._maximum = value;
  }

}

export default SchemaProperty;
