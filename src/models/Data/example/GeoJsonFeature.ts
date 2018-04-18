import GeoJsonGeometry from './GeoJsonGeometry';

/**
 * Representation of a GeoJSON feature object.
 *
 * @class GeoJsonFeature
 */
class GeoJsonFeature {

  /**
   * The GeoJSON object type, e.g. 'feature'
   *
   * @private
   * @type {string}
   * @memberof GeoJsonFeature
   */
  private _type: string;

  /**
   * The GeoJSON geometry object
   *
   * @private
   * @type {GeoJsonGeometry}
   * @memberof GeoJsonFeature
   */
  private _geometry: GeoJsonGeometry;

  /**
   * The GeoJSON property object
   *
   * @private
   * @type {object}
   * @memberof GeoJsonFeature
   */
  private _properties: object;

  constructor(
    type: string,
    geometry: GeoJsonGeometry,
    properties: object
  ) {
    this._type = type;
    this._geometry = geometry;
    this._properties = properties;
  }

  /**
   * Getter type
   * @return {string}
   */
  get type(): string {
    return this._type;
  }

  /**
   * Getter geometry
   * @return {GeoJsonGeometry}
   */
  get geometry(): GeoJsonGeometry {
    return this._geometry;
  }

  /**
   * Getter properties
   * @return {object}
   */
  get properties(): object {
    return this._properties;
  }

  /**
   * Setter type
   * @param {string} value
   */
  set type(value: string) {
    this._type = value;
  }

  /**
   * Setter geometry
   * @param {GeoJsonGeometry} value
   */
  set geometry(value: GeoJsonGeometry) {
    this._geometry = value;
  }

  /**
   * Setter properties
   * @param {object} value
   */
  set properties(value: object) {
    this._properties = value;
  }

}

export default GeoJsonFeature;
