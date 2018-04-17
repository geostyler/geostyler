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
   * @type {String}
   * @memberof GeoJsonFeature
   */
  private _type: String;

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
   * @type {Object}
   * @memberof GeoJsonFeature
   */
  private _properties: Object;

  constructor(
    type: String,
    geometry: GeoJsonGeometry,
    properties: Object
  ) {
    this._type = type;
    this._geometry = geometry;
    this._properties = properties;
  }

  /**
   * Getter type
   * @return {String}
   */
  get type(): String {
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
   * @return {Object}
   */
  get properties(): Object {
    return this._properties;
  }

  /**
   * Setter type
   * @param {String} value
   */
  set type(value: String) {
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
   * @param {Object} value
   */
  set properties(value: Object) {
    this._properties = value;
  }

}

export default GeoJsonFeature;
