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
   * @type {string}
   * @memberof GeoJsonGeometry
   */
  private _type: string;

  /**
   * The GeoJSON coordinates.
   * Here as simplified definition as Array<number> since this property will remain empty in GeoStyler.
   *
   * @private
   * @type {string}
   * @memberof GeoJsonGeometry
   */
  private _coordinates: Array<number>;

  constructor(
    type: string
  ) {
    this._type = type;
    this._coordinates = []; // we do not need the coordinates in GeoStyler
  }

  /**
   * Getter type
   * @return {string}
   */
  public get type(): string {
    return this._type;
  }

  /**
   * Getter coordinates
   * @return {Array<number>}
   */
  public get coordinates(): Array<number> {
    return this._coordinates;
  }

  /**
   * Setter type
   * @param {string} value
   */
  public set type(value: string) {
    this._type = value;
  }

  /**
   * Setter coordinates
   * @param {Array<number>} value
   */
  public set coordinates(value: Array<number>) {
    this._coordinates = value;
  }

}

export default GeoJsonGeometry;
