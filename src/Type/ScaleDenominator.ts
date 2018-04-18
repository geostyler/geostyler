/**
 * ScaleDenominators are used to determine a specific range of a scale.
 * So they contain a min value and a max value.
 *
 * Please be aware that the minimum value is inclusive wheter the maximum
 * value is exclusive.
 *
 * See 10.2 of the Symbology Encoding Implementation Specification:
 * http://portal.opengeospatial.org/files/?artifact_id=16700 for detailed information.
 *
 */
type ScaleDenominator = {
  /**
   * Minimum value of the ScaleDenominator. The value is inclusive.
   *
   * @type {number}
   */
  min: number,
  /**
   * Maximum value of the ScaleDenominator. The value is exclusive.
   */
  max: number
};

export default ScaleDenominator;
