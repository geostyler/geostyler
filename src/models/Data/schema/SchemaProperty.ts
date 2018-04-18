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
   * @@type {string}
   * @memberOf {SchemaProperty}
   */
  private _type: string;

  /**
   * @private
   * @@type {number}
   * @memberOf {SchemaProperty}
   */
  private _minimum: number;

  /**
   * @private
   * @@type {number}
   * @memberOf {SchemaProperty}
   */
  private _maximum: number;

  constructor(
    type: string,
    minimum?: number,
    maximum?: number
  ) {
    this._type = type;
    if (minimum && !isNaN(minimum)) {
      this._minimum = minimum;
    }
    if (maximum && !isNaN(maximum)) {
      this._maximum = maximum;
    }
  }

  /**
   * Getter type
   * @return {string}
   */
  public get type(): string {
    return this._type;
  }

    /**
     * Getter minimum
     * @return {number}
     */
  public get minimum(): number {
    return this._minimum;
  }

    /**
     * Getter maximum
     * @return {number}
     */
  public get maximum(): number {
    return this._maximum;
  }

    /**
     * Setter type
     * @param {string} value
     */
  public set type(value: string) {
    this._type = value;
  }

    /**
     * Setter minimum
     * @param {number} value
     */
  public set minimum(value: number) {
    this._minimum = value;
  }

    /**
     * Setter maximum
     * @param {number} value
     */
  public set maximum(value: number) {
    this._maximum = value;
  }

}

export default SchemaProperty;
