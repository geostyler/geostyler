/**
 * Representation of a GeoJSON geometry object.
 *
 * @class GeoJsonGeometry
 */
class GeoJsonGeometry {

  /**
   * The GeoJSON geometry type
   *
   * @private
   * @type {String}
   * @memberof GeoJsonGeometry
   */
  private _type: String;

  /**
   * The GeoJSON coordinates.
   * Here as simplified definition as Array<Number> since this property will remain empty in GeoStyler. 
   *
   * @private
   * @type {String}
   * @memberof GeoJsonGeometry
   */
  private _coordinates: Array<Number>;

  constructor(
    type: String
  ) {
    this._type = type;
    this._coordinates = []; // we do not need the coordinates in GeoStyler
  }

  /**
   * Getter type
   * @return {String}
   */
  public get type(): String {
    return this._type;
  }

  /**
   * Getter coordinates
   * @return {null}
   */
  public get coordinates(): Array<Number> {
    return this._coordinates;
  }

  /**
   * Setter type
   * @param {String} value
   */
  public set type(value: String) {
    this._type = value;
  }

  /**
   * Setter coordinates
   * @param {null} value
   */
  public set coordinates(value: Array<Number>) {
    this._coordinates = value;
  }

}

export default GeoJsonGeometry;
