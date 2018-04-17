import GeoJsonFeature from './GeoJsonFeature';

/**
 * Class represents concrete geo-data, to have example values available in the GeoStyler.
 *
 * @class ExampleFeatures
 */
class ExampleFeatures {

  /**
   * Array of example GeoJSON features
   *
   * @private
   * @type {Array<GeoJsonFeature>}
   * @memberof ExampleFeatures
   */
  private _features: Array<GeoJsonFeature>;

  constructor(
    features: Array<GeoJsonFeature>
  ) {
    this._features = features || [];
  }

  /**
   * Getter features
   * @return {Array<GeoJsonFeature>}
   */
  get features(): Array<GeoJsonFeature> {
    return this._features;
  }

  /**
   * Setter features
   * @param {Array<GeoJsonFeature>} value
   */
  set features(value: Array<GeoJsonFeature>) {
    this._features = value;
  }

}

export default ExampleFeatures;
